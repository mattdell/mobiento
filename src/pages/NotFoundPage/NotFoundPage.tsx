import React from 'react';

const styles = require('./NotFoundPage.scss');

export default () => (
  <div className={styles['page-container']}>
    <div>{'Sorry, we couldn\'t find what you were looking for.'}</div>
  </div>
);
