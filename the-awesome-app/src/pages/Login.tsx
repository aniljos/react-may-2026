import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useTitle } from "../hooks/useTitle";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useTitle("Login");

   

    //onMount
    useEffect(() => {
        console.log("loginPage mounted...");
        usernameRef.current?.focus();

        // onUnmount
        return () => {
            console.log("loginPage unmounted...");
        }

    }, [])

   

    async function handleLogin(){
        //validation
        if(username && password){
            setErrorMessage("");
            //validate the credentials in the backend
            const url = "http://localhost:9000/login";
            // axios
            //     .post(url, {name: username, password})
            //     .then((resp) => { console.log("fullfilled", resp)}) //success
            //     .catch((errorResp) => { console.log("rejected", errorResp)}) //fails

            try {
                const response = await axios.post<{accessToken: string, refreshToken: string}>(url, {name: username, password});
                console.log("fullfilled", response);
                const {accessToken, refreshToken }= response.data;
                dispatch({type: "login", payload: {isAuthenticated: true, username, accessToken, refreshToken}});
                navigate("/products", {replace: true});

            } catch (errorResp) {

                console.log("rejected", errorResp);
                setErrorMessage("Invalid credentials");
                dispatch({type: "logout"});
            }
            
        }
        else{
            setErrorMessage("Enter the credentials");
        }
    }

    return (
        <div>
            <h3>Login</h3>

             {/* {errorMessage &&  <div className="alert alert-warning">{errorMessage}</div>  } */}
             {errorMessage ?  <div className="alert alert-warning">{errorMessage} </div>  : null }

            <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input ref={usernameRef} className="form-control" id="username" 
                    type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" id="password" 
                    type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}  />
            </div>
            <br />
            <button className="btn btn-success" onClick={handleLogin}>Login</button>

        </div>
    )

}

export default Login;