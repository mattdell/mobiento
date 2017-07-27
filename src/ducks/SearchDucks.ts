// Packages
import { Reducer } from 'redux';
import { Action } from '../reducers';

// Interfaces
import { IUnsplashApiImageSearchResponseResultItem, IUnsplashApiImageSearchResponse } from '../utils/ApiUtils.interfaces';

export interface ISearchState {
  searchTerm: string;
  results: any;
  pageNumber: number;
  totalPages: number;
}

// Constants
export const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED';
export const SEARCH_RESULTS_ADDED = 'SEARCH_RESULTS_ADDED';
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
  results: IUnsplashApiImageSearchResponseResultItem[]
  pageNumber?: number;
  totalPages?: number;
}

export const addSearchResults = (response: IUnsplashApiImageSearchResponse): Action<IUpdateSearchResultsPayload> => ({
  type: SEARCH_RESULTS_ADDED,
  payload: {
    results: response.results,
    totalPages: response.total_pages,
  },
});

export const updateSearchResults = (response: IUnsplashApiImageSearchResponse, pageNumber: number): Action<IUpdateSearchResultsPayload> => ({
  type: SEARCH_RESULTS_UPDATED,
  payload: {
    results: response.results,
    pageNumber,
    totalPages: response.total_pages,
  },
});

// Reducer
const initialState: ISearchState = {
  searchTerm: '',
  results: null,
  pageNumber: 0,
  totalPages: 0,
};

export const reducer: Reducer<ISearchState> = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case SEARCH_RESULTS_ADDED:
      return { ...state, ...action.payload, ...{ pageNumber: 1 } };
    case SEARCH_RESULTS_UPDATED:
      return { ...state, ...action.payload, results: [...state.results, ...action.payload.results] };
    default:
      return { ...state, ...action.payload };
  }
};
