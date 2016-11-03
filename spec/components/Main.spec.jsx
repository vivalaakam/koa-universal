import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Main, { style } from '../../common/components/Main/Main';

describe('Main', () => {
  const renderer = mount(<Main />);

  it('Should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('Main text', () => {
    return expect(renderer.find('div').text()).to.equal('Main page');
  });
});
