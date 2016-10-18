import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Modal from './Modal';

const App = ({ children }) => (
  <div className="todoapp">
    <Topbar />
    {children}
    <Modal />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect(state => state)(App);
