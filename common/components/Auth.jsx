import React, { Component, PropTypes } from 'react';

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
    actions.authentificate(this.refEmail.value, this.refPassword.value);
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
      <div>
        {this.getError()}
        <div>
          <input type="email" ref={c => (this.refEmail = c)} />
        </div>
        <div>
          <input type="password" ref={c => (this.refPassword = c)} />
        </div>
        <div>
          <button onClick={::this.submitAuth}>Submit</button>
        </div>
        <button onClick={::this.github}>Login via Github</button>
      </div>
    );
  }
}
