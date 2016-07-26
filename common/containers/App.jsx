import React, {Component} from 'react'
import { connect } from 'react-redux'

const App = ({children}) => {
    return (
        <div className="todoapp">
            {children}
        </div>
    )
};

export default connect(state => state)(App)
