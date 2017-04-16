import React from "react";
import {render} from "react-dom";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import {Provider} from "react-redux" //provides store for react

import App from "./containers/App" //default export

//reducers should always work with the payloads
const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => { //default case when no state is sent
    switch (action.type) {
        case "ADD": 
            state = {
                ...state, //spread: add all properties and initalize
                result: state.result + action.payload, //overwrite
                lastValues: [...state.lastValues, action.payload]
            }
                /* state.lastValues.push(action.payload);
                state.result += action.payload; */          //bad bec ause we don't have immutable approach
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            }
            break;
    }
    return state; //have to return a state
};

const userReducer = (state = {
    name: "Max",
    age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME": 
            state = {
                ...state,
                name: action.payload
            }
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            }
            break;
    }
    return state;
};

const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action: ", action);
    next(action); //must call next to continue the flow to reducers
};

const store = createStore(
    combineReducers({
        math: mathReducer,//mathReducer, //mathReducer: mathReducer()
        user: userReducer//userReducer
    }),
    {},
    applyMiddleware(
        createLogger()
    )
);

store.subscribe(() => {
    // console.log("Store udpated!", store.getState())
});

render(
    <Provider store={store}>
        <App />
    </Provider>,  //connect store to react
    window.document.getElementById('app'));
