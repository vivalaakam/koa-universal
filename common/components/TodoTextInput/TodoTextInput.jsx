import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Inp from '../UI/Inp/Inp';
import style from './TodoTextInput.scss';

export default class TodoTextInput extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    newTodo: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit(e) {
    const text = this.refTodo.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange() {
    this.setState({ text: this.refTodo.value });
  }

  handleBlur() {
    if (!this.props.newTodo) {
      this.props.onSave(this.refTodo.value);
    }
  }

  render() {
    return (
      <Inp
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={::this.handleBlur}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit}
        link={c => (this.refTodo = c)}
      />
    );
  }
}
