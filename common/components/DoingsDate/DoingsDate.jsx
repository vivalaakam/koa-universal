import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import style from './DoingsDate.scss';
import DoingRow from '../DoingRow/DoingRow';
import { Sticky } from '../UI';

export default class DoingsDate extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    rows: PropTypes.array,
    showModal: PropTypes.func.isRequired,
    deleteDoing: PropTypes.func.isRequired
  };

  renderRows() {
    const { rows, showModal, deleteDoing } = this.props;
    return rows.map(row => (
      <DoingRow {...{ row, showModal, deleteDoing }} key={row.id} />
    ));
  }

  render() {
    const { date } = this.props;
    return (
      <div className={style.DoingsDate}>
        <Sticky className={style.header}>
          <h3 className={style.date}>{moment.unix(date).format('dddd, DD MMMM YYYY')}</h3>
        </Sticky>
        <div className={style.table}>
          {this.renderRows()}
        </div>
      </div>
    );
  }
}
