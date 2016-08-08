import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Topbar extends Component {

    links() {
        const {auth} = this.props;
        if (auth && auth.id) {
            return (
                <div className="Topbar__auth-links">
                    <Link className="Topbar__auth-link" to="/todos">Todos</Link>
                    <a className="Topbar__auth-link" href="/api/auth/logout">Logout</a>
                </div>
            )
        } else {
            return (
                <div className="Topbar__auth-links">
                    <Link className="Topbar__auth-link" to="/auth">Auth</Link>
                </div>
            )
        }
    }

    render() {
        const {main} = this.props;

        return (
            <div className="Topbar">
                <div className="Topbar__title">
                    {main.title}
                </div>
                <div className="Topbar__auth">
                    {this.links()}
                </div>
            </div>
        );
    }
}