import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

if (typeof window !== 'undefined') {
  console.log('In browser, adding .init to window...')
  window['GraphERRQL'] = {
    init: (rootEl, options) => {
      ReactDOM.render(<App />, rootEl);
    }
  };
  console.log('...added');
};