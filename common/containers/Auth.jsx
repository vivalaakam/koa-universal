import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import { setTitle } from '../actions/main';
import AuthWidget from '../components/Auth';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators(authActions, dispatch),
  dispatch
});

const Auth = ({ actions, auth, dispatch }) => {
  dispatch(setTitle('Auth page'));
  return (
    <AuthWidget {...{ actions, auth }} />
  );
};

Auth.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state, actionsDispatch)(Auth);
