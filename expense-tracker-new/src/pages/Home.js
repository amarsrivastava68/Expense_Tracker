import React, { useContext, useEffect, useState } from "react";
import "./Home.css"; // Import your CSS file
import ProfileModal from "../components/ProfileModal";
import AuthContext from "../store/auth-context";
import Expenseform from "../Expenses/ExpenseForm";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfileURL, setUserProfileURL] = useState("");
  const [email , setemail] = useState("")


  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, [authCtx.token , showModal]);

  const fetchUserData = () => {
    if (!authCtx.token) {
      return;
    }

    const lookupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0";
    const data = {
      idToken: authCtx.token,
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
        setUserName(user.displayName || "");
        setUserProfileURL(user.photoUrl || "");
        setemail(user.providerUserInfo[0].email)
      })
      .catch((error) => {
        console.log("Error fetching user data", error);
      });
  };

  const sendVerificationEmail = () => {
  
    

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: authCtx.token,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          alert("Verification email sent successfully.");
        } else {
          alert("Error sending verification email.");
        }
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };
  const handleCompleteProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="left">Welcome to the Expense Tracker</div>
        <div className="right">
          <button className="complete-profile" onClick={handleCompleteProfile}>
            Update your profile 
          </button>
          
          <button className="Logout" onClick={authCtx.logout}>
            Logout
          </button>
        </div>
      </div>

      <ProfileModal showModal={showModal} onClose={handleCloseModal} />

      <br />
      <div className="profile-form">
  <h2>User Profile </h2>
  <h3>Click on the Update profile button to update your profile </h3>
  <div className="profile-input">
    <label htmlFor="userName">Name</label>
    <input type="text" id="userName" value={userName} disabled = "disabled" />
  </div>
  <div className="profile-input">
    <label htmlFor="userProfileURL">Profile Picture URL</label>
    <input type="text" id="userProfileURL" value={userProfileURL}  disabled = "disabled"/>
  </div>
  <div className="profile-input">
  <label htmlFor="email">Email</label>
  <input type="text" id="email" value={email} disabled="disabled" />
</div>

  
<button className="profile-completion" onClick={handleCompleteProfile}>
  Complete Your Profile
</button>
<button className="send-link-button" onClick={sendVerificationEmail}>
  Send Verification Email 
</button>

</div>
<Expenseform />

    </div>
  );
};

export default Home;
