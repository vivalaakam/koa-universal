import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainWidget from '../components/Main';

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({}, dispatch),
  dispatch
});

const Main = ({ actions }) => <MainWidget {...{ actions }} />;

Main.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(state => state, actionsDispatch)(Main);
