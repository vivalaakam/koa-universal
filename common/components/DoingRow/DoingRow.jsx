import React, { Component, PropTypes } from 'react';
import style from './DoingRow.scss';

export default class DoingRow extends Component {
  static propTypes = {
    row: PropTypes.object,
    deleteDoing: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
  };

  getTags() {
    const { tags = [] } = this.props.row;
    return tags.map(tag => (
      <a className={style.hashtag} key={tag.text} href={`#${tag.text}`}>{`#${tag.text}`}</a>
    ));
  }

  showModal() {
    this.props.showModal({
      type: 'CONFIRM_REMOVE',
      resolveAction: this.props.deleteDoing,
      props: {
        target: this.props.row,
        title: `Remove "${this.props.row.text}"?`
      }
    });
  }

  render() {
    const { row } = this.props;
    return (
      <div className={style.DoingRow}>
        <div className={style.description}>
          {row.text}{this.getTags()}
        </div>
        <div className={style.timing}>
          {row.timing}
        </div>
        <div className={style.navigation}>
          <button
            className={style.destroy}
            onClick={::this.showModal}
          />
        </div>
      </div>
    );
  }
}
