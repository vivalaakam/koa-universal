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

function listTodoDispatch(todos) {
    return {
        type: types.LIST_TODO,
        todos
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
    return dispatch => {
        return todos.completeAll()
            .then((todos) => {
                dispatch(listTodoDispatch(todos));
            })
    };
}

export function clearCompleted() {
    return dispatch => {
        return todos.clearCompleted()
            .then((todos) => {
                dispatch(listTodoDispatch(todos));
            })
    };
}