import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopbarWidget from '../components/Topbar/Topbar';

const state = ({ auth, main }) => ({ auth, main });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({}, dispatch),
  dispatch
});

function Topbar({ actions, auth, main }) {
  return (
    <TopbarWidget {...{ actions, auth, main }} />
  );
}

Topbar.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Topbar);
