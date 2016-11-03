import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import CreateTodo from '../../common/components/CreateTodo/CreateTodo';
import Modal from '../../common/components/Modal/Modal';
import { Inp } from '../../common/components/UI';

describe('CreateTodo', () => {
  const props = {
    actions: {
      hideModal: sinon.spy(),
      createTodoModal: sinon.spy()
    },
    modal: {}
  };

  const renderer = mount(<CreateTodo {...props} />);
  const textField = renderer.find('[name="text"]');

  const rejectButton = renderer.find('[name="reject"]');
  const resolveButton = renderer.find('[name="resolve"]');

  const todoText = 'my_new_todo';

  it('Should render correctly', () => {
    return expect(renderer).to.be.ok;

    expect(renderer.find(Modal)).to.have.length(1);
    expect(renderer.find(Inp)).to.have.length(1);
  });

  it('Create todo', () => {
    textField.node.value = todoText;
    textField.simulate('change');
    expect(textField.node.value).to.equal(todoText);
    expect(renderer.instance().refTodo.value).to.equal(todoText);
    resolveButton.simulate('click');

    sinon.assert.called(props.actions.createTodoModal);
    sinon.assert.calledWith(props.actions.createTodoModal, {
      text: todoText,
      completed: false
    });
  });

  it('Cancel todo', () => {
    rejectButton.simulate('click');

    sinon.assert.called(props.actions.hideModal);
  });
});
