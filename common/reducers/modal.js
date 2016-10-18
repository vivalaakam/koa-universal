import { createAction } from 'redux-actions';

const MODAL_SHOW = Symbol('SHOW_MODAL');
const MODAL_HIDE = Symbol('HIDE_MODAL');

const $$initialState = {
  type: null,
  props: {},
  promise: false
};

export default function modal(state = $$initialState, action) {
  switch (action.type) {
    case MODAL_SHOW:
      return action.payload;
    case MODAL_HIDE:
      return $$initialState;
    default:
      return state;
  }
}

const hideModal = createAction(MODAL_HIDE);

const showModal = createAction(MODAL_SHOW);

export {
  hideModal, showModal
};
