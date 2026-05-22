import { count } from 'console';
import {createStore} from 'redux';

//initial State
const initialState = {
    count: 10,
    message: "hello redux"
}

//reducer is a function
const reducer = (state=initialState, action) => {

    if(action.type === "increment_counter"){
        return {
            ...state,
            count: state.count + 1
        }
    }
    if(action.type === "decrement_counter"){
        return {
            ...state,
            count: state.count - 1
        }
    }
    if(action.type === "update_counter"){
        return {
            ...state,
            count: action.value
        }
    }

    // return the updated state
    return state;
}

//create a store
const store = createStore(reducer);
console.log("state", store.getState());

//subscribe
store.subscribe(() => {
    console.log("subscriber: updated state", store.getState());
})

//dispatch action
store.dispatch({type: "increment_counter"});
//console.log("state", store.getState());
store.dispatch({type: "update_counter", value: 100});
//console.log("state", store.getState());
store.dispatch({type: "decrement_counter"});
//console.log("state", store.getState());
