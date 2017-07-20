import React, { Component, PropTypes } from 'react';

interface IProps {
  counter: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
}

const Gallery = () => (
  <div className="counter-container">
    Pretty pictures go here
  </div>
);

export default Gallery;
