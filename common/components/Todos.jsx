import React, { PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

export default function Todos({ actions, todos }) {
  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>
  );
}

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired
};
