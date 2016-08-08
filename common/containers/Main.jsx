import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as mainActions from '../actions/main'
import MainWidget from '../components/Main.jsx';

const state = ({}) => ({});

const actions = (dispatch) => ({
    actions: bindActionCreators(mainActions, dispatch),
    dispatch
});

const Main = ({actions, dispatch}) => {
    dispatch(mainActions.setTitle('Main page'));
    return (
        <MainWidget {...{actions}}/>
    )
};

export default connect(state, actions)(Main)