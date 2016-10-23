import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateTodoWidget from '../components/CreateTodo/CreateTodo';
import * as modalActions from '../reducers/modal';

const state = ({ modal }) => ({ modal });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ ...modalActions }, dispatch),
  dispatch
});

const CreateTodoModal = props => <CreateTodoWidget {...props} />;

CreateTodoModal.propTypes = {
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(CreateTodoModal);
