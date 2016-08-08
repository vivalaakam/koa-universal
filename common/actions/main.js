import {TITLE_MAIN} from '../constants/main';

export function setTitle(title) {
    return {
        type: TITLE_MAIN,
        title
    }
}