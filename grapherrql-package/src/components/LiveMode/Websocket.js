import { useEffect } from 'react';
import { useState, useRef } from 'react';

export const WsFunc = () => {
  const [val, setVal] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    const clientWebSocket = new WebSocket('wss://localhost:3001/');
    clientWebSocket.addEventListener('connection', function (event) {
      clientWebSocket.send('Connect from client successful');
    });

    // clientWebSocket.onopen = () => {
    //   console.log('client websocket opened');
    // };
    // clientWebSocket.onclose = () => {
    //   console.log('client websocket closed');
    // };

    // clientWebSocket.onmessage = (event) => {
    //   console.log('recieved message', JSON.parse(event.data));
    //   setVal(event.data);
    // };
    clientWebSocket.addEventListener('open', function (event) {
      console.log('Connected to WS server');
    });
    clientWebSocket.addEventListener('close', function (event) {
      console.log('Connection to WS server is closed');
    });

    clientWebSocket.addEventListener('message', function (event) {
      console.log('Message from server ', JSON.parse(event.data).message);
      // setVal(event.data);
    });
    let i = 0;
    setVal(i++);

    ws.current = clientWebSocket;

    console.log('WS Current: ', ws.current);
    // return () => {
    //   clientWebSocket.close();
    // };
  }, []);
  return <div>Value: {val}</div>;
};
