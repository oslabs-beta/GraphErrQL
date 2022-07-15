import React from 'react';
import './App.css';
import Header from './components/Header';
import { GraphContextProvider } from './components/SandboxMode/Context';

function App() {

  // const clientWebSocket = new WebSocket('ws://localhost:3001/');
  // clientWebSocket.addEventListener('connection', function (event) {
  //   clientWebSocket.send('Connect from client successful');
  // });
  // clientWebSocket.addEventListener('open', function (event) {
  //   console.log('Connected to WS server');
  // });
  // clientWebSocket.addEventListener('close', function (event) {
  //   console.log('Connection to WS server is closed');
  // });

  // clientWebSocket.addEventListener('message', function (event) {
  //   console.log('Message from server ', JSON.parse(event.data).message);
  // });

  return (
    <div>
      <GraphContextProvider>
        <Header />
      </GraphContextProvider>
    </div>
  );
}

export default App;
