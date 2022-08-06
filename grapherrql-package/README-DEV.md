# Integration of GraphErrQL into LOCAL HOST APP for Development

## Pre-reqs

- LOCAL TESTING Host App must use Express and 'graphqlHTTP' from the "express-graphql" package. No existing support for Apollo-based Host Apps.
- LOCAL TESTING Host App should live under top-level project repo. It should live in separate directory WITHIN 'grapherrql-package', which holds our project source code. Example file structure for development:
  GRAPHERR-QL/
  ./grapherrql-package
    ./functions ('grapherrql-express')
    ./src ('grapherrql')
    ./(HOST APP USED FOR LOCAL TESTING)
<br/>
<br/>

## Add Endpoint for Accessing GraphErrQL by pointing to static files in grapherrql-package

In Host App 'server.js' (or wherever your backend is defined)

- Follow the integration directions in 'Host-App_README.md', with the following changes/additions:
  - **do not 'npm i grapherrql' since you will be pointing to the package locally, rather than via node_modules**

Import needed 'grapherrql-express' utilities locally:
```
const {
  grapherrql,
  eventsHandler,
  serveGrapherrql,
} = require('../../functions/index');

const path = require('path');
```

Change the mounting endpoint to serve local files rather than via node_modules;
change:

```
app.use(express.static(directoryPath))
app.get('/grapherrql', serveGrapherrql(PORT, defaultFilePath));
```

to

```
app.use(express.static('../../build'));
app.get('/grapherrql', serveGrapherrql(PORT));
```

## Using GraphErrQL with local Host App

1. Navigate to GRAPHERR-QL/grapherrql-package and run 'npm run build' to prepare the front-end code of our App for serving on Host App, or to update existing /build with new changes.
2. Navigate to your local Host App directory and start the server.
3. Open two browser terminals to;
   - **Host App frontend**: from here you will use the Host App, generating Queries/Mutations
   - **<host_app>:<server_port>/grapherrql**: This launches GraphErrQL, allowing you to test new Queries or capture queries Live from the Host App

<br />
<br />

## Making Changes to GraphErrQL Source Code

1. Navigate to descriptive feature branch from within **/grapherrql-package**
2. Make desired feature changes
3. Test changes with local Host App, capturing screenshots of updated functionality/styling and lack of errors if all works
4. On success, navigate to **/grapherrql-package/package.json** and update 'version' (either minor or major number change). Version **must** be incremented to allow for package update.
5. Delete existing **/build** and **/package** folders, generate new ones with 'npm run build', then 'npm run builduipackage'
6. Save, commit, and run "npm publish" from within **/grapherrql-package/package**. Ensure publishing is successful and confirm version change on npm.
7. If changes were made within /functions, update functions/package.json version number, and 'npm publish' within that directory as well.
7. Checkout /dev, 'git fetch --prune', then merge latest code with your feature branch.
8. After resolving any merge conflicts, push from your feature branch to origin/<feature_branch>
9. Submit PR, obtain approval, land, profit!


# Walkthrough of Current Functions

## **Setup SSE Server**

### Create Stores for SSE Events and Clients

```
let SSE_Events = []
let SSE_Clients = []
```

### Add Event Handler

The Event Handler will accept new SSE connections from clients (in our case just one, GraphErrQL), making them persistent via special HTTP headers. Sends new client all current events upon startup. Saves client info.

```
const eventsHandler = (req, res, next) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  const data = `data: ${JSON.stringify(SSE_Events)}\n\n`;
  res.write(data);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  SSE_Clients.push(newClient);
  req.on('close', () => {
    console.log(`${clientId} | CONN CLOSED`);
    SSE_Clients = SSE_Clients.filter((client) => client.id !== clientId);
  });
};```

## Provide Startup Closure Function

This function is exported and called by Host App to instantiate thier GraphQL server with needed middleware added to handle SSE setup and Event forwarding to GraphErrQL. Closure is utilized to allow this function to access Host App provided arguments 'req', 'res', and 'next'.

```
const grapherrql = (gqlHTTP, graphqlSchema) => {
  const schema = graphqlSchema;

  const executeGQL = (req, res, next) => {
    //Called when '/graphql' receives new request from HostApp client, prior to GraphQL processing. Adds the query to those saved, then sends it to any open SSE clients.
    const newQuery = req.body;
    const newEvent = {'timestamp': Date.now(), 'query': newQuery};
    SSE_Events.push(newEvent);
    sendEventToClients(newEvent);

    const executeFunc = (cb, ...args) => {
      cb(...args);
    };

    const newGqlHTTP = gqlHTTP({
      schema: schema,
      graphiql: false,
      customFormatErrorFn: (error) => {
        const newEvent = { 'timestamp': Date.now(), 'message': error };
        SSE_Events.push(newEvent);
        sendEventToClients(newEvent);
        return error;
      },
      extensions,
    });

    executeFunc(newGqlHTTP, req, res, next);
  };

  return async function grapherrqlMiddleware(req, res, next) {
    executeGQL(req, res, next);
  };
};
```

## Add Function to Send Event to Clients

```
const sendEventToClients = (newEvent) => {
  SSE_Clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newEvent)}\n\n`)
  );
};
```

## Define GraphQL Extensions Callback

This attaches to the GraphQLHTTP server and runs after Query is processed into result. We use it to store that result and forward it to SSE clients

```
const extensions = ({ result }) => {
  const newEvent = {'timestamp': Date.now(), 'data': result};
  SSE_Events.push(newEvent);
  sendEventToClients(newEvent);
};
```

## Add SSE Endpoint (FROM WITHIN HOST APP SERVER)

Request to this URL from GraphErrQL will result in established SSE connection by invoking the Event Handler. The Path to the Host App endpoint will be injected into GraphErrQL html file as a Cookie and used to start the client connection.

```
app.get('/events', eventsHandler);
```

## Add GraphQL Endpoint (FROM WITHIN HOST APP SERVER)

This will serve Queries from Host App clients. Note the middleware to copy/forward the query to GraphErrQL and the included _extensions_ option

```
app.use('/graphql', grapherrql(graphqlHTTP, schema));
```

## Add GraphErrQL Module/Endpoint (FROM WITHIN HOST APP SERVER)

This is the endpoint that will actually render GraphErrQL in the browser:

```
app.get('/grapherrql', serveGrapherrql(PORT));
``


## File Structure

- ./: Overall config files. package.json defines npm package metadata, tsconfig.json defines entry point of /src
- /src: This contains the Front End files for GraphErrQL. Hosted React/HTML files are bundled, then published to npm. More on that below
- /build: Result of the "npm run build" script, which joins serving files via 'react-scripts'
- /package: This is where "npm publish" should be run from. /package results from the "npm run builduipackage" script, which copies /build contents to /package, and runs /scripts and /packageScripts. The only exports from here are 'defaultFilePath' and 'directoryPath' which are used by the Host App to dynamically reference the GraphErrQL files from node_modules after importing the package.
- /scripts: Here, tsconfig compiles the createPackage file, which transpiles system metadata (eg 'package name', 'version') into the /package package file. It verifies the needed files exist before doing so.
- /packageScripts: Here, tsconfig compiles the index file, which exports "directoryPath" as '\_\_dirname' and "defaultFilePath" for use by Host App.

## Implementation of Graph-ERR-QL into Host App

- reference 'README.md'

## Resources

- https://levelup.gitconnected.com/how-to-create-npm-package-out-of-react-app-7556b9b47bce -> walks through attaching a React app to a Host-App as a Middleware Endpoint
