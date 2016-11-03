import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import TodoRow, { style } from '../../common/components/TodoRow/TodoRow';
import TodoTextInput from '../../common/components/TodoTextInput/TodoTextInput';

describe('TodoRow', () => {
  const todo = {
    completed: true,
    text: 'todo_text'
  };
  const props = {
    todo,
    updateTodo: sinon.stub(),
    deleteTodo: sinon.stub(),
    toggleTodo: sinon.stub()
  };
  const renderer = (cprops) => shallow(<TodoRow {...cprops} />);

  it('Should render correctly', () => {
    return expect(renderer(props)).to.be.ok;
  });

  it('Toggle todo', () => {
    const toggleTodo = sinon.spy();
    const toggleRenderer = renderer({ ...props, toggleTodo });
    const toggleInput = toggleRenderer.find('[name="toggle"]');
    toggleInput.simulate('change');
    expect(toggleTodo.called).to.equal(true);
    expect(toggleTodo.calledWith(todo)).to.equal(true);
  });

  it('Remove todo', () => {
    const deleteTodo = sinon.spy();
    const deleteRenderer = renderer({ ...props, deleteTodo });
    const deleteButton = deleteRenderer.find(`.${style.destroy}`);
    deleteButton.simulate('click');
    expect(deleteTodo.called).to.equal(true);
    expect(deleteTodo.calledWith(todo)).to.equal(true);
  });

  it('Default todo state', () => {
    const mainRenderer = renderer(props);
    const mainCell = mainRenderer.find(`.${style.mainCell}`);
    expect(mainCell.text()).to.equal(todo.text);
  });

  it('Edit todo', () => {
    const mainRenderer = renderer(props);
    const mainCell = mainRenderer.find(`.${style.mainCell}`);
    mainCell.simulate('dblclick');
    expect(mainRenderer.find(TodoTextInput)).to.have.length(1);
    expect(mainRenderer.state('editing')).to.equal(true);
  });

  it('Handle update', () => {
    const updateTodo = sinon.spy();
    const text = 'text';
    const mainRenderer = renderer({ ...props, updateTodo });
    mainRenderer.setState({ editing: true });
    mainRenderer.instance().handleSave(text);
    expect(updateTodo.called).to.equal(true);
    expect(updateTodo.calledWith({ ...todo, text })).to.equal(true);
    expect(mainRenderer.state('editing')).to.equal(false);
  });

  it('Handle delete', () => {
    const deleteTodo = sinon.spy();
    const text = 'text';
    const mainRenderer = renderer({ ...props, deleteTodo });
    mainRenderer.setState({ editing: true });
    mainRenderer.instance().handleSave('');
    expect(deleteTodo.called).to.equal(true);
    expect(deleteTodo.calledWith(todo)).to.equal(true);
    expect(mainRenderer.state('editing')).to.equal(false);
  });
});
