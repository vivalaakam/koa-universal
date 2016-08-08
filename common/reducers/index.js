import {combineReducers} from 'redux'
import todos from './todos'
import auth from './auth'

export default function (ext) {
    return combineReducers({
        todos, auth,
        ...ext
    });
}