import React from 'react'
import {connect} from 'react-redux';
import * as authActions from '../actions/auth';
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router';


const state = ({auth}) => ({auth});

const actions = (dispatch) => ({
    actions: bindActionCreators({...authActions, pushState}, dispatch),
    dispatch
});

class Restricted extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth();
    }

    checkAuth() {
        const {auth, actions} = this.props;

        if (!(auth && auth.id)) {
            actions.pushState(null, '/auth');
        }
    }

    render() {
        const {auth} = this.props;
        if (auth && auth.id) {
            return this.props.children;
        } else {
            return null;
        }
    }

}

export default connect(state, actions)(Restricted)