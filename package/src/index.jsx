import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import window from 'global';
import invokeGraphERRQL from './middleware';
// console.log('GLOBAL THIS', this);
if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  // ✅ Can use window here
  window.GraphERRQL = {
    init: (rootEl, options) => {
      ReactDOM.render(<App />, rootEl);
    },
  };
} else {
  console.log('You are on the server');
  // ⛔️ Don't use window here
}
const testing2 = function () {
  return 'HELLO';
};
const testing = '5';
export default { testing, testing2 };
export const test3 = () => {
  return 'Hello';
};
