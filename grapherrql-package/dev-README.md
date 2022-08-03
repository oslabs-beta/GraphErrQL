# Integration of GraphErrQL into LOCAL HOST APP for Development

## Pre-reqs

- LOCAL TESTING Host App must currently use Express and 'graphqlHTTP' from the "express-graphql" package. No existing support for Apollo-based Host Apps.
- LOCAL TESTING Host App should live under top-level project repo "GRAPHERR-QL". It should live in separate directory WITHIN 'grapherrql-package', which holds our project source code. Example file structure for development:
  GRAPHERR-QL/
  ./grapherrql-package
  ./src (GraphErrQL files)
  ./(HOST APP USED FOR TESTING)

If you are using a provided Host App repo (ie hackernews-clone), use 'git clone (host-app-repo-name)' while within '/grapherrql-package'directory. When you make pushes up to GraphErr-QL after this, the cloned host-app repo will not be included, It will only live locally.
<br/>
<br/>

## Add Endpoint for Accessing GraphErrQL by pointing to static files in grapherrql-package

In Host App 'server.js' (or wherever your backend is defined)

- Follow the integration directions in 'Host-App_README.md', with the following changes/additions:
  - **do not 'npm i grapherrql' since you will be pointing to the package locally, rather than via node_modules**

```
const path = require('path');
```

Change the mounting endpoint to serve local files rather than via node_modules;
change:

```
app.use(express.static(graphErr.directoryPath));
app.get('/grapherrql', function (req, res) {
    let data = fs.readFileSync(graphErr.defaultFilePath, 'utf8');
    res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});
```

to

```
app.use(express.static('../../build'));
app.get('/grapherrql', function (req, res) {
  let data = fs.readFileSync(path.resolve('../../build/index.html'), 'utf8');
  res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});
```

## Using GraphErrQL with local Host App

1. Navigate to GRAPHERR-QL/grapherrql-package and run 'npm run build' to build the front-end code of our App. IF 'build/' already exists, delete it first so you replace it with your latest front-end changes
2. Navigate to your local Host App directory and start the server.
3. Open two browser terminals to;
   - **Host App frontend**: from here you will use the Host App, generating Queries/Mutations
   - **<host_app>:<server_port>/grapherrql**: This launches GraphErrQL, allowing you to test new Queries or capture queries Live from the Host App

<br />
<br />

## Making Changes to GraphErrQL Source Code

1. Navigate to descriptive feature branch from within **/grapherrql-package**
2. Make desired feature changes
3. Delete existing **/build** and **/package** folders, generate new ones with 'npm run build', then 'npm run builduipackage'
4. Test changes with local Host App, capturing screenshots of updated functionality/styling and lack of errors if all works
5. On success, navigate to **/grapherrql-package/package.json** and update 'version' (either minor or major number change). Version **must** be incremented to allow for package update.
6. Save, commit, and run "npm publish" from within **/grapherrql-package/package**. Ensure publishing is successful and confirm version change on npm.
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
function eventsHandler(req, res, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  const data = `data: ${JSON.stringify(SSE_Events)}\n\n`;
  console.log(`SENDING DATA TO NEW CLIENT: ${data}`);
  res.write(data);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  console.log(`CLIENT ADDED`);
  SSE_Clients.push(newClient);
  req.on('close', () => {
    console.log(`${clientId} | CONN CLOSED`);
    SSE_Clients = SSE_Clients.filter((client) => client.id !== clientId);
  });
}
```

## Add GraphQL Middleware to Capture Queries

Called when _/graphql_ receives new request from Host App client, prior to GraphQL processing. Adds the query to those saved, then sends it to any open SSE clients.

```
const addQueryMiddleware = (req, res, next) => {
  const newQuery = req.body;
  SSE_Events.push(newQuery);
  sendEventToClients(newQuery);
  next();
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
const extensions = ({
  result,
}) => {
  SSE_Events.push(result);
  sendEventToClients(result);
}
```

## Add SSE Endpoint

Request to this URL from GraphErrQL will result in established SSE connection by invoking the Event Handler. The Path to the Host App endpoint will be injected into GraphErrQL html file as a Cookie and used to start the client connection.

```
app.get('/events', eventsHandler);
const HOST_APP_SSE_PATH = '<host_app>:<server_port>/events';
```

## Add GraphQL Endpoint

This will serve Queries from Host App clients. Note the middleware to copy/forward the query to GraphErrQL and the included _extensions_ option

```
app.use(
  '/graphql',
  addQueryMiddleware,
  graphqlHTTP((req) => {
    return {
      schema: schema,
      graphiql: false,
      customFormatErrorFn: (error) => {
        SSE_Events.push(error);
        sendEventToClients(error);
        return error;
      },
      extensions
    };
  })
);
```

## Add GraphErrQL Module/Endpoint

Require the package:

```
import * as graphErr from 'grapherrql';
```

This is the endpoint that will actually render GraphErrQL in the browser:

```
app.use(express.static(graphErr.directoryPath));
app.get('/grapherrql', function (req, res) {
    let data = fs.readFileSync(graphErr.defaultFilePath, 'utf8');
    res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});
```
