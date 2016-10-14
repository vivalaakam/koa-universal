import React, { Component, PropTypes } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import Footer from '../Footer/Footer';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE } from '../../reducers/filter';
import style from './MainSection.scss';

const TODO_FILTERS = {
  [FILTER_ALL]: () => true,
  [FILTER_ACTIVE]: todo => !todo.completed,
  [FILTER_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    filter: PropTypes.symbol.isRequired,
    actions: PropTypes.object.isRequired
  };

  handleClearCompleted() {
    this.props.actions.clearCompleted();
  }

  handleShow(filter) {
    this.props.actions.setFilter(filter);
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }

    return null;
  }

  renderFooter(completedCount) {
    const { todos, filter } = this.props;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={::this.handleClearCompleted}
          onShow={::this.handleShow}
        />
      );
    }
    return null;
  }

  render() {
    const { todos, actions, filter } = this.props;
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <section className={style.MainSection}>
        {this.renderToggleAll(completedCount)}
        <ul className={style.todoList}>
          {filteredTodos.map(todo => (<TodoItem key={todo.id} todo={todo} {...actions} />))}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
