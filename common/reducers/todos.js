import {ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/todos';

const $$initialState = [];

export default function todos($$state = $$initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                action.todo,
                ...$$state
            ];

        case DELETE_TODO:
            return $$state.filter(todo =>
                todo.id !== action.id
            );

        case UPDATE_TODO:
            return $$state.map(todo => todo.id === action.todo.id ? Object.assign({}, todo, action.todo) : todo);

        case COMPLETE_ALL:
            const areAllMarked = $$state.every(todo => todo.completed);
            return $$state.map(todo => Object.assign({}, todo, {
                completed: !areAllMarked
            }));

        case CLEAR_COMPLETED:
            return $$state.filter(todo => todo.completed === false);

        default:
            return $$state
    }
}