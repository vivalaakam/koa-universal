import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todos';
import { setTitle } from '../actions/main';
import TodosWidget from '../components/Todos/Todos';

const state = ({ todos }) => ({ todos });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators(todoActions, dispatch),
  dispatch
});

const Todos = ({ todos, actions, dispatch }) => {
  dispatch(setTitle('Todos'));
  return (
    <TodosWidget {...{ todos, actions }} />
  );
};

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
};

export default connect(state, actionsDispatch)(Todos);
