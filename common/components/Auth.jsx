import React, { Component } from 'react';

export default class Auth extends Component {

  github(e) {
    if (e) {
      e.preventDefault();
    }
    let curWidth = document.body.offsetWidth;
    let curLeft = window.screenLeft;
    let leftPos = curLeft + (curWidth / 2) - 500;

    let curTop = window.screenTop;
    let topPos = curTop + 100;
    let features = `status=no,scrollbar=yes,resizable=yes,width=1000,height=600,top=${topPos},left=${leftPos}`;
    const win = window.open('/api/auth/github', 'auth_popup', features);
    win.onunload = ::this.success
  }

  success() {
    const { actions } = this.props;
    actions.getAuth();
  }

  submitAuth() {
    const { actions } = this.props;
    actions.authentificate(this.refs.username.value, this.refs.password.value);
  }

  getError() {
    if (this.props.auth.error) {
      return (
        <div>{this.props.auth.error}</div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.getError()}
        <div>
          <input type="email" ref="username"/>
        </div>
        <div>
          <input type="password" ref="password"/>
        </div>
        <div>
          <button onClick={::this.submitAuth}>Submit</button>
        </div>
        <a href="javascript:void(0)" onClick={::this.github}>Login via Github</a>
      </div>
    );
  }
}
