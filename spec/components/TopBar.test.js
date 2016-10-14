import React from 'react';
import { shallow } from 'enzyme';
import TopBar from 'common/components/TopBar.jsx';

describe('Component::TopBar', () => {
  let props;
  const PAGE_NAME = 'PAGE_NAME';
  beforeEach(() => {
    props = {
      main: {
        title: PAGE_NAME
      }
    };
  });

  function renderDoc() {
    return shallow(<TopBar {...props} />);
  }

  it('title', () => {
    const topBar = renderDoc();
    expect(topBar.find('.Topbar__title').text()).to.equal(PAGE_NAME);
  });

  it('auth links', () => {
    const topBar = renderDoc();
    expect(topBar.find('.Topbar__auth-link')).to.have.length(1);
  });
});

describe('Component::TopBar autohrized', () => {
  let props;
  const PAGE_NAME = 'PAGE_NAME';
  beforeEach(() => {
    props = {
      main: {
        title: PAGE_NAME
      },
      auth: {
        id: 123
      }
    };
  });

  function renderDoc() {
    return shallow(<TopBar {...props} />);
  }

  it('auth links', () => {
    const topBar = renderDoc();
    expect(topBar.find('.Topbar__auth-link')).to.have.length(2);
  });
});
