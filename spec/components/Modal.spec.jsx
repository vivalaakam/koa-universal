import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Modal, { style } from '../../common/components/Modal/Modal';
import { Btn, InfiniteProgress } from '../../common/components/UI';


describe('Modal', () => {
  const props = {
    title: 'my title',
    children: 'text',
    resolve: {
      title: 'Create',
      action: sinon.spy(),
      name: 'resolve'
    },
    reject: {
      title: 'Cancel',
      action: sinon.spy(),
      name: 'reject'
    },
    modal: {
      resolveAction: false,
      rejectAction: false
    }
  };

  const children = <div>with text</div>;

  const renderer = mount(
    <Modal {...props}>
      {children}
    </Modal>
  );

  const resolveButton = renderer.find('[name="resolve"]');
  const rejectButton = renderer.find('[name="reject"]');

  it('Should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('Show children', () => {
    expect(renderer.find(`.${style.content}`).children().html()).to.equal('<div>with text</div>');
  })

  it('Show title', () => {
    expect(renderer.find(`.${style.title}`).text()).to.equal(props.title);
  });

  it('Show buttons', () => {
    expect(renderer.find(Btn)).to.have.length(2);
  });

  it('Show resolve button', () => {
    expect(resolveButton.text()).to.equal(props.resolve.title);
    renderer.setProps({ modal: { ...props.modal, resolveAction: true } });
    expect(resolveButton.find(InfiniteProgress)).to.have.length(1);
    resolveButton.simulate('click');
  });

  it('Show reject button', () => {
    expect(rejectButton.text()).to.equal(props.reject.title);
    renderer.setProps({ modal: { ...props.modal, rejectAction: true } });
    expect(rejectButton.find(InfiniteProgress)).to.have.length(1);
    rejectButton.simulate('click');
  });
});
