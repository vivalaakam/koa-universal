import { createAction } from 'redux-actions';
import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { merge } from '../helpers/ramda';

import { createTodo } from './todos/list';

const MODAL_SHOW = Symbol('SHOW_MODAL');
const MODAL_HIDE = Symbol('HIDE_MODAL');
const MODAL_REJECT = Symbol('MODAL_REJECT');
const MODAL_RESOLVE = Symbol('MODAL_RESOLVE');

const MODAL_CREATE_TODO = Symbol('MODAL_CREATE_TODO');

const $$initialState = {
  type: null,
  props: {},
  promise: false,
  resolveAction: false,
  rejectAction: false
};

export default function modal($$state = $$initialState, { type, payload }) {
  switch (type) {
    case MODAL_SHOW:
      return payload;
    case MODAL_HIDE:
      return $$initialState;
    case MODAL_REJECT:
      return merge($$state, { rejectAction: payload });
    case MODAL_RESOLVE:
      return merge($$state, { resolveAction: payload });
    default:
      return $$state;
  }
}

const hideModal = createAction(MODAL_HIDE);

const showModal = createAction(MODAL_SHOW);

const resolveModal = createAction(MODAL_RESOLVE);

const rejectModal = createAction(MODAL_REJECT);

const createTodoModal = createAction(MODAL_CREATE_TODO);

function* createTodoAction({ payload }) {
  yield put(resolveModal(true));
  yield put(createTodo(payload));
  yield put(hideModal());
}

export function* watchCreateTodoModal() {
  yield* takeEvery(MODAL_CREATE_TODO, createTodoAction);
}

export {
  hideModal, showModal, resolveModal, rejectModal, createTodoModal
};
