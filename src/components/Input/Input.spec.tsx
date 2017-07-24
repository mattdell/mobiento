import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Input from '../Input';

describe('Input', () => {
  it('should render an input', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should should accept different types', () => {
    const wrapper = shallow(<Input
      type="foo"
    />);
    expect(wrapper.find('input').props().type).to.equal('foo');
  });

  it('should handle onChange', () => {
    const handleChange = sinon.spy();
    const wrapper = shallow((
      <Input onChange={handleChange} />
    ));
    wrapper.find('input').simulate('change');
    expect(handleChange).to.have.property('callCount', 1);
  });

  it('should handle onBlur', () => {
    const handleBlur = sinon.spy();
    const wrapper = shallow((
      <Input onBlur={handleBlur} />
    ));
    wrapper.find('input').simulate('blur');
    expect(handleBlur).to.have.property('callCount', 1);
  });
});
