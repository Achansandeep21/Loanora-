
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { logout } from "./redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const isAuthenticated = isLoggedIn && Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick = (event, sectionId) => {
    if (
      window.location.pathname === "/" &&
      window.location.hash === `#${sectionId}`
    ) {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar loan-navbar">

      <div className="loan-logo">
        <span>Loanora </span>
      </div>

      <div className="row container">
        <div className="loan-nav-links loan-nav-actions">

          {/* Always Visible */}
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <Link to="/loan-menu">Loan Menu</Link>

          {isAuthenticated ? (
            <>
              {/* After Login */}

              <Link to="/profile">My Profile</Link>

              <Link
                to="/login"
                className="login-btn"
                onClick={(event) => {
                  event.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              {/* Before Login */}

              <Link
                to="/#benefits"
                onClick={(event) => handleSectionClick(event, "benefits")}
              >
                Benefits
              </Link>

              <Link
                to="/#Eligibility"
                onClick={(event) => handleSectionClick(event, "Eligibility")}
              >
                Eligibility
              </Link>

              <Link
                to="/#contact"
                onClick={(event) => handleSectionClick(event, "contact")}
              >
                Contact
              </Link>

              <Link to="/login" className="login-btn apply-btn">
                Login
              </Link>
            </>
          )}

        </div>
      </div>

    </nav>
  );
}

export default Navbar;
