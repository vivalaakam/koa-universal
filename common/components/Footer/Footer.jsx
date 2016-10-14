import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filter';
import style from './Footer.scss';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

export default class Footer extends Component {

  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  };

  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.todoCount}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;
    const className = classnames(style.link, { [style.selected]: filter === selectedFilter });
    return (
      <button className={className} style={{ cursor: 'pointer' }} onClick={() => onShow(filter)}>
        {title}
      </button>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }

    return null;
  }

  renderItems() {
    return [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter => (
      <li key={filter} className={style.filter}>
        {this.renderFilterLink(filter)}
      </li>
    ));
  }

  render() {
    return (
      <footer className={style.Footer}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {this.renderItems()}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
