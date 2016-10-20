import { createAction } from 'redux-actions';

const MAIN_TITLE = Symbol('MAIN_TITLE');

const $$initialState = {};

export default function auth($$state = $$initialState, { type, payload }) {
  switch (type) {
    case MAIN_TITLE:
      return { ...$$state, title: payload };
    default:
      return $$state;
  }
}

const titleMain = createAction(MAIN_TITLE);

export {
  titleMain
};
