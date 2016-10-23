import React, { PropTypes } from 'react';
import style from './App.scss';

export default function App({ children }) {
  return (
    <div className={style.App}>{children}</div>
  );
}

App.propTypes = {
  children: PropTypes.element
};
