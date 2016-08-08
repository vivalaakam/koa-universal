import {CURRENT_AUTH} from '../constants/auth'
import Auth from '../api/auth';

const auth = new Auth();

function currentDispatch(auth) {
    return {
        type: CURRENT_AUTH,
        auth
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