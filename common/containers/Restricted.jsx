import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import * as authActions from '../actions/auth';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ ...authActions, pushState }, dispatch),
  dispatch
});

class Restricted extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps() {
    this.checkAuth();
  }

  checkAuth() {
    const { auth, actions } = this.props;

    if (!(auth && auth.id)) {
      actions.pushState(null, '/auth');
    }
  }

  render() {
    const { auth } = this.props;
    if (auth && auth.id) {
      return this.props.children;
    }

    return null;
  }
}

export default connect(state, actionsDispatch)(Restricted);
