import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import {
  reducer,
  ISearchState,
  SEARCH_TERM_CHANGED,
  SEARCH_RESULTS_UPDATED,
  IChangeSearchTermPayload,
  IUpdateSearchResultsPayload,
  changeSearchTerm,
  updateSearchResults,
} from './SearchDucks';
import { Action } from '../reducers';
import { IUnsplashApiImageSearchResponse } from '../utils/ApiUtils.interfaces';

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

    it('should create an action for SEARCH_RESULTS_UPDATED', () => {
      const action: Action<IUpdateSearchResultsPayload> = updateSearchResults(searchResponse);
      expect(action).to.deep.equal({
        type: SEARCH_RESULTS_UPDATED,
        payload: {
          results: searchResponse,
        },
      });
    });
  });

  describe('reducer', () => {
    it('should update the state when the search term changes', () => {
      const initialState: ISearchState = {
        searchTerm: '',
        results: {},
      };

      const action: Action<IChangeSearchTermPayload> = {
        type: SEARCH_TERM_CHANGED,
        payload: { searchTerm: 'foo' },
      };


      const newState = reducer(initialState, action);
      expect(newState).to.deep.equal({ searchTerm: 'foo', results: {} });
    });

    it('should update the state when the search result changes', () => {
      const initialState: ISearchState = {
        searchTerm: '',
        results: {},
      };

      const action: Action<IUpdateSearchResultsPayload> = {
        type: SEARCH_RESULTS_UPDATED,
        payload: {
          results: searchResponse,
        },
      };

      const newState = reducer(initialState, action);
      expect(newState).to.deep.equal({ searchTerm: '', results: searchResponse });
    });
  });
});
