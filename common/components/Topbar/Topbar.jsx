import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const style = require('./Topbar.scss');


export default class Topbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    main: PropTypes.object.isRequired
  };

  links() {
    const { auth } = this.props;
    if (auth && auth.id) {
      return (
        <div className={style.auth}>
          <Link className={style.link} to="/todos">Todos</Link>
          <a className={style.link} href="/api/auth/logout">Logout</a>
        </div>
      );
    }

    return (
      <div className={style.auth}>
        <Link className={style.link} to="/auth">Auth</Link>
      </div>
    );
  }

  render() {
    const { main } = this.props;
    return (
      <div className={style.Topbar}>
        <div className={style.title}>
          {main.title}
        </div>
        {this.links()}
      </div>
    );
  }
}
