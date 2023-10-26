import React, { useState   , useContext} from "react";

import classes from "./LoginPage.module.css";
import AuthContext from '../store/auth-context'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const [haveAccount, sethaveAccount] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()
  const switchAuthModeHandler = () => {
    sethaveAccount((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let url;
    if (haveAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0";
    }

    try {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: userName,

          password: userPass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log(resp);
      setIsLoading(false);
      if (resp.ok) {
        const data = await resp.json();
        authCtx.login(data.idToken, userName)
        console.log(data);
       navigate('/home')
      } else {
        let errorMessage = "Authentication failed";
        const data = await resp.json();
        console.log(data);
        errorMessage = data.error.message;
        throw new Error(errorMessage);
      }
    } catch (error) {
      window.alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.formInside}>
        <h2>Please {haveAccount ? "Login" : "Sign Up"} Here</h2>
        <div className={classes.enterVal}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={classes.enterVal}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />
        </div>
        {/* <button type='submit'>Submit</button> */}

        {!isLoading && (
          <button type="submit">
            {haveAccount ? "Login" : "Create Account with this data"}
          </button>
        )}

        {!isLoading && (
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {haveAccount
              ? " OR / Create a New Account"
              : "OR / Login with your account "}
          </button>
        )}
        {isLoading && (
          <p>
            <b>Sending Requests...</b>
          </p>
        )}
        {authCtx.isLoggedIn && <button onClick={() => {}}>Logout</button>}
      </div>
    </form>
  );
};

export default LoginPage;
