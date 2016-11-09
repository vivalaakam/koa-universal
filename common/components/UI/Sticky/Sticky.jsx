import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './Sticky.scss';

const sticky = (() => {
  if (process.env.HOST === 'client') {
    const stickyfill = require('stickyfill');
    return stickyfill();
  }
  return {
    add() {
    },
    rebuild() {
    },
    remove() {
    }
  };
})();

export default class Sticky extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string
  };

  componentDidMount() {
    sticky.add(this.refSticky);
  }

  componentDidUpdate() {
    sticky.rebuild();
  }

  componentWillUnmount() {
    sticky.remove(this.refSticky);
  }

  render() {
    const { children, className = '' } = this.props;
    const currentClassName = classnames(style.Sticky, className);
    return (
      <div className={currentClassName} ref={c => (this.refSticky = c)}>
        {children}
      </div>
    );
  }
}
