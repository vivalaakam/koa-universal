import { combineReducers } from 'redux';
import todos from './todos';
import auth from './auth';
import main from './main';
import filter from './filter';

export default function (ext) {
  return combineReducers({ todos, auth, main, filter, ...ext });
}
