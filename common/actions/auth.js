import { CURRENT_AUTH, ERROR_AUTH } from '../constants/auth';
import { redirect } from './main';
import Auth from '../api/auth';

const apiAuth = new Auth();

function currentDispatch(auth) {
  return {
    type: CURRENT_AUTH,
    auth
  };
}

function errorDispatch(error) {
  return {
    type: ERROR_AUTH,
    error
  };
}


export function getAuth() {
  return dispatch => apiAuth.current()
    .then((auth) => {
      dispatch(currentDispatch(auth));
    });
}

export function authentificate(username, password) {
  return dispatch => apiAuth.auth(username, password)
    .then((user) => {
      dispatch(currentDispatch(user));
      redirect('/');
    }, () => {
      dispatch(errorDispatch('Wrong password'));
    });
}
