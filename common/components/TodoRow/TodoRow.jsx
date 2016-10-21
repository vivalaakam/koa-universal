import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from '../TodoTextInput/TodoTextInput';
import Checkbox from '../UI/Checkbox/Checkbox';
import style from './TodoRow.scss';

export default class TodoRow extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
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
      this.props.deleteTodo(todo);
    } else {
      this.props.updateTodo({ ...todo, text });
    }
    this.setState({ editing: false });
  }

  renderElement() {
    const { todo } = this.props;
    if (this.state.editing) {
      return (
        <TodoTextInput text={todo.text} editing={this.state.editing} onSave={::this.handleSave} />
      );
    }
    return (
      <span className={style.label}> {todo.text} </span>
    );
  }

  render() {
    const { todo, toggleTodo, deleteTodo } = this.props;

    const className = classnames(
      style.TodoRow
      , {
        [style.completed]: todo.completed,
        [style.editing]: this.state.editing
      });

    return (
      <div className={className}>
        <div className={style.toggleCell}>
          <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo)} />
        </div>
        <div className={style.mainCell} onDoubleClick={::this.handleDoubleClick}>
          {this.renderElement()}
        </div>
        <div className={style.destroyCell}>
          <button
            className={style.destroy}
            onClick={() => deleteTodo(todo)}
          />
        </div>
      </div>
    );
  }
}
