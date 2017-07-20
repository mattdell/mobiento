import React, { Component } from 'react';

const styles = require('./Footer.scss');

const Footer = () => (
  <footer className={styles.footer}>
    <span>
      Made in London with <span className={styles.heart}>♥</span> by <a href="https://github.com/mattdell">Matt Dell</a>.
    </span>
  </footer>
);

export default Footer;
