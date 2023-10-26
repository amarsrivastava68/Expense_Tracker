import React, { useState } from "react";
import "./Home.css"; // Import your CSS file
import ProfileModal from "../components/ProfileModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

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
            Complete Your Profile
          </button>
        </div>
      </div>

      <ProfileModal
        showModal={showModal}
        onClose={handleCloseModal}
        
      />
    </div>
  );
};

export default Home;
