import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE } from '../../reducers/filter';
import style from './Footer.scss';

const FILTER_TITLES = {
  [FILTER_ALL]: 'All',
  [FILTER_ACTIVE]: 'Active',
  [FILTER_COMPLETED]: 'Completed'
};

export default class Footer extends Component {

  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.symbol.isRequired,
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
    return [FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED].map((filter, i) => (
      <li key={i} className={style.filter}>
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
