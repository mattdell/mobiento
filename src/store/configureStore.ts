import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const createLogger = require('redux-logger');

export interface IGlobalState {
  counter: number;
}

function configureStore(initialState?: IGlobalState) {
  const middlewares = [
    createLogger(),
  ];

  const enhancer = compose(
    applyMiddleware(...middlewares),
  );

  return createStore<IGlobalState>(
    rootReducer,
    initialState!,
    enhancer,
  );
}

export default configureStore;
