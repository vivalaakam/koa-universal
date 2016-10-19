import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { createAction } from 'redux-actions';
import Todos from '../../api/todos';

const apiTodos = new Todos();

const TODO_DELETE = Symbol('TODO_DELETE');
const TODO_DESTROY = Symbol('TODO_DESTROY');
const TODO_TOGGLE = Symbol('TODO_TOGGLE');
const TODO_CREATE = Symbol('TODO_CREATE');
const TODO_UPDATE = Symbol('TODO_UPDATE');
const TODO_RESET = Symbol('TODO_RESET');
const TODO_ADD = Symbol('TODO_ADD');
const TODOS_FETCH = Symbol('TODOS_FETCH');
const TODOS_RESET = Symbol('TODOS_RESET');
const TODOS_COMPLETE_ALL = Symbol('TODOS_COMPLETE_ALL');
const TODOS_CLEAR_COMPLETED = Symbol('TODOS_CLEAR_COMPLETED');

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case TODO_ADD:
      return [...$$state, payload];
    case TODO_DESTROY:
      return $$state.filter(todo => todo.id !== payload.id);
    case TODO_RESET:
      return $$state.map(todo => (todo.id === payload.id ? Object.assign({}, todo, payload) : todo));
    case TODOS_RESET:
      return payload;
    default:
      return $$state;
  }
}

const createTodo = createAction(TODO_CREATE);

const addTodo = createAction(TODO_ADD);

const updateTodo = createAction(TODO_UPDATE);

const deleteTodo = createAction(TODO_DELETE);

const destroyTodo = createAction(TODO_DESTROY);

const resetTodo = createAction(TODO_RESET);

const toggleTodo = createAction(TODO_TOGGLE);

const fetchTodos = createAction(TODOS_FETCH);

const resetTodos = createAction(TODOS_RESET);

const completeAllTodos = createAction(TODOS_COMPLETE_ALL);

const clearCompletedTodos = createAction(TODOS_CLEAR_COMPLETED);

function* createTodoAction({ payload }) {
  const todo = yield apiTodos.create(payload);
  yield put(addTodo(todo));
}

function* updateTodoAction({ payload: { id, text = '', completed = false } }) {
  const todo = yield apiTodos.update(id, { text, completed });
  yield put(resetTodo(todo));
}

function* deleteTodoAction({ payload: { id } }) {
  yield apiTodos.remove(id);
  yield put(destroyTodo(id));
}

function* fetchTodosAction() {
  const todosList = yield apiTodos.all();
  yield put(resetTodos(todosList));
}

function* toggleTodoAction({ payload: { id, text = '', completed = false } }) {
  yield put(updateTodo({ id, text, completed: !completed }));
}

function* completeAllTodosAction() {
  const todosList = yield apiTodos.completeAll();
  yield put(resetTodos(todosList));
}

function* clearCompletedTodosAction() {
  const todosList = yield apiTodos.clearCompleted();
  yield put(resetTodos(todosList));
}

export function* watchCreateTodo() {
  yield* takeEvery(TODO_CREATE, createTodoAction);
}

export function* watchUpdateTodo() {
  yield* takeEvery(TODO_UPDATE, updateTodoAction);
}

export function* watchFetchTodos() {
  yield* takeEvery(TODOS_FETCH, fetchTodosAction);
}

export function* watchDeleteTodo() {
  yield* takeEvery(TODO_DELETE, deleteTodoAction);
}

export function* watchCompleteAllTodos() {
  yield* takeEvery(TODOS_COMPLETE_ALL, completeAllTodosAction);
}

export function* watchClearCompletedTodos() {
  yield* takeEvery(TODOS_CLEAR_COMPLETED, clearCompletedTodosAction);
}

export function* watchToggleTodo() {
  yield* takeEvery(TODO_TOGGLE, toggleTodoAction);
}

export {
  createTodo, fetchTodos, updateTodo, deleteTodo, completeAllTodos, clearCompletedTodos, toggleTodo
};
