import React, { Component, PropTypes } from 'react';
import Inp from '../UI/Inp/Inp';
import Btn from '../UI/Btn/Btn';
import style from './Auth.scss';

export default class Auth extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  getError() {
    const { auth } = this.props;
    if (auth.error) {
      return (
        <div>{this.props.auth.error}</div>
      );
    }

    return null;
  }

  submitAuth() {
    const { actions } = this.props;

    if (this.refEmail.value === '') {
      actions.errorAuth('Field email can`t be blank');
      return;
    }

    if (this.refPassword.value === '') {
      actions.errorAuth('Field password can`t be blank');
      return;
    }

    actions.authentificate({ username: this.refEmail.value, password: this.refPassword.value });
  }

  success() {
    const { actions } = this.props;
    actions.getAuth();
  }

  github(e) {
    if (e) {
      e.preventDefault();
    }
    const curWidth = document.body.offsetWidth;
    const curLeft = window.screenLeft;
    const leftPos = curLeft + (curWidth / 2) - 500;

    const curTop = window.screenTop;
    const topPos = curTop + 100;
    const features = `status=no,scrollbar=yes,resizable=yes,width=1000,height=600,top=${topPos},left=${leftPos}`;
    const win = window.open('/api/auth/github', 'auth_popup', features);
    win.onunload = ::this.success;
  }

  render() {
    return (
      <div className={style.Auth}>
        {this.getError()}
        <div className={style.row}>
          <Inp type="email" link={c => (this.refEmail = c)} placeholder="email" />
        </div>
        <div className={style.row}>
          <Inp type="password" link={c => (this.refPassword = c)} placeholder="passport" />
        </div>
        <div className={style.row}>
          <Btn className={style.btn} onClick={::this.submitAuth}>Submit</Btn>
        </div>
        <div className={style.row}>
          <Btn className={style.btn} scheme="github" onClick={::this.github}>Login via GitHub</Btn>
        </div>
      </div>
    );
  }
}
