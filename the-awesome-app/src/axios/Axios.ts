import axios, { AxiosError } from "axios";
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

Axios.interceptors.response.use(response => {

    //console.log("in the response interceptor");
    return response;

}, async (error: AxiosError) => {

    const statusCode = error.response?.status;
    const requestUrl = error.config?.url;
     const originalRequest = error.config;//as RetryableRequestConfig | undefined;

    console.log("response interceptor: error", {
        statusCode,
        requestUrl,
        error
    });

    if(statusCode === 403 && requestUrl?.includes("secure") && originalRequest){
        
        console.log("response interceptor: fetching new accessCode...");
        try {
           const auth = store.getState().auth;
           const response = await Axios.post("/refreshToken", {token: auth.refreshToken});
           const accessToken = response.data.accessToken;
           store.dispatch({
            type: "login",
            payload: {
              ...auth,
              accessToken,
            },
          });
          console.log("response interceptor: retrying request...");
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return Axios(originalRequest);
        } catch(refreshError) {
            store.dispatch({ type: "logout" });
            return Promise.reject(refreshError);
        }
        

    }
    return Promise.reject(error);
})
