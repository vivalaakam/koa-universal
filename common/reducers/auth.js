import {CURRENT_AUTH, ERROR_AUTH} from '../constants/auth';

const $$initialState = {};

export default function auth($$state = $$initialState, action) {
    switch (action.type) {
        case CURRENT_AUTH:
            return action.auth;

        case ERROR_AUTH:
            return {...$$state, error: action.error}
        default:
            return $$state
    }
}