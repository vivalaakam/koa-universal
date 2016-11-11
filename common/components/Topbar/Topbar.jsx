import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Search from '../../containers/Search';
import style from './Topbar.scss';

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
          <Link className={style.link} to="/doings">Doings</Link>
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
        <div className={style.search}>
          <Search />
        </div>
        {this.links()}
      </div>
    );
  }
}
