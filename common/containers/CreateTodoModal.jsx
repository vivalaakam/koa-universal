import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateTodoWidget from '../components/CreateTodo/CreateTodo';
import { createTodo } from '../reducers/todos';
import * as modalActions from '../reducers/modal';

const state = ({ modal }) => ({ modal });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ ...modalActions, createTodo }, dispatch),
  dispatch
});

const CreateTodoModal = props => <CreateTodoWidget {...props} />;

CreateTodoModal.propTypes = {
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(CreateTodoModal);
