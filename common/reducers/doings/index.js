import { combineReducers } from 'redux';
import list from './list';

const doings = combineReducers({
  list
});

export default doings;
