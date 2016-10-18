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
    this.props.actions.createTodo({ text: this.refTodo.value, completed: false });
    this.props.actions.hideModal();
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
      <Modal {...params}>
        <div className={style.row}>
          <Inp className={style.inp} link={c => (this.refTodo = c)} placeholder="What needs to be done?" />
        </div>
      </Modal>
    );
  }
}
