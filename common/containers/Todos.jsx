import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todos';
import { setTitle } from '../actions/main';
import TodosWidget from '../components/Todos/Todos';
import { setFilter } from '../reducers/filter';

const state = ({ todos, filter }) => ({ todos, filter });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ ...todoActions, setFilter }, dispatch),
  dispatch
});

const Todos = ({ todos, actions, filter, dispatch }) => {
  dispatch(setTitle('Todos'));
  return (
    <TodosWidget {...{ todos, filter, actions }} />
  );
};

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  filter: PropTypes.symbol.isRequired
};

export default connect(state, actionsDispatch)(Todos);
