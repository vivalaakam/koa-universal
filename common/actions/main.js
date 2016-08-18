import {TITLE_MAIN} from '../constants/main';
import  {LOCATION_CHANGE} from 'react-router-redux';


export function setTitle(title) {
    return {
        type: TITLE_MAIN,
        title
    }
}

export function redirect(pathname) {
    return {
        type: LOCATION_CHANGE,
        payload: {
            action: "PUSH",
            search: "",
            hash: "",
            pathname
        }
    }
}