import React from 'react';

const styles = require('./Button.scss');

interface IProps extends React.HTMLAttributes<any> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({ onClick, children }: IProps) => (
  <button
    className={styles.button}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
