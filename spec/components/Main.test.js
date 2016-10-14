import React from 'react';
import { shallow } from 'enzyme';
import Main from 'common/components/Main.jsx';

describe('Component::Main', function () {
  let props;
  beforeEach(() => {
    props = {};
  });

  function renderDoc() {
    return shallow(<Main {...props} />);
  }

  it('Main text', () => {
    const main = renderDoc();
    expect(main.find('div').text()).to.equal('Main page');
  });
});
