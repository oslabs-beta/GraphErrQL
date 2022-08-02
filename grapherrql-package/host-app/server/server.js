const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const fs = require('fs');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const path = require('path');

const app = express();

app.use(cors());

const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' },
];

const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name };
        authors.push(author);
        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

//Store GraphQL Queries as they arrive from HostApp client. Any stored will be sent to GraphERRQL clients when they come up.
let SSE_Events = [];
//Store SSE Clients
let SSE_Clients = [];

//Accept new SSE (Server-Sent-Events) connections from clients, makes them persistent via special HTTP headers. Sends new client all current queries upon startup. Subsequent queries will be added and forwarded by 'addQueryMiddleware'. Saves client info. Can server multiple clients simultaneously, but GraphERRQL is currently only one.
function eventsHandler(req, res, next) {
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
}

//Called when '/graphql' receives new request from HostApp client, prior to GraphQL processing. Adds the query to those saved, then sends it to any open SSE clients.
const addQueryMiddleware = (req, res, next) => {
  const newQuery = req.body;
  SSE_Events.push(newQuery);
  sendEventToClients(newQuery);
  next();
};

//Send the provided new Query (or Query response) to all currently open SSE Clients
const sendEventToClients = (newEvent) => {
  SSE_Clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newEvent)}\n\n`)
  );
};

//This attaches to the GraphQLHTTP server and runs AFTER Query is processed into result. We us it to store that result and forward it to SSE clients
const extensions = ({ result }) => {
  console.log('result: ', result);
  SSE_Events.push(result);
  sendEventToClients(result);
};
//custom errors from graphql

//Needed for SSE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GraphQL base endpoint. Middleware called before GraphQL processing to capture and forward the Query to GraphERRQL for LiveMode logging. The 'extensions' prop on GraphQL return statement captures and forwards the GraphQL response. Both cases utilize SSE connection setup by 'eventsHandler'
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
      extensions,
    };
  })
);

//Setup SSE (Server-Sent-Events) endpoint. GraphERRQL will setup conn to this upon initial render, connection will persist.
app.get('/events', eventsHandler);
const HOST_APP_SSE_PATH = 'http://localhost:3001/events';

//Referencing local files to serve to GraphERRQL. Deployment will see Host Apps referencing node-modules dynamically rather than looking for these files locally.
app.use(express.static('../../build'));
app.get('/grapherrql', function (req, res) {
  let data = fs.readFileSync(path.resolve('../../build/index.html'), 'utf8');
  res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});

app.listen(3001, () => console.log('Server Running on 3001'));
