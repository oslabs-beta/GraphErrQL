const fs = require('fs');
//Store GraphQL Queries as they arrive from HostApp client. Any stored will be sent to GraphERRQL clients when they come up.
let SSE_Events = [];
let SSE_Clients = [];

const serveGrapherrql = (serverPort, defaultFilePath) => {
  const eventsURI = `http://localhost:${serverPort}/events`;
  return (req, res) => {
    let data = fs.readFileSync(defaultFilePath, 'utf8');
    res.send(data.replace('<param1_replace>', eventsURI));
  };
};
//Accept new SSE (Server-Sent-Events) connections from clients, makes them persistent via special HTTP headers. Sends new client all current queries upon startup. Subsequent queries will be added and forwarded by 'addQueryMiddleware'. Saves client info. Can server multiple clients simultaneously, but GraphERRQL is currently only one.
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
};

//Send the provided new Query (or Query response) to all currently open SSE Clients
const sendEventToClients = (newEvent) => {
  SSE_Clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newEvent)}\n\n`)
  );
};

//This attaches to the GraphQLHTTP server and runs AFTER Query is processed into result. We us it to store that result and forward it to SSE clients
const extensions = ({ result }) => {
  const newEvent = { timestamp: Date.now(), data: result };
  SSE_Events.push(newEvent);
  sendEventToClients(newEvent);
};
//this is how we capture errors from graphqlHTTP and send them to grapherrql through SSE (the 'result' obj in graphqlHTTP remains undefined if an error is emmitted which is why we created functionality where we had access to the error obj being thrown from graphqlHTTP)
const customFormatErrorFn = (error) => {
  const newEvent = { timestamp: Date.now(), message: error };
  SSE_Events.push(newEvent);
  sendEventToClients(newEvent);
  return error;
};

const grapherrql = (gqlHTTP, graphqlSchema) => {
  const schema = graphqlSchema;

  const executeGQL = (req, res, next) => {
    //Called when '/graphql' receives new request from HostApp client, prior to GraphQL processing. Adds the query to those saved, then sends it to any open SSE clients.
    const newQuery = req.body;
    const newEvent = { timestamp: Date.now(), query: newQuery };
    SSE_Events.push(newEvent);
    sendEventToClients(newEvent);

    const executeFunc = (cb, ...args) => {
      cb(...args);
    };

    const newGqlHTTP = gqlHTTP({
      schema: schema,
      graphiql: false,
      customFormatErrorFn,
      extensions,
    });

    executeFunc(newGqlHTTP, req, res, next);
  };

  return async function grapherrqlMiddleware(req, res, next) {
    executeGQL(req, res, next);
  };
};

module.exports = {
  grapherrql,
  eventsHandler,
  serveGrapherrql,
};
