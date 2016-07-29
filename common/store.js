import {createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers'


export async function storeFactory({initialState}, ext = {}) {
    const middleware = applyMiddleware(thunkMiddleware);
    const enhancer = compose(middleware);
    const store = createStore(reducer(ext), initialState, enhancer);
    return store
}