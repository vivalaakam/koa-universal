import {
  watchCreateTodo,
  watchFetchTodos,
  watchUpdateTodo,
  watchDeleteTodo,
  watchToggleTodo,
  watchCompleteAllTodos,
  watchClearCompletedTodos
} from '../reducers/todos/list';

export default function* rootSaga() {
  yield [
    watchCreateTodo(),
    watchFetchTodos(),
    watchUpdateTodo(),
    watchDeleteTodo(),
    watchToggleTodo(),
    watchCompleteAllTodos(),
    watchClearCompletedTodos()
  ];
}
