
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import "./Profile.css";

import {
  updateUser,
  logout,
} from "./redux/authSlice";

const API_URL = "http://localhost:5000/api/users";
const profileRequests = new Map();

const requestProfile = (token) => {
  const pendingRequest = profileRequests.get(token);
  if (pendingRequest) return pendingRequest;

  const request = fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => ({
      response,
      data: await response.json(),
    }))
    .finally(() => {
      profileRequests.delete(token);
    });

  profileRequests.set(token, request);
  return request;
};

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get customer details from Redux
  const { user, token, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer profile from backend
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      // Check whether customer is logged in
      if (!isLoggedIn || !token) {
        dispatch(logout());

        navigate("/login", {
          replace: true,
        });

        return;
      }

      try {
        setLoading(true);
        setError("");

        const { response, data } = await requestProfile(token);

        // Check expired or invalid token
        if (response.status === 401) {
          dispatch(logout());

          navigate("/login", {
            replace: true,
          });

          return;
        }

        // Check API response
        if (!response.ok || !data.success || !data.user) {
          throw new Error(
            data.message || "Unable to fetch customer profile."
          );
        }

        // Store latest customer details in Redux
        if (isMounted) {
          dispatch(updateUser(data.user));
          setError("");
        }

      } catch (err) {
        console.error("Profile API Error:", err);

        if (isMounted) {
          setError(
            err.message || "Something went wrong."
          );
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };

  }, [dispatch, navigate, isLoggedIn, token]);

  // Loading screen
  if (loading) {
    return (
      <div className="loan-page profile-page">
        <Navbar />

        <div className="profile-container">
          <h2>Loading your profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-page profile-page">

      <Navbar />

      <div className="profile-container">

        <h1>My Profile</h1>

        <p className="profile-subtitle">
          View and manage your personal information.
        </p>

        {/* Error Message */}
        {error && (
          <div className="profile-error">
            <h3>Unable to Load Profile</h3>
            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Customer Profile */}
        {!error && user && (
          <div className="profile-card">

            <div className="profile-icon">
              👤
            </div>

            <h2>
              {user.full_name || user.name || "Customer"}
            </h2>

            <p className="profile-role">
              Loanora Customer
            </p>

            <div className="profile-details">

              <div className="profile-detail-item">
                <strong>Customer ID</strong>
                <span>
                  {user.user_id || user.id || "N/A"}
                </span>
              </div>

              <div className="profile-detail-item">
                <strong>Full Name</strong>
                <span>
                  {user.full_name || user.name || "N/A"}
                </span>
              </div>

              <div className="profile-detail-item">
                <strong>Email Address</strong>
                <span>
                  {user.email || user.email_id || "N/A"}
                </span>
              </div>

              <div className="profile-detail-item">
                <strong>Mobile Number</strong>
                <span>
                  +91 {user.phone || user.mobile || "N/A"}
                </span>
              </div>

              <div className="profile-detail-item">
                <strong>Gender</strong>
                <span>
                  {user.gender || "N/A"}
                </span>
              </div>

              <div className="profile-detail-item">
                <strong>Account Status</strong>
                <span>
                  {user.status || "ACTIVE"}
                </span>
              </div>

            </div>

          </div>
        )}

        {!error && !user && (
          <div className="profile-error">
            <p>Customer information is not available.</p>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
