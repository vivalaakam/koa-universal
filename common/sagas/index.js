import {
  watchCreateTodo,
  watchFetchTodos,
  watchUpdateTodo,
  watchDeleteTodo,
  watchToggleTodo,
  watchCompleteAllTodos,
  watchClearCompletedTodos
} from '../reducers/todos/list';
import {
  watchCreateDoing,
  watchFetchDoings,
  watchUpdateDoing,
  watchDeleteDoing
} from '../reducers/doings/list';

import { watchFetchAuth, watchAuthentificate } from '../reducers/auth';
import { watchResolveActionModal, watchRejectActionModal } from '../reducers/modal';

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
    watchResolveActionModal(),
    watchCreateDoing(),
    watchFetchDoings(),
    watchUpdateDoing(),
    watchDeleteDoing(),
    watchRejectActionModal()
  ];
}
