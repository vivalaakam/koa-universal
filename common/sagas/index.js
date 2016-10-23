import {
  watchCreateTodo,
  watchFetchTodos,
  watchUpdateTodo,
  watchDeleteTodo,
  watchToggleTodo,
  watchCompleteAllTodos,
  watchClearCompletedTodos
} from '../reducers/todos/list';
import { watchFetchAuth, watchAuthentificate } from '../reducers/auth';
import { watchCreateTodoModal } from '../reducers/modal';

export default function* rootSaga() {
  yield [
    watchCreateTodo(),
    watchFetchTodos(),
    watchUpdateTodo(),
    watchDeleteTodo(),
    watchToggleTodo(),
    watchCompleteAllTodos(),
    watchClearCompletedTodos(),
    watchFetchAuth(),
    watchAuthentificate(),
    watchCreateTodoModal()
  ];
}
