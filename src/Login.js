
import React, { useState } from "react";
import "./Login.css";
import "./HomePage.css";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/authSlice";

// Backend API URL
const API_URL = "http://localhost:5000/api/auth";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("login");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN DATA
  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  // REGISTRATION DATA
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  // ==========================================
  // INPUT CHANGE HANDLERS
  // ==========================================

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      login: "",
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      register: "",
    }));
  };

  // ==========================================
  // VALIDATION FUNCTIONS
  // ==========================================

  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*?&])[A-Za-z\d@$!*?&]{8,}$/.test(
      password
    );
  };

  // ==========================================
  // CUSTOMER LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    const mobile = loginData.mobile.trim();
    const password = loginData.password;

    const newErrors = {};

    // Mobile validation
    if (!validateMobile(mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number.";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password =
        "Please enter your password.";
    }

    setErrors(newErrors);
    setMessage("");

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          password,
        }),
      });

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        setErrors({
          login:
            data.message ||
            "Invalid mobile number or password.",
        });
        return;
      }

      // Check user data
      if (!data.user) {
        setErrors({
          login: "User details not received from server.",
        });
        return;
      }

      // Customer role check
      if (data.user.role?.toUpperCase() !== "CUSTOMER") {
        setErrors({
          login: "This portal is only for customers.",
        });
        return;
      }

      // Account status check
      const status = data.user.status?.toUpperCase();

      if (
        status &&
        !["ACTIVE", "APPROVED"].includes(status)
      ) {
        setErrors({
          login:
            "Your account is not active. Please contact support.",
        });
        return;
      }

      // Token check
      if (!data.token) {
        setErrors({
          login:
            "Authentication token not received from server.",
        });
        return;
      }

      // ==================================
      // STORE CUSTOMER DETAILS IN REDUX
      // ==================================

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );

      console.log("Customer stored in Redux:", data.user);

      // Navigate to profile
      navigate("/profile", {
        replace: true,
      });

    } catch (error) {
      console.error("Login Error:", error);

      setErrors({
        login:
          "Unable to connect to the server. Please check your backend.",
      });

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CUSTOMER REGISTRATION
  // ==========================================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = registerData.name.trim();
    const email = registerData.email.trim();
    const mobile = registerData.mobile.trim();
    const gender = registerData.gender;
    const password = registerData.password;
    const confirmPassword = registerData.confirmPassword;

    const newErrors = {};

    // Name validation
    if (!/^[A-Za-z ]{3,}$/.test(name)) {
      newErrors.name =
        "Enter a valid name (minimum 3 letters).";
    }

    // Email validation
    if (!validateEmail(email)) {
      newErrors.email =
        "Enter a valid email address.";
    }

    // Mobile validation
    if (!validateMobile(mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number.";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender =
        "Please select your gender.";
    }

    // Password validation
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, uppercase, lowercase, number and special character.";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);
    setMessage("");

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: name,
          email,
          phone: mobile,
          gender: gender.toUpperCase(),
          password,
        }),
      });

      const data = await response.json();

      console.log("Registration Response:", data);

      if (!response.ok) {
        setErrors({
          register:
            data.message ||
            "Registration failed. Please try again.",
        });
        return;
      }

      if (!data.success || !data.user || !data.token) {
        setErrors({
          register:
            data.message ||
            "Registration succeeded, but authentication details were not received.",
        });
        return;
      }

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );
      navigate("/profile", {
        replace: true,
      });

    } catch (error) {
      console.error("Registration Error:", error);

      setErrors({
        register:
          "Unable to connect to the server. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SWITCH LOGIN / REGISTER TAB
  // ==========================================

  const switchTab = (tab) => {
    if (loading) return;

    setActiveTab(tab);
    setErrors({});
    setMessage("");

    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
  };

  // ==========================================
  // UI
  // ==========================================

  if (isLoggedIn && token) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="loan-page auth-page">

      <Navbar />

      <section className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-left">

          <span className="auth-eyebrow">
            WELCOME TO LOANORA
          </span>

          <h1>
            Your Financial
            <br />
            Dreams Start
            <br />
            <span>Right Here.</span>
          </h1>

          <p>
            Manage your loans, track applications and enjoy
            a simple and convenient borrowing experience
            with Loanora.
          </p>

          <div className="auth-benefits">
            <div>✓ Simple Online Application</div>
            <div>✓ Secure Customer Access</div>
            <div>✓ Loan Management Made Easy</div>
          </div>

          <div className="auth-illustration">

            <div className="illustration-circle">

              <div className="illustration-card">

                <span>PERSONAL LOAN</span>

                <h2>₹</h2>

                <h3>Smart Finance</h3>

                <p>
                  Plan your future with confidence
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-right">

          <div className="auth-card">

            <div className="auth-card-heading">

              <span className="auth-lock">♙</span>

              <h2>Customer Portal</h2>

              <p>
                Login or create your Loanora account
              </p>

            </div>

            {/* TABS */}

            <div className="auth-tabs">

              <button
                type="button"
                className={
                  activeTab === "login" ? "selected" : ""
                }
                onClick={() => switchTab("login")}
                disabled={loading}
              >
                Login
              </button>

              <button
                type="button"
                className={
                  activeTab === "register" ? "selected" : ""
                }
                onClick={() => switchTab("register")}
                disabled={loading}
              >
                Register
              </button>

            </div>

            {/* SUCCESS MESSAGE */}

            {message && (
              <div className="auth-message" role="status">
                {message}
              </div>
            )}

            {/* ================================= */}
            {/* LOGIN FORM */}
            {/* ================================= */}

            {activeTab === "login" && (

              <form onSubmit={handleLogin} noValidate>

                {errors.login && (
                  <small
                    className="field-error auth-form-error"
                    role="alert"
                  >
                    {errors.login}
                  </small>
                )}

                {/* MOBILE */}

                <div className="auth-field">

                  <label>Mobile Number</label>

                  <div
                    className={`auth-input ${errors.mobile ? "input-error" : ""
                      }`}
                  >

                    <span>+91</span>

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={loginData.mobile}
                      onChange={handleLoginChange}
                      required
                    />

                  </div>

                  {errors.mobile && (
                    <small className="field-error" role="alert">
                      {errors.mobile}
                    </small>
                  )}

                </div>

                {/* PASSWORD */}

                <div className="auth-field">

                  <label>Password</label>

                  <div
                    className={`auth-input ${errors.password ? "input-error" : ""
                      }`}
                  >

                    <input
                      type={
                        showLoginPassword ? "text" : "password"
                      }
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowLoginPassword(!showLoginPassword)
                      }
                    >
                      {showLoginPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  {errors.password && (
                    <small className="field-error" role="alert">
                      {errors.password}
                    </small>
                  )}

                </div>

                {/* FORGOT PASSWORD */}

                <div className="forgot-password">

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* LOGIN BUTTON */}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : "Login to Account →"}
                </button>

                <p className="auth-switch">

                  Don't have an account?

                  <button
                    type="button"
                    onClick={() => switchTab("register")}
                  >
                    Register Now
                  </button>

                </p>

              </form>

            )}

            {/* ================================= */}
            {/* REGISTER FORM */}
            {/* ================================= */}

            {activeTab === "register" && (

              <form onSubmit={handleRegister} noValidate>

                {errors.register && (
                  <small
                    className="field-error auth-form-error"
                    role="alert"
                  >
                    {errors.register}
                  </small>
                )}

                {/* FULL NAME */}

                <div className="auth-field">

                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={
                      errors.name ? "input-error" : ""
                    }
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />

                  {errors.name && (
                    <small className="field-error" role="alert">
                      {errors.name}
                    </small>
                  )}

                </div>

                {/* EMAIL */}

                <div className="auth-field">

                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className={
                      errors.email ? "input-error" : ""
                    }
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />

                  {errors.email && (
                    <small className="field-error" role="alert">
                      {errors.email}
                    </small>
                  )}

                </div>

                {/* MOBILE */}

                <div className="auth-field">

                  <label>Mobile Number</label>

                  <div
                    className={`auth-input ${errors.mobile ? "input-error" : ""
                      }`}
                  >

                    <span>+91</span>

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={registerData.mobile}
                      onChange={handleRegisterChange}
                      required
                    />

                  </div>

                  {errors.mobile && (
                    <small className="field-error" role="alert">
                      {errors.mobile}
                    </small>
                  )}

                </div>

                {/* GENDER */}

                <div className="auth-field">

                  <label>Gender</label>

                  <select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleRegisterChange}
                    className={
                      errors.gender ? "input-error" : ""
                    }
                    required
                  >

                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>

                  </select>

                  {errors.gender && (
                    <small className="field-error" role="alert">
                      {errors.gender}
                    </small>
                  )}

                </div>

                {/* PASSWORD */}

                <div className="auth-field">

                  <label>Password</label>

                  <div
                    className={`auth-input ${errors.password ? "input-error" : ""
                      }`}
                  >

                    <input
                      type={
                        showRegisterPassword ? "text" : "password"
                      }
                      name="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowRegisterPassword(
                          !showRegisterPassword
                        )
                      }
                    >
                      {showRegisterPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  {errors.password && (
                    <small className="field-error" role="alert">
                      {errors.password}
                    </small>
                  )}

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="auth-field">

                  <label>Confirm Password</label>

                  <div
                    className={`auth-input ${errors.confirmPassword ? "input-error" : ""
                      }`}
                  >

                    <input
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <small className="field-error" role="alert">
                      {errors.confirmPassword}
                    </small>
                  )}

                </div>

                {/* TERMS */}

                <label className="auth-terms">

                  <input
                    type="checkbox"
                    required
                  />

                  <span>
                    I agree to the Terms & Conditions and Privacy Policy.
                  </span>

                </label>

                {/* REGISTER BUTTON */}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : "Create Customer Account →"}
                </button>

                <p className="auth-switch">

                  Already have an account?

                  <button
                    type="button"
                    onClick={() => switchTab("login")}
                  >
                    Login
                  </button>

                </p>

              </form>

            )}

            {/* SECURITY */}

            <div className="auth-security">

              <span>🔒</span>

              Your information is protected.

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="auth-footer">
        © 2026 Loanora. All Rights Reserved.
      </footer>

    </div>
  );
};

export default Login;
