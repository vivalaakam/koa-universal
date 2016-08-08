import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from '../containers/App.jsx'
import Main from '../containers/Main.jsx'
import Auth from '../containers/Auth.jsx'
import Todos from '../containers/Todos.jsx'
import Restricted from '../containers/Restricted.jsx'

export default ({store, first}) => {
    function w(loader) {
        return (nextState, replaceState, callback) => {
            if (first.time) {
                first.time = false;
                return callback();
            }
            return loader ? loader({store, nextState, replaceState, callback}) : callback();
        };
    }

    function c(prevState, nextState, replace, callback) {
        first.time = false;
        return callback();
    }

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Main}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/" component={Restricted}>
                <Route path="/todos" component={Todos}/>
            </Route>
        </Route>
    )
};
