import { put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeEvery } from 'redux-saga';
import { createAction } from 'redux-actions';
import { merge } from '../helpers/ramda';
import Auth from '../api/auth';

const apiAuth = new Auth();

const AUTH_CURRENT = Symbol('AUTH_CURRENT');
const AUTH_ERROR = Symbol('AUTH_ERROR');
const AUTH_FETCH = Symbol('AUTH_FETCH');
const AUTH_AUTHENTIFICATE = Symbol('AUTH_AUTHENTIFICATE');

const $$initialState = {};

export default function auth($$state = $$initialState, { type, payload }) {
  switch (type) {
    case AUTH_CURRENT:
      return payload;
    case AUTH_ERROR:
      return merge($$state, { error: payload });
    default:
      return $$state;
  }
}


const fetchAuth = createAction(AUTH_FETCH);

const currentAuth = createAction(AUTH_CURRENT);

const errorAuth = createAction(AUTH_ERROR);

const authentificate = createAction(AUTH_AUTHENTIFICATE);

function* fetchAuthAction() {
  const authData = yield apiAuth.current();
  yield put(currentAuth(authData));
}

function* authentificateAction({ payload: { username, password } }) {
  try {
    const user = yield apiAuth.auth({ username, password });
    yield put(currentAuth(user));
    yield put(push('/'));
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

export function* watchFetchAuth() {
  yield* takeEvery(AUTH_FETCH, fetchAuthAction);
}

export function* watchAuthentificate() {
  yield* takeEvery(AUTH_AUTHENTIFICATE, authentificateAction);
}

export {
  fetchAuth, authentificate, errorAuth
};
