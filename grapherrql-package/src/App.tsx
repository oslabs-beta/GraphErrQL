import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { GraphContextProvider } from './components/SandboxMode/Context';
import { LiveContext } from './components/LiveMode/LiveContext';

function App() {
  const [listening, setListening] = useState(false);
  const [liveQuery, setLiveQuery] = useState('Query');
  const [liveResponse, setLiveResponse] = useState('Response');
  const [dataLog, setDataLog] = useState<any>([]);

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
  // let isQuery = true;

  useEffect(() => {
    if (!listening) {
      const source = new EventSource(document.cookie.slice(10, -1));
      console.log('listening for events from Host App SSE...');
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        const regx = /\\n|/g;
        //discern data - query vs response
        if (parsedData.query) {
          const str = JSON.stringify(parsedData).replace(regx, '');
          setLiveQuery(str);
          setDataLog((prev: any) => [...prev, str]);
        }
        if (parsedData.data) {
          const str = JSON.stringify(parsedData).replace(regx, '');
          setLiveResponse(str);
          setDataLog((prev: any) => [...prev, str]);
        }
        if (parsedData.message) {
          const str = JSON.stringify(parsedData).replace(regx, '');
          setLiveResponse(str);
          setDataLog((prev: any) => [...prev, str]);
        }
        //graphql does not send a resp if an error - will need to throw and catch it
        console.log(`RECEIVED SSE Event: ${JSON.stringify(parsedData)}`);
        console.log('DATA LOGGER: ', dataLog);
      };
    }
  }, [listening]);

  return (
    <div>
      <LiveContext.Provider
        value={{
          liveQuery,
          setLiveQuery,
          liveResponse,
          setLiveResponse,
          dataLog,
        }}
      >
        <GraphContextProvider>
          <Header />
        </GraphContextProvider>
      </LiveContext.Provider>
    </div>
  );
}

export default App;
