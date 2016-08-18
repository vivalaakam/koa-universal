import {CURRENT_AUTH, ERROR_AUTH} from '../constants/auth'
import {redirect} from './main';
import Auth from '../api/auth';

const auth = new Auth();

function currentDispatch(auth) {
    return {
        type: CURRENT_AUTH,
        auth
    }
}

function errorDispatch(error) {
    return {
        type: ERROR_AUTH,
        error
    }
}


export function getAuth() {
    return dispatch => {
        return auth.current()
            .then(auth => {
                dispatch(currentDispatch(auth));
            });
    }
}

export function authentificate(username, password) {
    return dispatch => {
        return auth.auth(username, password)
            .then(username => {
                dispatch(currentDispatch(username));
                redirect('/')
            }, () => {
                dispatch(errorDispatch('Wrong password'));
            })
    }
}