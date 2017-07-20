// Packages
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components
import IndexPage from '../pages/IndexPage';
import NotFoundView from '../pages/NotFoundPage';

// Interfaces
interface IProps {
  store: any;
}

const Root = ({ store }: IProps) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={IndexPage} />
        <Route path="*" component={NotFoundView} />
      </Route>
    </Router>
  </Provider>
);

export default Root;
