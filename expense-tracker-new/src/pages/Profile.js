import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../Store/authReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const fetchUserData = () => {
    if (!token) {
      return;
    }

    const lookupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50`;
    const data = {
      idToken: token,
    };

    fetch(lookupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((responseData) => {
        const user = responseData.users[0];
        setFullName(user.displayName || "");
        setPhotoUrl(user.photoUrl || "");
      })
      .catch((error) => {
        console.log("Error fetching user data", error);
      });
  };

  const handleUpdate = () => {
    const updateUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0" ;      

    const data = {
      idToken: token,
      displayName: fullName,
      photoUrl: photoUrl,
      returnSecureToken: true,
    };

    fetch(updateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user details");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("User details updated successfully", responseData);
      })
      .catch((error) => {
        console.log("Error updating user details", error);
      });
    fetchUserData();
  };

  return (
    <div className="main-profile-page">
      <div className="login-page-container">
        <div className="left-para">
          <h5 className="bold-text">Winners never quit, Quitters never win.</h5>
        </div>
        <div className="right-div">
          <p className="profile-para bold-text">
            Your Profile is 64% completed. A complete Profile has higher chances
            of landing a job.
            <p className="para">Complete Now</p>
          </p>
        </div>
      </div>

      <div className="left-sidebar">
        <div className="profile-circle">
          <img src={photoUrl} alt="Profile" className="user-image" />
          <p className="welcome-text bold-text">Welcome back {fullName}</p>
        </div>
      </div>

      <div className="profile-container">
        <Form>
          <div className="contact-details bold-text">
            <p>Contact Details</p>
            <Button variant="primary justify-content-end">Cancel</Button>
          </div>
          <div className="form-fields">
            <div className="form-group bold-text">
              <label htmlFor="fullName">Full Name:</label>
              <Form.Control
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group bold-text">
              <label htmlFor="photoUrl">Profile Photo URL:</label>
              <Form.Control
                type="text"
                id="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="update-button">
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
