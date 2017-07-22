// Packages
import { Reducer } from 'redux';
import { Action } from '../reducers';

// Interfaces
import { IUnsplashApiImageSearchResponse } from '../utils/ApiUtils.interfaces';

export interface ISearchState {
  searchTerm: string;
  results: any;
}

// Constants
export const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';
export const SEARCH_RESULTS_UPDATED = 'SEARCH_RESULTS_UPDATED';

// Action Creators
export interface IChangeSearchTermPayload {
  searchTerm: string;
}

export const changeSearchTerm = (searchTerm: string): Action<IChangeSearchTermPayload> => ({
  type: SEARCH_TERM_CHANGED,
  payload: {
    searchTerm,
  },
});

export interface IUpdateSearchResultsPayload {
  results: IUnsplashApiImageSearchResponse
}

export const updateSearchResults = (results: IUnsplashApiImageSearchResponse): Action<IUpdateSearchResultsPayload> => ({
  type: SEARCH_RESULTS_UPDATED,
  payload: {
    results,
  },
});

// Reducer
const initialState: ISearchState = {
  searchTerm: '',
  results: null,
};

export const reducer: Reducer<ISearchState> = (state = initialState, action: Action<any>) => (
  { ...state, ...action.payload }
);
