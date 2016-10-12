import React, { Component } from 'react'
import { connect } from 'react-redux'
import Topbar from './Topbar';

const App = ({ children }) => {
  return (
    <div className="todoapp">
      <Topbar />
      {children}
    </div>
  )
};

export default connect(state => state)(App)
