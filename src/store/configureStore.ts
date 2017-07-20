import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer, { IGlobalState } from '../reducers';

const createLogger = require('redux-logger');

const { NODE_ENV } = process.env;

function configureStore(initialState?: IGlobalState) {
  const middleware = [];

  if (NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const enhancer = compose(
    applyMiddleware(...middleware),
  );

  return createStore<IGlobalState>(
    rootReducer,
    initialState!,
    enhancer,
  );
}

export default configureStore;
