import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Topbar extends Component {

    links() {
        const {auth} = this.props;
        if (auth && auth.id) {
            return (
                <div className="Topbar__auth-links">
                    <Link to="/todos">Todos</Link>
                    <a href="/api/auth/logout">Logout</a>
                </div>
            )
        } else {
            return (
                <div className="Topbar__auth-links">
                    <Link to="/auth">Auth</Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="Topbar">
                <div className="Topbar__auth">
                    {this.links()}
                </div>
            </div>
        );
    }
}