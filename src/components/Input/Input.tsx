import React, { Component } from 'react';

const styles = require('./Input.scss');

interface IProps {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  value?: string;
}

const Input = ({
  onBlur,
  onChange,
  type,
  value,
}: IProps) => (
  <div>
    <input
      onBlur={onBlur}
      onChange={onChange}
      type={type || 'text'}
      value={value}
    />
  </div>
);

export default Input;
