import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import configureStore from './store/configureStore';

import './styles/main.scss';

const store = configureStore();

ReactDOM.render(
  <Router store={store} />,
  document.getElementById('root'),
);
