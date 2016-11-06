import React, { Component, PropTypes } from 'react';
import Btn from '../UI/Btn/Btn';
import TodoRow from '../TodoRow/TodoRow';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE } from '../../reducers/todos/filter';
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
    list: PropTypes.array.isRequired,
    filter: PropTypes.symbol.isRequired
  };

  handleShow(filter) {
    this.props.actions.setFilter(filter);
  }

  handleClearCompleted() {
    this.props.actions.clearCompletedTodos();
  }

  showModal() {
    this.props.actions.showModal({
      type: 'CREATE_TODO',
      resolveAction: this.props.actions.createTodo
    });
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
    const { list } = this.props;
    const activeCount = list.length - completed;
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
    const { list, filter } = this.props;
    const filteredTodos = list.filter(TODO_FILTERS[filter]);
    const completed = list.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
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
