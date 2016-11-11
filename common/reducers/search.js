import { createAction } from 'redux-actions';
import { merge } from '../helpers/ramda';

const TEXT = Symbol('TEXT');

const $$initialState = {};

export default function auth($$state = $$initialState, { type, payload }) {
  switch (type) {
    case TEXT:
      return merge($$state, { text: payload });
    default:
      return $$state;
  }
}

const searchText = createAction(TEXT);

export {
  searchText
};
