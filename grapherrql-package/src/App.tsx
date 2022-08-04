import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { GraphContextProvider } from './components/SandboxMode/Context';
import { LiveContext } from './components/LiveMode/LiveContext';

function App() {
  const [listening, setListening] = useState(false);
  const [liveQuery, setLiveQuery] = useState('Query');
  const [liveResponse, setLiveResponse] = useState('Response');
  const [dataLog, setDataLog] = useState<any>([]);

  useEffect(() => {
    if (!listening) {
      const source = new EventSource(document.cookie.slice(10, -1));
      console.log('listening for events from Host App SSE...');
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        const regx = /\\n|/g;
        if (parsedData.query) {
          let str = JSON.stringify(parsedData.timestamp).concat(
            JSON.stringify(parsedData.query).replace(regx, '')
          );
          setLiveQuery(str);
          setDataLog((prev: any) => [...prev, str]);
        }
        if (parsedData.data) {
          const str = JSON.stringify(parsedData.timestamp).concat(
            JSON.stringify(parsedData.data).replace(regx, '')
          );
          setLiveResponse(str);
          setDataLog((prev: any) => [...prev, str]);
        }
        if (parsedData.message) {
          const str = JSON.stringify(parsedData.timestamp).concat(
            JSON.stringify(parsedData.message).replace(regx, '')
          );
          setLiveResponse(str);
          setDataLog((prev: any) => [...prev, str]);
        }
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
