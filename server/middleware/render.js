import React from "react"
import { match, RouterContext } from 'react-router';
import {renderToString} from "react-dom/server"
import createHistory from 'history/lib/createMemoryHistory'
import {storeFactory} from '../../common/store'
import routes from "../../common/routes"
import layout from "../layout"
import {Provider}   from 'react-redux'
import {ReduxRouter} from 'redux-router'


import Todo from '../models/todo';
const todoModel = new Todo();

export default async function reactRender(ctx) {
    let todos = await todoModel.list();
    todos = Object.keys(todos).map((id) => ({
        id,
        ...todos[id]
    }));


    const store = await storeFactory({initialState: {todos}});
    const history = createHistory(ctx.req.url);

    const data = await route(history, store, routes({store, first: {time: true}}));

    ctx.status = 200;
    ctx.body = layout(data)

}


function route(history, store, routes) {
    return new Promise((resolve, reject) => {

        match({history, routes}, (error, redirectLocation, renderProps) => {

            if (error) {
                console.error(error);
                return reject(error);
            }

            const store_state = store.getState()

            const content = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            resolve({content, store_state})
        })

    })
}