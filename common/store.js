import {createStore, applyMiddleware, compose} from 'redux'
import promiseMiddleware from 'redux-promise'
import reducer from './reducers'


export async function storeFactory({initialState}) {
    const middleware = applyMiddleware(promiseMiddleware)
    const enhancer = compose(middleware, devTools())
    const store = createStore(reducer, initialState, enhancer)
    return store
}


function devTools() {
    return typeof window !== 'undefined' && window.devToolsExtension ?
        window.devToolsExtension() :
        f => f
}