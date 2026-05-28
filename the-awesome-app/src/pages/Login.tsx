import Input from "../components/Input";
import { useLogin } from "../hooks/useLogin";


function Login(){

    
    const {username, setUsername, password, setPassword, usernameRef, errorMessage, handleLogin} = useLogin();

    return (
        <div>
            <h3>Login</h3>

             {/* {errorMessage &&  <div className="alert alert-warning">{errorMessage}</div>  } */}
             {errorMessage ?  <div className="alert alert-warning">{errorMessage} </div>  : null }

            {/* <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input ref={usernameRef} className="form-control" id="username" 
                    type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} />
            </div> */}
            <Input ref={usernameRef} label="User Name" id="username" placeholder="Name" type="text" value={username} 
                                                                onChange={e => setUsername(e.target.value)} />

            {/* <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" id="password" 
                    type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div> */}
            <Input label="Password" id="pwd" type="password" placeholder="*****" value={password} onChange={e => setPassword(e.target.value)}/>
            <br />
            <button className="btn btn-success" onClick={handleLogin}>Login</button>

        </div>
    )

}

export default Login;
