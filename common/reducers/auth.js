import {CURRENT_AUTH} from '../constants/auth';

const $$initialState = {};

export default function auth($$state = $$initialState, action) {
    switch (action.type) {
        case CURRENT_AUTH:
            return action.auth;

        default:
            return $$state
    }
}