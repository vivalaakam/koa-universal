import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './Btn.scss';

export default function Btn({
  children, className, onClick, name,
  active = false, inverted = false, disabled = false, scheme = 'default'
}) {
  const cName = classnames(style.Btn, style[`${scheme}Scheme`], className, {
    [style.active]: active,
    [style.inverted]: inverted
  });
  return (
    <button className={cName} {...{ name, disabled, onClick }}>{children}</button>
  );
}

Btn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  scheme: PropTypes.string
};
