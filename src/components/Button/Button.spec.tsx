import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Button from '../Button';

describe('Button', () => {
  it('should render aa button', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should handle onClick', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow((
      <Button onClick={handleClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(handleClick).to.have.property('callCount', 1);
  });
});
