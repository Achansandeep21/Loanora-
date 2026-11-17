
import React, { useRef, useState } from 'react'
import "./Login.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// import Navbar from "./Navbar";
const Login = () => {
    const fullNameRef = useRef();
    const [errors, setErrors] = useState({});
    const emailRef = useRef();
    const mobileRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const genderRef = useRef();
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = (e) => {
  e.preventDefault();

  const mobile = loginData.mobile.trim();
  const password = loginData.password;

  const newErrors = {};

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    newErrors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  ) {
    newErrors.password = "Password must contain at least 8 characters, uppercase, lowercase, number and special character.";
  }

  const savedUser = JSON.parse(
    sessionStorage.getItem("userData") || "null"
  );

  if (!newErrors.mobile && !savedUser) {
    newErrors.mobile = "Please register first.";
  }

  if (!newErrors.mobile && savedUser.mobile !== mobile) {
    newErrors.mobile = "Mobile number is not registered.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // Mobile matched, but password is not authenticated.
  setMessage(
    "Mobile verified. Connect backend authentication to verify your password."
  );
};



const handleRegister = (e) => {
  e.preventDefault();

  const name = fullNameRef.current.value.trim();
  const email = emailRef.current.value.trim();
  const mobile = mobileRef.current.value.trim();
  const gender = genderRef.current.value;
  const password = passwordRef.current.value;
  const confirmPassword = confirmPasswordRef.current.value;

  const newErrors = {};

  if (!/^[A-Za-z ]{3,}$/.test(name)) {
    newErrors.name = "Enter a valid name (minimum 3 letters).";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    newErrors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (!gender) {
    newErrors.gender = "Please select your gender.";
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  ) {
    newErrors.password =
      "Password must contain 8 characters, uppercase, lowercase, number and special character.";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  const userData = {
    name,
    email,
    mobile,
    gender,
    password
  };

  sessionStorage.setItem("userData", JSON.stringify(userData));

  navigate("/profile");
};


  const switchTab = (tab) => {
    setActiveTab(tab);
    setMessage("");
  };

  return (
    <div className="loan-page auth-page">
     <Navbar />
      

      {/* Login Content */}
      <section className="auth-container">

        {/* Left Side */}
        <div className="auth-left">
          <span className="auth-eyebrow">WELCOME TO Loanora </span>

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
            with Loanora .
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
                <p>Plan your future with confidence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right">

          <div className="auth-card">

            <div className="auth-card-heading">
              <span className="auth-lock">♙</span>
              <h2>Welcome Back!</h2>
              <p>Access your Loanora  account</p>
            </div>

            {/* Tabs */}
            <div className="auth-tabs">
              <button
                className={activeTab === "login" ? "selected" : ""}
                onClick={() => switchTab("login")}
                type="button"
              >
                Login
              </button>

              <button
                className={activeTab === "register" ? "selected" : ""}
                onClick={() => switchTab("register")}
                type="button"
              >
                Register
              </button>
            </div>

            {message && (
              <div className="auth-message" role="status">
                {message}
              </div>
            )}

            {/* Login Form */}
{activeTab === "login" && (
  <form onSubmit={handleLogin}>

    <div className="auth-field">
      <label>Mobile Number</label>

      <div className="auth-input">
        <span>+91</span>

        <input
          type="tel"
          name="mobile"
          placeholder="Enter 10-digit mobile number"
          maxLength="10"
          value={loginData.mobile}
          onChange={handleLoginChange}
          required
        />
      </div>

      {errors.mobile && (
        <small className="field-error">
          {errors.mobile}
        </small>
      )}
    </div>

    <div className="auth-field">
      <label>Password</label>

      <div className="auth-input">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {errors.password && (
        <small className="field-error">
          {errors.password}
        </small>
      )}
    </div>

    <div className="forgot-password">
      <a href="/forgot-password">Forgot Password?</a>
    </div>

    <button className="auth-submit" type="submit">
      Login to Account →
    </button>

    <p className="auth-switch">
      Don't have an account?
      <button
        type="button"
        onClick={() => {
          setActiveTab("register");
          setErrors({});
          setMessage("");
        }}
      >
        Register Now
      </button>
    </p>

  </form>
)}
            {/* Registration Form */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister}>

                <div className="auth-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    ref={fullNameRef}
                    required
                  />
                </div>
                <div className="auth-field">
                <label>Email Address</label>

                <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={registerData.email}
                ref={emailRef}
                onChange={handleRegisterChange}
                required
                />

                {errors.email && (
                <small className="field-error">
                {errors.email}
                </small>
                )}
                </div>
              <div className="auth-field">
                <label>Gender</label>

                <select name="gender" ref={genderRef}  required                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
           <div className="auth-field">
  <label>Mobile Number</label>

  <div className="auth-input">
    <span>+91</span>

    <input
      type="tel"
      name="mobile"
      placeholder="Enter 10-digit mobile number"
      maxLength="10"
      value={registerData.mobile}
      ref={mobileRef}
      onChange={handleRegisterChange}
      required
    />
  </div>

  {errors.mobile && (
    <small className="field-error">
      {errors.mobile}
    </small>
  )}
</div>

                <div className="auth-field">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    ref={passwordRef}
                    onChange={handleRegisterChange}
                    required
                  />
                    {errors.password && (
                    <small className="field-error">
                    {errors.password}
                    </small>
                    )}
                </div>

                <div className="auth-field">
                  <label>Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    ref={confirmPasswordRef}
                    required
                  />
                  {errors.confirmPassword && (
                  <small className="field-error">
                  {errors.confirmPassword}
                  </small>
                  )}
                </div>

                <label className="auth-terms">
                  <input type="checkbox" required />
                  <span>
                    I agree to the Terms & Conditions and Privacy Policy.
                  </span>
                </label>

                <button className="auth-submit" type="submit">
                  Create Account →
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

            <div className="auth-security">
              <span>🔒</span>
              Your information is protected.
            </div>

          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="auth-footer">
        © 2026 Loanora . All Rights Reserved.
      </footer>

    </div>
  );
};

export default Login;
