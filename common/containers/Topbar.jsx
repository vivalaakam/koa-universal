import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/auth';
import TopbarWidget from '../components/Topbar.jsx';

const state = ({auth, main}) => ({auth, main});

const actions = (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch),
    dispatch
});

const Topbar = ({actions, auth, main}) => {
    return (
        <TopbarWidget {...{actions, auth, main}}/>
    )
};

export default connect(state, actions)(Topbar)