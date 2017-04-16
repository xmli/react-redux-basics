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

export default mathReducer;