import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Modal from './Modal';
import AppWidget from '../components/App/App';

function App({ children }) {
  return (
    <div className="todoapp">
      <Topbar />
      <AppWidget>
        {children}
      </AppWidget>
      <Modal />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect(state => state)(App);
