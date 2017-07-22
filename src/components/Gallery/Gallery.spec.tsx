import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Gallery from '../Gallery';
import { IUnsplashApiImageSearchResponse } from '../../utils/ApiUtils.interfaces';

const data: IUnsplashApiImageSearchResponse = {
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

describe('Gallery', () => {
  it('should render a Gallery', () => {
    const wrapper = shallow(<Gallery data={data} />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should use the small image from the API response and the description for the alt text', () => {
    const wrapper = shallow(<Gallery data={data} />);
    expect(wrapper.find('img').contains(<img src={data.results[0].urls.small} alt={data.results[0].description} />)).to.be.true; // eslint-disable-line no-unused-expressions
  });

  it('should use the image id as the key', () => {
    const wrapper = shallow(<Gallery data={data} />);
    expect(wrapper.find('img').key()).to.equal(data.results[0].id);
  });
});
