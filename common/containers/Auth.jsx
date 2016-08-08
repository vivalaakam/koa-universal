import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/auth';
import AuthWidget from '../components/Auth.jsx';

const state = ({auth}) => ({auth});

const actions = (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch),
    dispatch
});

const Auth = ({actions, auth}) => {
    return (
        <AuthWidget {...{actions, auth}}/>
    )
};

export default connect(state, actions)(Auth)