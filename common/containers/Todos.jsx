import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodosWidget from '../components/Todos/Todos';
import { setFilter } from '../reducers/todos/filter';
import { showModal } from '../reducers/modal';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  clearCompletedTodos
} from '../reducers/todos/list';

const state = ({ todos }) => ({ todos });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    updateTodo,
    createTodo,
    deleteTodo,
    clearCompletedTodos,
    toggleTodo,
    setFilter,
    showModal
  }, dispatch),
  dispatch
});

function Todos({ todos: { list, filter }, actions }) {
  return (
    <TodosWidget {...{ list, filter, actions }} />
  );
}

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.object
};

Todos.onEnter = ({ store, callback }) => {
  store.dispatch(fetchTodos());
  callback();
};

export default connect(state, actionsDispatch)(Todos);
