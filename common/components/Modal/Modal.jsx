import React, { Component, PropTypes } from 'react';
import style from './Modal.scss';
import { Btn, InfiniteProgress } from '../UI';

export {
  style
};

export default class Modal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    resolve: PropTypes.object,
    reject: PropTypes.object,
    modal: PropTypes.object
  };

  static button(type, action, inverted = false) {
    if (type) {
      const content = action ? <InfiniteProgress /> : type.title;
      return (
        <Btn
          name={type.name}
          onClick={type.action}
          inverted={inverted}
          disabled={action}
          active={action}
        >{content}</Btn>
      );
    }

    return null;
  }

  render() {
    const { title, resolve, reject, modal } = this.props;
    return (
      <div className={style.Modal}>
        <div className={style.wrapper}>
          <div className={style.title}>
            {title}
          </div>
          <div className={style.content}>
            {this.props.children}
          </div>
          <div className={style.controls}>
            {Modal.button(reject, modal.rejectAction, true)}
            {Modal.button(resolve, modal.resolveAction)}
          </div>
        </div>
      </div>
    );
  }
}
