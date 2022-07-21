import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { GraphContextProvider } from './components/SandboxMode/Context';
import { LiveContext } from './components/LiveMode/liveContext';

function App() {
  const [listening, setListening] = useState(false);
  const [liveQuery, setLiveQuery] = useState('Query');
  const [liveResponse, setLiveResponse] = useState('Response');

  // const captureData = (data: any) => {
  //   let isQuery = true;
  //   console.log('isQuery is : ', isQuery);
  //   const queryVsRes = () => {
  //     if (!isQuery) {
  //       setLiveResponse('RESPONSE');
  //       isQuery = true;
  //     } else {
  //       setLiveQuery('QUERY');
  //       isQuery = false;
  //     }
  //   };
  //   queryVsRes();
  // };
  let isQuery = true;

  useEffect(() => {
    if (!listening) {
      const source = new EventSource(document.cookie.slice(10, -1));
      console.log('listening for events from Host App SSE...');
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        //discern data - query vs response
        if (parsedData.query) {
          setLiveQuery(JSON.stringify(parsedData));
        }
        if (parsedData.data || parsedData.errors) {
          setLiveResponse(JSON.stringify(parsedData));
        }
        console.log(`RECEIVED SSE Event: ${JSON.stringify(parsedData)}`);
      };
    }
  }, [listening]);

  return (
    <div>
      <LiveContext.Provider
        value={{ liveQuery, setLiveQuery, liveResponse, setLiveResponse }}
      >
        <GraphContextProvider>
          <Header />
        </GraphContextProvider>
      </LiveContext.Provider>
    </div>
  );
}

export default App;
