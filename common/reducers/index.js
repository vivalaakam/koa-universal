import {combineReducers} from 'redux'
import todos from './todos'

export default function (ext) {
    return combineReducers({
        todos,
        ...ext
    });
}