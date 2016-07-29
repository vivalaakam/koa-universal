import React from 'react'
import Router, {Route} from 'react-router'
import App from '../containers/App.jsx'
import Todos from '../containers/Todos.jsx'

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
            <Route path="/todos" component={Todos}/>
        </Route>
    )
};
