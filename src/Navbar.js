
import React from "react";
import "./Navbar.css";

function Navbar() {

  const userData = JSON.parse(
    sessionStorage.getItem("userData") || "null"
  );

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <nav className="navbar loan-navbar">

      <div className="loan-logo">
        <span>Loanora </span>
      </div>

      <div className="row container">
        <div className="loan-nav-links loan-nav-actions">

          {userData ? (
            <>
              {/* After Login / Registration */}

              <a href="/loan-menu">Loan Menu</a>
              <a href="/profile">My Profile</a>
              <a href="/my-applications">My Applications</a>
              <a href="/#contact">Contact</a>
              <a href="/" className="login-btn"
              onClick={(e) => {
              e.preventDefault();
              sessionStorage.removeItem("userData");
              window.location.href = "/";
              }}
              >
              Logout
              </a>

            </>
          ) : (
            <>
              {/* Before Login / Registration */}

              <a href="/">Home</a>
              <a href="/loan-menu">Loan Menu</a>
              <a href="/#benefits">Benefits</a>
              <a href="/#eligibility">Eligibility</a>
              <a href="/#contact">Contact</a>

              <a href="/login" className="login-btn">
                Login
              </a>

              <a href="/loan-menu" className="apply-btn">
                Apply Now
              </a>

            </>
          )}

        </div>
      </div>

    </nav>
  );
}

export default Navbar;
