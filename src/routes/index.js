import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../containers/App';
import { NotFoundView, Counter, FooView, BarView } from '../components';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Counter}/>
      <Route path="foo" component={FooView}/>
      <Route path="bar" component={BarView}/>
      <Route path="*" component={NotFoundView} />
    </Route>
  </Router>
);
