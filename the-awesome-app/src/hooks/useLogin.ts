import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTitle } from "../hooks/useTitle";
import { Axios } from "../axios/Axios";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useTitle("Login");

  useEffect(() => {
    console.log("loginPage mounted...");
    usernameRef.current?.focus();

    // onUnmount
    return () => {
      console.log("loginPage unmounted...");
    };
  }, []);

  async function handleLogin() {
    //validation
    if (username && password) {
      setErrorMessage("");
      //validate the credentials in the backend
      //const url = "http://localhost:9000/login";
      // axios
      //     .post(url, {name: username, password})
      //     .then((resp) => { console.log("fullfilled", resp)}) //success
      //     .catch((errorResp) => { console.log("rejected", errorResp)}) //fails

      try {
        // const response = await axios.post<{
        //   accessToken: string;
        //   refreshToken: string;
        // }>(url, { name: username, password });

        const response = await Axios.post<{accessToken:string, refreshToken: string}>("/login", {name: username, password})


        console.log("fullfilled", response);
        const { accessToken, refreshToken } = response.data;
        dispatch({
          type: "login",
          payload: {
            isAuthenticated: true,
            username,
            accessToken,
            refreshToken,
          },
        });
        navigate("/products", { replace: true });
      } catch (errorResp) {
        console.log("rejected", errorResp);
        setErrorMessage("Invalid credentials");
        dispatch({ type: "logout" });
      }
    } else {
      setErrorMessage("Enter the credentials");
    }
  }

  return {username, setUsername, password, setPassword, 
                        usernameRef, errorMessage, handleLogin};

}
