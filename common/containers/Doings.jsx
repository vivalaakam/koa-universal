import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DoingsWidget from '../components/Doings/Doings';
import { showModal } from '../reducers/modal';
import {
  fetchDoings,
  createDoing,
  updateDoing,
  deleteDoing
} from '../reducers/doings/list';

const state = ({ doings }) => ({ doings });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    updateDoing,
    createDoing,
    deleteDoing,
    showModal
  }, dispatch),
  dispatch
});

function Doings({ doings: { list }, actions }) {
  return (
    <DoingsWidget {...{ list, actions }} />
  );
}

Doings.propTypes = {
  actions: PropTypes.object.isRequired,
  doings: PropTypes.object
};

Doings.onEnter = ({ store, callback }) => {
  store.dispatch(fetchDoings());
  callback();
};

export default connect(state, actionsDispatch)(Doings);
