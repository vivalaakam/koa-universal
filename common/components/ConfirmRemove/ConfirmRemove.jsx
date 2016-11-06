import React, { Component, PropTypes } from 'react';
import Modal from '../Modal/Modal';

export default class ConfirmRemove extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  onReject() {
    this.props.actions.hideModal();
  }

  onSubmit() {
    this.props.actions.resolveActionModal(this.props.target);
  }

  render() {
    const params = {
      title: this.props.title,
      resolve: {
        title: 'Remove',
        action: ::this.onSubmit
      },
      reject: {
        title: 'Cancel',
        action: ::this.onReject
      }
    };

    return (
      <Modal {...params} modal={this.props.modal} />
    );
  }
}
