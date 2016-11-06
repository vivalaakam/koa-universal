import { createAction } from 'redux-actions';
import { put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { merge } from '../helpers/ramda';

const MODAL_SHOW = Symbol('SHOW_MODAL');
const MODAL_HIDE = Symbol('HIDE_MODAL');
const MODAL_REJECT = Symbol('MODAL_REJECT');
const MODAL_RESOLVE = Symbol('MODAL_RESOLVE');
const MODAL_ACTION_REJECT = Symbol('MODAL_ACTION_REJECT');
const MODAL_ACTION_RESOLVE = Symbol('MODAL_ACTION_RESOLVE');

const $$initialState = {
  type: null,
  props: {},
  resolveInAction: false,
  rejectInAction: false,
  resolveAction: () => {
  },
  rejectAction: () => {
  }
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

const resolveActionModal = createAction(MODAL_ACTION_RESOLVE);

const rejectActionModal = createAction(MODAL_ACTION_REJECT);


function getModal(state) {
  return state.modal;
}

function* resolveModalAction({ payload }) {
  const current = yield select(getModal);
  yield put(resolveModal(true));
  if (current.resolveAction) {
    try {
      yield current.resolveAction(payload);
      yield put(hideModal());
    } catch (e) {
      yield put(resolveModal(false));
    }
  }
}

function* rejectModalAction({ payload }) {
  const current = yield select(getModal);
  yield put(rejectModal(true));
  if (current.rejectAction) {
    try {
      current.rejectAction(payload);
      yield put(hideModal());
    } catch (e) {
      yield put(rejectModal(false));
    }
  }
}

export function* watchResolveActionModal() {
  yield* takeEvery(MODAL_ACTION_RESOLVE, resolveModalAction);
}

export function* watchRejectActionModal() {
  yield* takeEvery(MODAL_ACTION_REJECT, rejectModalAction);
}


export {
  hideModal, showModal, resolveModal, rejectModal, resolveActionModal, rejectActionModal
};
