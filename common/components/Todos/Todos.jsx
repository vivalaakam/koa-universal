import React, { PropTypes } from 'react';
import Header from '../Header/Header';
import MainSection from '../MainSection/MainSection';
import style from './Todos.scss';

export default function Todos({ actions, todos }) {
  return (
    <div className={style.Todos}>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>
  );
}

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired
};
