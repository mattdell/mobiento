import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import {
  reducer,
  ISearchState,
  IChangeSearchTermPayload,
  IUpdateSearchResultsPayload,
  SEARCH_TERM_CHANGED,
  SEARCH_RESULTS_ADDED,
  SEARCH_RESULTS_UPDATED,
  changeSearchTerm,
  addSearchResults,
  updateSearchResults,
} from './SearchDucks';
import { Action } from '../reducers';
import { IUnsplashApiImageSearchResponseResultItem, IUnsplashApiImageSearchResponse } from '../utils/ApiUtils.interfaces';

const searchResponse: IUnsplashApiImageSearchResponse = {
  results: [{
    id: '123',
    description: 'photo of a cat',
    urls: {
      raw: 'https://images.unsplash.com/photo-1467646835273-19bc88c4dffb',
      full: 'https://images.unsplash.com/photo-1467646835273-19bc88c4dffb?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=5a64df586ef3e43f8c57aa7949e339a1',
      regular: 'https://images.unsplash.com/photo-1467646835273-19bc88c4dffb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=994cad975107d27819b4850c2a4c409e',
      small: 'https://images.unsplash.com/photo-1467646835273-19bc88c4dffb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=12a3ba123633ff81b2bc1f55b0bf1696',
      thumb: 'https://images.unsplash.com/photo-1467646835273-19bc88c4dffb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=c296f63b3195bf5a6b7423147bf8b7ef',
    },
  }],
  total: 1,
  total_pages: 2,
};

describe('SearchDucks', () => {
  describe('action creators', () => {
    it('should create an action for SEARCH_TERM_CHANGED', () => {
      const action: Action<IChangeSearchTermPayload> = changeSearchTerm('foo');
      expect(action).to.deep.equal({
        type: SEARCH_TERM_CHANGED,
        payload: {
          searchTerm: 'foo',
        },
      });
    });

    it('should create an action for SEARCH_RESULTS_ADDED', () => {
      const action: Action<IUpdateSearchResultsPayload> = addSearchResults(searchResponse);
      expect(action).to.deep.equal({
        type: SEARCH_RESULTS_ADDED,
        payload: {
          results: searchResponse.results,
          totalPages: 2,
        },
      });
    });

    it('should create an action for SEARCH_RESULTS_UPDATED', () => {
      const action: Action<IUpdateSearchResultsPayload> = updateSearchResults(searchResponse, 2);
      expect(action).to.deep.equal({
        type: SEARCH_RESULTS_UPDATED,
        payload: {
          results: searchResponse.results,
          pageNumber: 2,
          totalPages: 2,
        },
      });
    });
  });

  describe('reducer', () => {
    it('should update the state when the search term changes', () => {
      const initialState: ISearchState = {
        searchTerm: '',
        results: {},
        pageNumber: 0,
        totalPages: 0,
      };

      const action: Action<IChangeSearchTermPayload> = {
        type: SEARCH_TERM_CHANGED,
        payload: { searchTerm: 'foo' },
      };

      const newState = reducer(initialState, action);
      expect(newState).to.deep.equal({
        searchTerm: 'foo',
        results: {},
        pageNumber: 0,
        totalPages: 0,
      });
    });

    it('should update the state when the search result is added', () => {
      const initialState: ISearchState = {
        searchTerm: '',
        results: {},
        pageNumber: 0,
        totalPages: 0,
      };

      const action: Action<IUpdateSearchResultsPayload> = {
        type: SEARCH_RESULTS_ADDED,
        payload: {
          results: searchResponse.results,
        },
      };

      const newState = reducer(initialState, action);
      expect(newState).to.deep.equal({
        searchTerm: '',
        results: searchResponse.results,
        pageNumber: 1,
        totalPages: 0,
      });
    });

    it('should update the state when the search result is updated with the next page', () => {
      const initialState: ISearchState = {
        searchTerm: '',
        results: searchResponse.results,
        pageNumber: 1,
        totalPages: 0,
      };

      const action: Action<IUpdateSearchResultsPayload> = {
        type: SEARCH_RESULTS_UPDATED,
        payload: {
          results: searchResponse.results,
          pageNumber: 2,
        },
      };

      const newState = reducer(initialState, action);
      expect(newState).to.deep.equal({
        searchTerm: '',
        results: searchResponse.results.concat(searchResponse.results),
        pageNumber: 2,
        totalPages: 0,
      });
    });
  });
});
