import React, { Component, PropTypes } from 'react';
import deferred from 'deferred';
import Btn from '../UI/Btn/Btn';
import TodoRow from '../TodoRow/TodoRow';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE } from '../../reducers/filter';
import style from './Todos.scss';

const FILTER_TITLES = {
  [FILTER_ALL]: 'All',
  [FILTER_ACTIVE]: 'Active',
  [FILTER_COMPLETED]: 'Completed'
};

const TODO_FILTERS = {
  [FILTER_ALL]: () => true,
  [FILTER_ACTIVE]: todo => !todo.completed,
  [FILTER_COMPLETED]: todo => todo.completed
};

export default class Todos extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired,
    filter: PropTypes.symbol.isRequired
  };

  handleShow(filter) {
    this.props.actions.setFilter(filter);
  }

  handleClearCompleted() {
    this.props.actions.clearCompletedTodos();
  }

  showModal() {
    const promise = deferred();
    this.props.actions.showModal({ type: 'CREATE_TODO', promise: promise.promise() });
  }

  renderFilter() {
    const { filter: selectedFilter } = this.props;

    return [FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED].map((filter, i) => {
      const title = FILTER_TITLES[filter];
      return (
        <li key={i} className={style.filterItem}>
          <Btn onClick={() => this.handleShow(filter)} inverted active={selectedFilter === filter}>
            {title}
          </Btn>
        </li>
      );
    });
  }

  renderTodoItem(todo) {
    const { actions } = this.props;
    return <TodoRow key={todo.id} todo={todo} {...actions} />;
  }

  renderTodoCount(completed) {
    const { todos } = this.props;
    const activeCount = todos.length - completed;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.todoCount}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderClearButton(completedCount) {
    if (completedCount > 0) {
      return (
        <Btn onClick={::this.handleClearCompleted}>
          Clear completed
        </Btn>
      );
    }

    return null;
  }

  render() {
    const { todos, filter } = this.props;
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completed = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
    return (
      <div className={style.Todos}>
        <div className={style.navigation}>
          <div className={style.filter}>
            <ul className={style.filters}>
              {this.renderFilter()}
            </ul>
          </div>
          <div className={style.add}>
            <Btn onClick={::this.showModal}>Add todo</Btn>
          </div>
        </div>
        <div className={style.table}>
          {filteredTodos.map(::this.renderTodoItem)}
        </div>
        <div className={style.navigation}>
          <div className={style.counter}>
            {this.renderTodoCount(completed)}
          </div>
          <div className={style.clearCompleted}>
            {this.renderClearButton(completed)}
          </div>
        </div>
      </div>
    );
  }
}
