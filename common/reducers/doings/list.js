import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { createAction } from 'redux-actions';
import { prepend, removeByKey, replace } from '../../helpers/ramda';
import Doings from '../../api/doings';

const apiDoings = new Doings();

const DOING_DELETE = Symbol('DOING_DELETE');
const DOING_DESTROY = Symbol('DOING_DESTROY');
const DOING_CREATE = Symbol('DOING_CREATE');
const DOING_UPDATE = Symbol('DOING_UPDATE');
const DOING_RESET = Symbol('DOING_RESET');
const DOING_ADD = Symbol('DOING_ADD');
const DOINGS_FETCH = Symbol('DOINGS_FETCH');
const DOINGS_RESET = Symbol('DOINGS_RESET');

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case DOING_ADD:
      return prepend($$state, payload);
    case DOING_DESTROY:
      return removeByKey($$state, payload);
    case DOING_RESET:
      return replace($$state, [payload]);
    case DOINGS_RESET:
      return payload;
    default:
      return $$state;
  }
}

const createDoing = createAction(DOING_CREATE);

const addDoing = createAction(DOING_ADD);

const updateDoing = createAction(DOING_UPDATE);

const deleteDoing = createAction(DOING_DELETE);

const destroyDoing = createAction(DOING_DESTROY);

const resetDoing = createAction(DOING_RESET);

const fetchDoings = createAction(DOINGS_FETCH);

const resetDoings = createAction(DOINGS_RESET);


function* createDoingAction({ payload }) {
  const todo = yield apiDoings.create(payload);
  yield put(addDoing(todo));
}

function* updateDoingAction({ payload: { id, text = '', completed = false } }) {
  const todo = yield apiDoings.update(id, { text, completed });
  yield put(resetDoing(todo));
}

function* deleteDoingAction({ payload: { id } }) {
  yield apiDoings.remove(id);
  yield put(destroyDoing(id));
}

function* fetchDoingsAction() {
  const todosList = yield apiDoings.all();
  yield put(resetDoings(todosList));
}

export function* watchCreateDoing() {
  yield* takeEvery(DOING_CREATE, createDoingAction);
}

export function* watchUpdateDoing() {
  yield* takeEvery(DOING_UPDATE, updateDoingAction);
}

export function* watchFetchDoings() {
  yield* takeEvery(DOINGS_FETCH, fetchDoingsAction);
}

export function* watchDeleteDoing() {
  yield* takeEvery(DOING_DELETE, deleteDoingAction);
}

export {
  createDoing, fetchDoings, updateDoing, deleteDoing
};
