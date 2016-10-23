import React, { Component, PropTypes } from 'react';
import Modal from '../Modal/Modal';
import style from './CreateTodo.scss';
import Inp from '../UI/Inp/Inp';

export default class CreateTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  onReject() {
    this.props.actions.hideModal();
  }

  onSubmit() {
    if (this.refTodo.value) {
      this.props.actions.createTodoModal({ text: this.refTodo.value, completed: false });
    }
  }

  render() {
    const params = {
      title: 'Create todo',
      resolve: {
        title: 'Create',
        action: ::this.onSubmit
      },
      reject: {
        title: 'Cancel',
        action: ::this.onReject
      }
    };

    return (
      <Modal {...params} modal={this.props.modal}>
        <div className={style.row}>
          <Inp className={style.inp} link={c => (this.refTodo = c)} placeholder="What needs to be done?" />
        </div>
      </Modal>
    );
  }
}
