import React, {Component} from 'react';

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
        const {actions} = this.props;
        console.log(actions, 'success');
        actions.getAuth();
    }

    render() {
        return (
            <div>
                Auth Page
                <a href="javascript:void(0)" onClick={::this.github}>Login via Github</a>
            </div>
        );
    }
}
