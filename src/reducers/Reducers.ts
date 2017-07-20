import { combineReducers, Reducer } from 'redux';
import { reducer as search, IState as ISearchState } from '../ducks/SearchDucks';

export interface IGlobalState {
  search: ISearchState
}

export type Action<T> = {
  type: string;
  payload: T;
};

const rootReducer = combineReducers<IGlobalState>({
  search,
});

export default rootReducer;
