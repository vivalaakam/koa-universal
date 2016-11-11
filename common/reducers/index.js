import { combineReducers } from 'redux';
import todosList from './todos/list';
import todosFilter from './todos/filter';
import doings from './doings';
import auth from './auth';
import main from './main';
import search from './search';
import modal from './modal';

const todos = combineReducers({
  filter: todosFilter,
  list: todosList
});

export default function (ext) {
  return combineReducers({ todos, doings, search, auth, main, modal, ...ext });
}
