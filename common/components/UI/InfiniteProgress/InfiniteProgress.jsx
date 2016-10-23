import React from 'react';
import style from './InfiniteProgress.scss';

export default function InfiniteProgress() {
  return (
    <div className={style.InfiniteProgress}>
      <i className={style.dot}>&nbsp;</i>
    </div>
  );
}
