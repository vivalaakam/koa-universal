import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { toArray, groupBy, sortBy } from '../../helpers/ramda';
import DoingsDate from '../DoingsDate/DoingsDate';
import DoingCreate from '../DoingCreate/DoingCreate';
import style from './Doings.scss';

export default class Doings extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  prepareData() {
    const { list } = this.props;
    const data = groupBy(list, row => moment(row.created_at).startOf('day').unix());
    return sortBy(toArray(data, 'date', 'rows'), 'date', true);
  }

  renderDates() {
    const list = this.prepareData();
    const { showModal, deleteDoing } = this.props.actions;
    return list.map(row => (
      <DoingsDate date={row.date} key={row.date} rows={row.rows} {...{ showModal, deleteDoing }} />
    ));
  }

  render() {
    return (
      <div className={style.Doings}>
        <DoingCreate createDoing={this.props.actions.createDoing} />
        {this.renderDates()}
      </div>
    );
  }
}
