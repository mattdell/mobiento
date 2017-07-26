import React, { Component, PropTypes } from 'react';
import { IUnsplashApiImageSearchResponseResultItem } from '../../utils/ApiUtils.interfaces';

interface IProps {
  data: IUnsplashApiImageSearchResponseResultItem[];
}

const styles = require('./Gallery.scss');

const Gallery = ({ data }: IProps) => (
  data && (
    <div>
      <div className={styles.gallery}>
        {
          data.map(result => (
            <figure key={result.id}>
              <img
                alt={result.description}
                src={result.urls.small}
              />
            </figure>
          ))
        }
      </div>
    </div>
  )
);

export default Gallery;
