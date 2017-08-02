/* ./client/index.js
  which is the webpack entry file
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './index.css';

ReactDOM.render(
  <App />, document.getElementById('root')
);

if (module.hot) {
  module.hot.accept()
}
