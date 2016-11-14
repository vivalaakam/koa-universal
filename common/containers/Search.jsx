import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchWidget from '../components/Search/Search';
import { createTodo } from '../reducers/todos/list';
import { createDoing } from '../reducers/doings/list';

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ createTodo, createDoing }, dispatch),
  dispatch
});

function Search({ actions }) {
  return (
    <SearchWidget {...{ actions }} />
  );
}

Search.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(null, actionsDispatch)(Search);
