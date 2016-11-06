import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateTodo from '../components/CreateTodo/CreateTodo';
import ConfirmRemove from '../components/ConfirmRemove/ConfirmRemove';
import * as modalActions from '../reducers/modal';

const MODAL_COMPONENTS = {
  CREATE_TODO: CreateTodo,
  CONFIRM_REMOVE: ConfirmRemove
};

const state = ({ modal }) => ({ modal });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators(modalActions, dispatch),
  dispatch
});

class Modal extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired
  };

  render() {
    const { actions, modal } = this.props;

    if (!modal.type || !MODAL_COMPONENTS[modal.type]) {
      return null;
    }
    const Comp = MODAL_COMPONENTS[modal.type];
    return (
      <Comp {...modal.props} actions={actions} modal={modal} />
    );
  }
}

export default connect(state, actionsDispatch)(Modal);
