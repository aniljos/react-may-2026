import axios from "axios";
import { store } from "../store/store"; 

export const Axios = axios.create({
    baseURL: "http://localhost:9000",
    timeout: 100000,
    
})

Axios.interceptors.request.use((config) => {

    console.log("in the request interceptor");

    const requestUrl = config.url;
    const loginUrl = "http://localhost:9000/login";
    if(requestUrl !== loginUrl){
        const auth = store.getState().auth;
        config.headers.Authorization  = `Bearer ${auth.accessToken}`;
    }
    return config

}, error => Promise.reject(error))