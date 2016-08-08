import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as todoActions from '../actions/todos'
import {setTitle} from '../actions/main';
import TodosWidget from '../components/Todos.jsx';

const state = ({todos}) => ({
    todos
});

const actions = (dispatch) => ({
    actions: bindActionCreators(todoActions, dispatch),
    dispatch
});

const Todos = ({todos, actions, dispatch}) => {
    dispatch(setTitle('Todos'));
    return (
        <TodosWidget {...{todos, actions}}/>
    )
}

export default connect(state, actions)(Todos)