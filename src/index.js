import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
import store from './store/store';
import packageJson from '../package.json';

ReactDOM.render(
  <Provider store={store}>
    <App version={packageJson.version} />
  </Provider>,
  document.getElementById('root')
);
