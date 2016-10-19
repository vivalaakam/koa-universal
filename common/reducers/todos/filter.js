import { createAction } from 'redux-actions';

const SET_FILTER = Symbol('SET_FILTER');
const FILTER_ALL = Symbol('FILTER_ALL');
const FILTER_COMPLETED = Symbol('FILTER_COMPLETED');
const FILTER_ACTIVE = Symbol('FILTER_ACTIVE');

const $$initialState = FILTER_ALL;

export default function filter($$state = $$initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return $$state;
  }
}

const setFilter = createAction(SET_FILTER);

export {
  FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED, setFilter
};
