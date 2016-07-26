import React from 'react'
import Router, {Route} from 'react-router'
import App from '../containers/App.jsx'
import Todos from '../containers/Todos.jsx'

export default (
    <Route path="/" component={App}>
        <Route path="/todos" component={Todos}/>
    </Route>
)
