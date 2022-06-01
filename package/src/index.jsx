import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import window from 'global';
console.log('HERE')

global['GraphERRQL'] = {
  init: (rootEl, options) => {
    ReactDOM.render(<App />, rootEl);
  },
  testProp: 'testVal',
};

if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  console.log(`WINDOW: ${window.GraphERRQL.testProp}`);
} else console.log('You are on the server');

const testing2 = (name) => `HELLO ${name}`;
const testing = '5';
export const testing3 = '3';
export default { testing, testing2 };
