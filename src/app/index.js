import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux" //provides store for react

import App from "./containers/App" //default export
import store from "./store"

render(
    <Provider store={store}>
        <App />
    </Provider>,  //connect store to react
    window.document.getElementById('app'));
