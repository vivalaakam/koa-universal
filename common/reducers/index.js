import { combineReducers } from 'redux';
import todosList from './todos/list';
import todosFilter from './todos/filter';
import auth from './auth';
import main from './main';
import modal from './modal';

const todos = combineReducers({
  filter: todosFilter,
  list: todosList
});

export default function (ext) {
  return combineReducers({ todos, auth, main, modal, ...ext });
}
