import React, { PropTypes } from 'react';
import style from './Inp.scss';

export default function Inp({ onChange, value, placeholder = '', link }) {
  return (
    <input className={style.Inp} onChange={onChange} value={value} placeholder={placeholder} ref={c => (link(c))} />
  );
}

Inp.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  link: PropTypes.func
};
