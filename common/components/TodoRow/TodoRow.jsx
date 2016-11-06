import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from '../TodoTextInput/TodoTextInput';
import Checkbox from '../UI/Checkbox/Checkbox';
import style from './TodoRow.scss';

export { style };

export default class TodoRow extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
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
    this.props.updateTodo({ ...todo, text });
    this.setState({ editing: false });
  }

  showModal() {
    this.props.showModal({
      type: 'CONFIRM_REMOVE',
      resolveAction: this.props.deleteTodo,
      props: {
        target: this.props.todo,
        title: `Remove "${this.props.todo.text}"?`
      }
    });
  }

  renderElement() {
    const { todo } = this.props;
    if (this.state.editing) {
      return (
        <TodoTextInput text={todo.text} editing={this.state.editing} onSave={::this.handleSave} />
      );
    }
    return todo.text;
  }

  render() {
    const { todo, toggleTodo } = this.props;

    const className = classnames(
      style.TodoRow
      , {
        [style.completed]: todo.completed,
        [style.editing]: this.state.editing
      });

    return (
      <div className={className}>
        <div className={style.toggleCell}>
          <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo)} name="toggle" />
        </div>
        <div className={style.mainCell} onDoubleClick={::this.handleDoubleClick}>
          {this.renderElement()}
        </div>
        <div className={style.destroyCell}>
          <button
            className={style.destroy}
            onClick={::this.showModal}
          />
        </div>
      </div>
    );
  }
}
