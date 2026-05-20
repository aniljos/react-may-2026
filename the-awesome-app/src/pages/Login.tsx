import { useState } from "react";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleLogin(){

        //validation
        if(username && password){
            setErrorMessage("");
            //validate the credentials in the backend
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
                <input className="form-control" id="username" 
                    type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)}  />
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