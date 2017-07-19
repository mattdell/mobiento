import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';

interface IProps {
  store: any;
}

const Root = ({ store }: IProps) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default Root;
