import React, { Component, PropTypes } from 'react';
import style from './Modal.scss';

export default class Modal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    resolve: PropTypes.object,
    reject: PropTypes.object
  };

  static button(type) {
    if (type) {
      return (
        <button className={style.btn} onClick={type.action}>{type.title}</button>
      );
    }

    return null;
  }

  render() {
    const { title, resolve, reject } = this.props;
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
            {Modal.button(reject)}
            {Modal.button(resolve)}
          </div>
        </div>
      </div>
    );
  }
}
