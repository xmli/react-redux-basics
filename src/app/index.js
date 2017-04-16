/*import React from "react";
import {render} from "react-dom";

import { User } from './components/User';
import { Main } from './components/Main';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "Max"
        };
    }

    changeUsername(newName) {
        this.setState({
            username: newName
        });
    }

    render() {
        return (
            <div className="container">
                <Main changeUsername={this.changeUsername.bind(this)}/>
                <User username={this.state.username}/>
            </div>
        );
    }
}

render(<App />, window.document.getElementById('app'));*/

import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";

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
        mathReducer, //mathReducer: mathReducer()
        userReducer
    }),
    {},
    applyMiddleware(
        // myLogger, 
        createLogger()
    )
);

store.subscribe(() => {
    // console.log("Store udpated!", store.getState())
});

store.dispatch({
    type: "ADD",
    payload: 100 //payload is the value you want to change
});

store.dispatch({
    type: "ADD",
    payload: 22
});

store.dispatch({
    type: "SUBTRACT",
    payload: 80
});

store.dispatch({
    type: "SET_AGE",
    payload: 30
});