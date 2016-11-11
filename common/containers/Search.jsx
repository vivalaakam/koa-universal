import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchWidget from '../components/Search/Search';
import { searchText } from '../reducers/search';
import { createTodo } from '../reducers/todos/list';
import { createDoing } from '../reducers/doings/list';

const state = ({ search }) => ({ search });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ searchText, createTodo, createDoing }, dispatch),
  dispatch
});

function Search({ actions, search }) {
  return (
    <SearchWidget {...{ actions, search }} />
  );
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Search);
