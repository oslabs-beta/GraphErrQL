import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { GraphContextProvider } from './components/SandboxMode/Context';

function App() {
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const source = new EventSource(document.cookie.slice(10,-1));
      console.log('listening for events from Host App SSE...');
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(`RECEIVED SSE Event: ${JSON.stringify(parsedData)}`);
      };
    }
  }, [listening])

  return (
    <div>
      <GraphContextProvider>
        <Header />
      </GraphContextProvider>
    </div>
  );
}

export default App;
