# **Integration of GraphErrQL at Host App**

## **Overview**

GraphErrQL is a package designed for deployment as a middleware endpoint to an existing GraphQL Express based Host App. After setup is complete, the following will apply:

- Navigating to **_'\<host_app>:\<server_port>/grapherrql'_** will cause '_grapherrql_' frontend files to be served to browser
- Simultaneously, app will open a **SSE** (_Server-Sent-Events_) server, ready to accept client connection requests to the **_'\<host_app>:\<server_port>/events'_** endpoint
- Upon initial browser rendering, **GraphErrQL** will initiate a new SSE client connection and will immediately receive any cached GraphQL queries from the Host App server. These will be logged to the main page "Live Mode" of **GraphErrQL**
- Any future GraphQL queries made on the Host App client will be forwarded over the SSE connection, prior to proceeding with processing on the Host App. Results will then also be forwarded to GraphErrQL on its way back to the Host App client. At this point, GraphErrQL will render both the request and response together in **Live Mode** as a single log.

### Compatibility

- Current initial release is designed only for Express-based Host Apps capable of including the 'extensions' option on the local GraphQL server. Iterating to allow for Apollo Host App integration is a focus point and we would love help! This is likely to have most of the answers: https://dev.to/seancwalsh/how-to-write-graphql-middleware-node-apollo-server-express-2h87



# Using GraphErrQL on your Host App

### Install Packages

```
npm i grapherrql
npm i grapherrql-express
```

### Require Needed Exports

```
const { graphqlHTTP } = require('express-graphql');

const { directoryPath, defaultFilePath } = require ('grapherrql');

const {
  grapherrql,
  eventsHandler,
  serveGrapherrql,
} = require('grapherrql-express');
```

### Call Express, Define Server Port, Setup Encoding

```
const PORT = '3001';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
```

### Setup Base GraphQL Endpoint

```
app.use('/graphql', grapherrql(graphqlHTTP, schema));
```

### Setup Events Endpoint for SSE

```
app.get('/events', eventsHandler);
```

### Point Static File Requests to GraphErrQL node_module

```
app.use(express.static(directoryPath))
```

### Setup GraphErrQL Endpoint

```
app.get('/grapherrql', serveGrapherrql(PORT, defaultFilePath));
```

## Run it!

1. Start your Host App server.
2. Open two browser terminals to;
   - **Host App frontend**: from here you will use the Host App, generating Queries/Mutations
   - **<host_app>:<server_port>/grapherrql**: This launches GraphErrQL, allowing you to test new Queries or capture queries Live from the Host App
