const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const fs = require('fs');



let SSE_Events = [];
let SSE_Clients = [];

const eventsHandler = (req, res, next) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
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
};

const testMW = (str) => {
  return (req, res, next) => {
    console.log(str);
    return next();
  };
};

const sendEventToClients = (newEvent) => {
  console.log('inside sendEventtoClient');
  SSE_Clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newEvent)}\n\n`)
  );
};
const addQueryMiddleware = (req, res, next) => {
  const newQuery = req.body;
  SSE_Events.push(newQuery);
  sendEventToClients(newQuery);
  console.log('inside addQueryMiddleware');
  next();
};

const extensions = ({ result }) => {
  console.log('result: ', result);
  SSE_Events.push(result);
  sendEventToClients(result);
};

const customFormatErrorFn = (error) => {
  console.log('inside customError');
  SSE_Events.push(error);
  sendEventToClients(error);
  return error;
};

// const executeGQL = (req, res, next) => {
//   return graphqlHTTP({
//     schema: schema,
//     graphiql: false,
//     customFormatErrorFn: (error) => {
//       console.log('inside customError');
//       SSE_Events.push(error);
//       sendEventToClients(error);
//       return error;
//     },
//     extensions,
//   });
// };


//error: Cannot use GraphQLSchema from another module or realm
// keeping code for now - may revisit

const grapherrql = (gqlHTTP, graphqlSchema ) => {
  console.log('inside MW');
  // const { schema } = graphqlSchema;
  const schema  = graphqlSchema;

  const executeGQL = (req, res, next) => {
    console.log('inside execute GQL');

    const executeFunc = (cb, ...args) => {
      cb(...args);
    };

    const newGqlHTTP = gqlHTTP({
      schema: schema,
      graphiql: false,
      customFormatErrorFn: (error) => {
        console.log('inside customError');
        SSE_Events.push(error);
        sendEventToClients(error);
        return error;
      },
      extensions,
    });
    
    executeFunc(
      newGqlHTTP,
      req,
      res,
      next
    );
  };

  return async function grapherrqlMiddleware(req, res, next) {
    // addQueryMiddleware(req, res, next)
    console.log('inside closure function');
    executeGQL(req, res, next);
  };
};

module.exports = {
  grapherrql,
  eventsHandler,
  testMW,
  addQueryMiddleware,
  customFormatErrorFn,
  extensions,
};
