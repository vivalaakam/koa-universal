import css from "../common/style/index.less"
import React from "react"
import ReactDOM from "react-dom"
import {Router, browserHistory} from "react-router"
import {storeFactory} from "../common/store"
import routes from "../common/routes/index.jsx"
import {Provider} from 'react-redux'
import { routerReducer, syncHistoryWithStore, push } from 'react-router-redux';

!(async function () {
    const mountNode = document.getElementById("app");
    const store = await storeFactory({initialState: window.__INITIAL_STATE__}, {routing: routerReducer});
    const history = syncHistoryWithStore(browserHistory, store);
    history.listen(location => console.log(location.pathname));

    const app = (
        <Provider store={store}>
            <Router history={history} children={routes({store, first: { time: true }})}/>
        </Provider>
    );

    ReactDOM.render(app, mountNode);
})();

