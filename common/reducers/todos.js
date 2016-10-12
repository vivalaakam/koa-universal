import { ADD_TODO, DELETE_TODO, UPDATE_TODO, LIST_TODO } from '../constants/todos';

const $$initialState = [];

export default function todos($$state = $$initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [action.todo, ...$$state];
    case DELETE_TODO:
      return $$state.filter(todo => todo.id !== action.id);
    case UPDATE_TODO:
      return $$state.map(todo => (todo.id === action.todo.id ? Object.assign({}, todo, action.todo) : todo));
    case LIST_TODO:
      return action.todos;
    default:
      return $$state;
  }
}
