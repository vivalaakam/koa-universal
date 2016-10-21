import React, { PropTypes } from 'react';
import style from './Inp.scss';

export default function Inp({ onChange, onBlur, onKeyDown, value, link, placeholder = '', type = 'text' }) {
  return (
    <input
      className={style.Inp}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      value={value}
      placeholder={placeholder}
      ref={c => (link(c))}
      type={type}
    />
  );
}

Inp.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  link: PropTypes.func,
  type: PropTypes.string
};
