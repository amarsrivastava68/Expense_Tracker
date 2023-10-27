import React, { useContext, useState } from "react";
import "./ProfileModal.css"; // Import your CSS file
import AuthContext from "../store/auth-context";

const ProfileModal = ({ showModal, onClose }) => {
  const [name, setName] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const authCtx = useContext(AuthContext);

  const handleUpdateProfile = async () => {
    
    // Prepare the data to be sent in the POST request

    const data = {
      displayName: name,
      idToken: authCtx.token,
      photoUrl: profilePictureURL,
      
      returnSecureToken: true,
    };

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB5b9Cds4vuHy_NCTXaZORHjjUDh-OQmn0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // The API request was successful, you can handle the response here
        console.log("Profile updated successfully");
        
        onClose(); // Close the modal after a successful update
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    showModal && (
      <div className="modal" onClick={handleBackdropClick}>
        <div className="modal-content">
          <input
            type="text"
            className="profile-input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="profile-input"
            placeholder="Profile picture URL"
            onChange={(e) => setProfilePictureURL(e.target.value)}
          />
          <button className="save-button" onClick={handleUpdateProfile}>
            Update
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileModal;
