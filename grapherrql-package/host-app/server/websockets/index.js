const { WebSocket } = require('ws');
// import queryString from 'query-string';
let upgraded = false;

const websockets = (expressServer, gqlResult) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    // path: '/websockets',
  });
  console.log(
    'new Response inside websocket func: ',
    Date.now(),
    ' ',
    gqlResult
  );
  if (!upgraded) {
    expressServer.on('upgrade', (request, socket, head) => {
      console.log('upgrading to a websocket');
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        upgraded = true;
        console.log(upgraded);
        websocketServer.emit('connection', websocket, request);
      });
    });
  }
  websocketServer.on(
    'connection',
    function connection(websocketConnection, connectionRequest) {
      // console.log('websocket connection made');
      // const msgObj = {};
      console.log('inside on.connection : ', Date.now(), ' ', gqlResult);
      // msgObj.message = gqlResult;
      websocketConnection.emit(JSON.stringify({ message: gqlResult }));
      // websocketConnection.on('message', (message) => {
      //   console.log('%s', message);
      //   websocketConnection.send(
      //     JSON.stringify({ message: 'HEYO FROM SERVER!!' })
      //   );
      // });

      // console.log('closing WS');
      // websocketConnection.close();
    }
  );

  return websocketServer;
};

module.exports = {
  websockets,
};
