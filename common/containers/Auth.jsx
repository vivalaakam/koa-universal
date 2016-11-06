import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authentificate, errorAuth } from '../reducers/auth';
import AuthWidget from '../components/Auth/Auth';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ authentificate, errorAuth }, dispatch),
  dispatch
});

function Auth({ actions, auth }) {
  return (<AuthWidget {...{ actions, auth }} />);
}

Auth.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Auth);
