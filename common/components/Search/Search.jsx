import React, { Component, PropTypes } from 'react';
import style from './Search.scss';

export default class Search extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  createTodo() {
    const { actions } = this.props;
    actions.createTodo({ text: this.state.text, completed: false });
    this.setState({ text: '' });
  }

  createDoing() {
    const { actions } = this.props;
    actions.createDoing({ text: this.state.text });
    this.setState({ text: '' });
  }

  renderRow(title, action) {
    const { text } = this.state;
    return (
      <button className={style.row} onClick={action}>
        <span className={style.desc}>{title}:</span>&nbsp;
        <span className={style.text}>{text}</span>
      </button>
    );
  }

  renderHint() {
    if (this.state.text) {
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
            type="text" className={style.inp}
            placeholder="Search box"
            value={this.state.text}
            onChange={::this.onChange}
          />
          {this.renderHint()}
        </div>
      </div>
    );
  }
}
