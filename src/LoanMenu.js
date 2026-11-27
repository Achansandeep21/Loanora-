
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./LoanMenu.css";

function LoanMenu() {

  const navigate = useNavigate();
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  const loans = [
    {
      id: "car",
      title: "Car Loan",
      icon: "🚗",
      description: "Get a loan to purchase your dream car."
    },
    {
      id: "education",
      title: "Education Loan",
      icon: "🎓",
      description: "Finance your higher education."
    },
    {
      id: "two-wheeler",
      title: "Two Wheeler Loan",
      icon: "🏍️",
      description: "Get financing for your dream bike."
    },
    {
      id: "personal",
      title: "Personal Loan",
      icon: "💰",
      description: "Get financial support for personal needs."
    }
  ];


  // CHECK LOGIN BEFORE OPENING LOAN DETAILS
  const handleLoanClick = (loanId) => {
    if (isLoggedIn && token) {

      // User already logged in
      sessionStorage.removeItem("selectedLoan");

      navigate(`/loan-details/${loanId}`);

    } else {

      // Save selected loan
      sessionStorage.setItem("selectedLoan", loanId);

      // Redirect to login page
      navigate("/login");

    }

  };


  return (

    <div className="loan-page">

      <Navbar />

      <h1>Explore Our Loans</h1>


      <div className="loan-grid">

        {loans.map((item) => (

          <div className="loan-card" key={item.id}>

            <h1>{item.icon}</h1>

            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <button
              onClick={() => handleLoanClick(item.id)}
            >
              View Details
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default LoanMenu;
