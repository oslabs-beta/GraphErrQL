// import React from 'react';
// import './App.css';
// import Header from './components/Header';

// function App() {
//   return (
//     <div>
//       <Header />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <Header />
      </header>
    </div>
  );
}

export default App;
