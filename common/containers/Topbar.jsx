import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import TopbarWidget from '../components/Topbar';

const state = ({ auth, main }) => ({ auth, main });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators(authActions, dispatch),
  dispatch
});

const Topbar = ({ actions, auth, main }) => (
  <TopbarWidget {...{ actions, auth, main }} />
);

Topbar.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Topbar);
