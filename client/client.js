import css from "../common/style/index.less"
import React from "react"
import ReactDOM from "react-dom"
import {Router, match} from "react-router"
import createBrowserHistory from "history/lib/createBrowserHistory"
import {renderToString} from "react-dom/server"
import {storeFactory} from "../common/store"
import routes from "../common/routes/index.jsx"
import {Provider} from 'react-redux'


!(async function () {
    const store = await storeFactory({initialState: window.STORE_STATE});
    const history = createBrowserHistory();

    const mountNode = document.getElementById("app");

    match({history, routes}, (error, redirectLocation, renderProps) => {
        ReactDOM.render(
            <Provider store={store}>
                <Router {...renderProps} />
            </Provider>, mountNode);
    });


    window.app = {}

})();

