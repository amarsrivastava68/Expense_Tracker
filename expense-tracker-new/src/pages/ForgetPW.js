import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ForgetPw.css"

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
        <Form.Group className="mb-3">
          <Form.Label>Enter Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={sendPasswordResetLink}>
          Send Link
        </Button>
        {loading && <div>Sending Verification mail...</div>}
        <div className="mt-2">{message}</div>
        <Link to="/login" className="complete-button">
              Already a user? Login.
            </Link>
      </div>
    </div>
    </div>
  );
};

export default ForgetPassWord;