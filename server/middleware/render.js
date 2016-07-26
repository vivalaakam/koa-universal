import React from "react"
import {Router, match} from "react-router"
import {renderToString} from "react-dom/server"
import createHistory from 'history/lib/createMemoryHistory'
import {storeFactory} from '../../common/store'
import routes from "../../common/routes"
import layout from "../layout"
import {Provider}   from 'react-redux'

export default async function reactRender(ctx, next) {

    const store = await storeFactory({})
    const history = createHistory(ctx.req.url)

    const data = await route(history, store, routes)

    ctx.status = 200
    ctx.body = layout(data)

}


function route(history, store, routes) {
    return new Promise((resolve, reject) => {

        match({history, routes},
            (error, redirectLocation, renderProps) => {

                if (error) {
                    console.error(error)
                    return reject(error)
                }

                const store_state = store.getState()

                const content = renderToString(
                    <Provider store={store}>
                        <Router {...renderProps} history={history}/>
                    </Provider>
                );

                resolve({content, store_state})
            })

    })
}