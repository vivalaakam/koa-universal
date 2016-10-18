import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodosWidget from '../components/Todos/Todos';
import { setFilter } from '../reducers/filter';
import { showModal } from '../reducers/modal';
import { fetchTodos, updateTodo, deleteTodo, toggleTodo, clearCompletedTodos } from '../reducers/todos';

const state = ({ todos, filter }) => ({ todos, filter });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    updateTodo,
    deleteTodo,
    clearCompletedTodos,
    toggleTodo,
    setFilter,
    showModal
  }, dispatch),
  dispatch
});

const Todos = ({ todos, actions, filter }) => (
  <TodosWidget {...{ todos, filter, actions }} />
);


Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  filter: PropTypes.symbol.isRequired
};

Todos.onEnter = ({ store, callback }) => {
  store.dispatch(fetchTodos());
  callback();
};

export default connect(state, actionsDispatch)(Todos);
