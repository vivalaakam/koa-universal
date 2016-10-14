import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from '../TodoTextInput/TodoTextInput';
import style from './TodoItem.scss';

export default class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(text) {
    const { todo } = this.props;
    if (text.length === 0) {
      this.props.deleteTodo(todo.id);
    } else {
      this.props.updateTodo({ ...todo, text });
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={::this.handleSave}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo)}
          />
          <span className={style.label} onDoubleClick={::this.handleDoubleClick}>
            {todo.text}
          </span>
          <button
            className={style.destroy}
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      );
    }

    const className = classnames(
      style.TodoItem
      , {
        [style.completed]: todo.completed,
        [style.editing]: this.state.editing
      });

    return (
      <li className={className}>
        {element}
      </li>
    );
  }
}
