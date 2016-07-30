import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {

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
        }
    }

    handleDoubleClick() {
        this.setState({editing: true})
    }

    handleSave(todo, text) {
        if (text.length === 0) {
            this.props.deleteTodo(todo.id);
        } else {
            this.props.editTodo({...todo, text});
        }
        this.setState({editing: false});
    }

    render() {
        const { todo, completeTodo, deleteTodo } = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo, text)}/>
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={todo.completed}
                           onChange={() => completeTodo(todo)}/>
                    <label onDoubleClick={this.handleDoubleClick.bind(this)}>
                        {todo.text}
                    </label>
                    <button className="destroy"
                            onClick={() => deleteTodo(todo.id)}/>
                </div>
            )
        }

        return (
            <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
                {element}
            </li>
        )
    }
}

export default TodoItem