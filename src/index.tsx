import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import configureStore from './store/configureStore';
import Router from './routes';

const store = configureStore();

ReactDOM.render(
  <Router store={store} />,
  document.getElementById('root'),
);
