import { useEffect } from 'react';
import { useState, useRef } from 'react';

export const WsFunc = () => {
  const [val, setVal] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    const clientWebSocket = new WebSocket('ws://localhost:3001/');
    clientWebSocket.addEventListener('connection', function (event) {
      clientWebSocket.send('Connect from client successful');
    });

    clientWebSocket.onopen = () => {
      console.log('client websocket opened');
    };
    clientWebSocket.onclose = () => {
      console.log('client websocket closed');
    };

    clientWebSocket.onmessage = (event) => {
      console.log('recieved message', JSON.parse(event.data));
      setVal(event.data);
    };

    ws.current = clientWebSocket;

    console.log('WS Current: ', ws.current);
    // return () => {
    //   clientWebSocket.close();
    // };
  }, []);
  return <div>Value: {val}</div>;
};
