import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { authReducer } from './authReducer';

const reducer = combineReducers({
    
    auth: authReducer,


})

//create a store 
export const store = configureStore({
    reducer: reducer
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;