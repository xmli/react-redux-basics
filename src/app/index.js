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

import {createStore} from "redux";

const initialState = {
    result: 1,
    lastValues: []
}

//reducers always work with the payloads
const reducer = (state = initialState, action) => { //default case when no state is sent
    switch (action.type) {
        case "ADD": 
            state = {
                ...state, //spread: add all properties and initalize
                result: state.result + action.payload, //overwrite
                lastValues: [...state.lastValues, action.payload]
            }
                // state.lastValues.push(action.payload);
                // state.result += action.payload; //bad because we don't have immutable approach
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
const store = createStore(reducer);

store.subscribe(() => {
    console.log("Store udpated!", store.getState())
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