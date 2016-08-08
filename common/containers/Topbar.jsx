import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/auth';
import TopbarWidget from '../components/Topbar.jsx';

const state = ({auth}) => ({auth});

const actions = (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch),
    dispatch
});

const Topbar = ({actions, auth}) => {
    return (
        <TopbarWidget {...{actions, auth}}/>
    )
};

export default connect(state, actions)(Topbar)