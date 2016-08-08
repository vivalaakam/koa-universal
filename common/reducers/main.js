import {TITLE_MAIN} from '../constants/main';

const $$initialState = {};

export default function auth($$state = $$initialState, action) {
    switch (action.type) {
        case TITLE_MAIN:
            return {...$$state, title: action.title};
        default:
            return $$state
    }
}