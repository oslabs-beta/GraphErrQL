import React from 'react';
import './App.css';
import Header from './components/Header';
import { GraphContextProvider } from './components/SandboxMode/Context';

function App() {
  return (
    <div>
      <GraphContextProvider>
        <Header />
      </GraphContextProvider>
    </div>
  );
}

export default App;
