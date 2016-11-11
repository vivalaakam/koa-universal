import React, { Component, PropTypes } from 'react';
import style from './Search.scss';

export default class Search extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
  };

  onChange() {
    this.props.actions.searchText(this.refSearch.value);
  }

  createTodo() {
    const { actions, search } = this.props;
    actions.createTodo({ text: search.text, completed: false });
    actions.searchText('');
    this.refSearch.value = '';
  }

  createDoing() {
    const { actions, search } = this.props;
    actions.createDoing({ text: search.text });
    actions.searchText('');
    this.refSearch.value = '';
  }

  renderRow(title, action) {
    const { text } = this.props.search;
    return (
      <button className={style.row} onClick={action}>
        <span className={style.desc}>{title}:</span>&nbsp;
        <span className={style.text}>{text}</span>
      </button>
    );
  }

  renderHint() {
    const { search } = this.props;
    if (search.text) {
      return (
        <div className={style.hint}>
          {this.renderRow('Create todo', ::this.createTodo)}
          {this.renderRow('Create doing', ::this.createDoing)}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={style.Search}>
        <div className={style.wrapper}>
          <input
            ref={c => (this.refSearch = c)}
            type="text" className={style.inp}
            placeholder="Search box"
            onChange={::this.onChange}
          />
          {this.renderHint()}
        </div>
      </div>
    );
  }
}
