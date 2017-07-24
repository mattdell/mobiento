import React, { Component, PropTypes } from 'react';
import { IUnsplashApiImageSearchResponse } from '../../utils/ApiUtils.interfaces';

interface IProps {
  data: IUnsplashApiImageSearchResponse;
}

const Gallery = ({ data }: IProps) => (
  <div>
    {
      data && data.results.map(result => (
        <img
          alt={result.description}
          key={result.id}
          src={result.urls.small}
        />
      ))
    }
  </div>
);

export default Gallery;
