import {configureStore, combineReducers} from '@reduxjs/toolkit';
//import {createStore, combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { gadgetsReducer } from './gadgetsReducer';

const reducer = combineReducers({
    
    auth: authReducer,
    gadgets: gadgetsReducer
})

//create a store 
export const store = configureStore({
    reducer: reducer,
    devTools: true
});

//export const store = createStore(reducer,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;