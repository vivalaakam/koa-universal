import * as types from '../constants/todos'
import Todos from '../api/todos';

const todos = new Todos();

function addTodoDispatch(todo) {
    return {
        type: types.ADD_TODO,
        todo
    }
}

function updateTodoDispatch(todo) {
    return {
        type: types.UPDATE_TODO,
        todo
    }
}

function deleteTodoDispatch(id) {
    return {
        type: types.DELETE_TODO,
        id
    }
}

export function addTodo(text = '', completed = false) {
    return dispatch => {
        return todos.create({text, completed})
            .then((todo) => {
                dispatch(addTodoDispatch(todo));
            })
    }
}

export function updateTodo({id, text = '', completed = false}) {
    return dispatch => {
        return todos.update(id, {text, completed})
            .then(todo => {
                dispatch(updateTodoDispatch(todo));
            })
    }
}

export function deleteTodo(id) {
    return dispatch => {
        return todos.remove(id)
            .then(() => {
                dispatch(deleteTodoDispatch(id));
            })
    }
}

export function editTodo(todo) {
    return updateTodo(todo);
}

export function completeTodo({id, text , completed}) {
    return updateTodo({id, text, completed: !completed});
}

export function completeAll() {
    return {type: types.COMPLETE_ALL}
}

export function clearCompleted() {
    return {type: types.CLEAR_COMPLETED}
}