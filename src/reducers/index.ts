import { combineReducers, Reducer } from 'redux';
import { reducer as counter } from '../ducks/CounterDucks';
import { IGlobalState } from '../store/configureStore';

const rootReducer = combineReducers<IGlobalState>({
  counter,
});

export default rootReducer;
