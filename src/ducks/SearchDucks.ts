import { Reducer } from 'redux';
import { Action } from '../reducers';

export interface IState {
  searchTerm: string;
}

const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';

export const changeSearchTerm = (searchTerm: string) => ({
  type: SEARCH_TERM_CHANGED,
  payload: {
    searchTerm,
  },
});

const initialState: IState = {
  searchTerm: '',
};

export const reducer: Reducer<IState> = (state = initialState, action: Action<any>) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_TERM_CHANGED:
      return { ...state, ...payload };
    default:
      return state;
  }
};
