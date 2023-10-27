import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./ForgotPassword.css"

const ForgetPassWord = () => {
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  

  const sendPasswordResetLink = () => {

    setLoading(true);
    
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0`;
    const data = {
      requestType: 'PASSWORD_RESET',
      email: email,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
          setMessage("Password reset link sent successfully!");
          console.log("link has been sent to email id ", email);
        } else {
          setMessage(`Error: ${response.statusText}`);
        }
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="main-forgetPW-page">
    <div className="forget-password-container">
      <div className="forget-password-form">
        <p>Enter the email with which you have registered</p>
        <div className="form-container">
  <form>
    <label className="form-label">Enter Email:</label>
    <input
      className="form-input"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </form>
  <button className="primary-button" onClick={sendPasswordResetLink}>
    Send Link
  </button>
  {loading && <div className="info-message">Sending Verification mail...</div>}
  <div className="info-message mt-2">{message}</div>
  <Link to="/" className="complete-button">
    Already a user? Login.
  </Link>
</div>

      </div>
    </div>
    </div>
  );
};

export default ForgetPassWord;