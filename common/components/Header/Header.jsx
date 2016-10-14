import React, { PropTypes, Component } from 'react';
import TodoTextInput from '../TodoTextInput/TodoTextInput';
import style from './Header.scss';

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className={style.Header}>
        <TodoTextInput newTodo onSave={::this.handleSave} placeholder="What needs to be done?" />
      </header>
    );
  }
}
