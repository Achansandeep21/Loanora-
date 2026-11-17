
import React from "react";
import Navbar from "./Navbar";
import "./Profile.css";

function Profile() {

  const userData = JSON.parse(
    sessionStorage.getItem("userData")
  );

  if (!userData) {
    return (
      <div>
        <Navbar />
        <h2>Please register to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="loan-page profile-page">

      <Navbar />

      <div className="profile-container">

        <h1>My Profile</h1>

        <div className="profile-card">

          <div className="profile-icon">
            👤
          </div>

          <h2>{userData.name}</h2>

          <div className="profile-details">

            <p>
              <strong>Full Name:</strong>
              {userData.name}
            </p>

            <p>
              <strong>Email Address:</strong>
              {userData.email}
            </p>

            <p>
              <strong>Mobile Number:</strong>
              +91 {userData.mobile}
            </p>
            <p>
                <strong>Gender:</strong>
                {userData.gender}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
