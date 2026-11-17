import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./EmiCalculator.css";
import {  useNavigate } from "react-router-dom";

function EmiCalculator() {

  const location = useLocation();

  const applicationData = location.state || {};

  const loanType = applicationData.loanType || "car";
    const navigate = useNavigate();
  const loanDetails = {
    car: {
      title: "Car Loan",
      interest: 8.5,
      amountField: "loanAmount",
      downPaymentRequired: true
    },

    "two-wheeler": {
      title: "Two Wheeler Loan",
      interest: 8,
      amountField: "loanAmount",
      downPaymentRequired: true
    },

    personal: {
      title: "Personal Loan",
      interest: 11,
      amountField: "loanAmount",
      downPaymentRequired: false
    },

    education: {
      title: "Education Loan",
      interest: 9,
      amountField: "loanAmount",
      downPaymentRequired: false
    }
  };

  const selectedLoan = loanDetails[loanType];

  const [tenure, setTenure] = useState(1);

  const [loanAmount, setLoanAmount] = useState(
    Number(applicationData.loanAmount) || 0
  );

  const [downPayment, setDownPayment] = useState(
    Number(applicationData.downPayment) || 0
  );

  const actualLoanAmount =
    selectedLoan.downPaymentRequired
      ? loanAmount - downPayment
      : loanAmount;

  const months = tenure * 12;

  const monthlyRate = selectedLoan.interest / 1200;

  const emi =
    actualLoanAmount > 0
      ? (
          actualLoanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)
        ) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  const totalPayment = emi * months;

  const totalInterest = totalPayment - actualLoanAmount;

  const formatAmount = (amount) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    });

  return (

    <div className="emi-page">

      <Navbar />

      <div className="emi-container">

        <h1>{selectedLoan.title} EMI Calculator</h1>

        <p>
          Calculate your monthly EMI based on your loan details.
        </p>

        <div className="emi-card">

          <h2>Loan Details</h2>

          <div className="emi-field">

            <label>Loan Amount (₹)</label>

            <input
              type="number"
              value={loanAmount}
              min="1"
              onChange={(e) =>
                setLoanAmount(Number(e.target.value))
              }
            />

          </div>

          {selectedLoan.downPaymentRequired && (

            <div className="emi-field">

              <label>Down Payment (₹)</label>

              <input
                type="number"
                min="0"
                value={downPayment}
                onChange={(e) =>
                  setDownPayment(Number(e.target.value))
                }
              />

            </div>

          )}

          <div className="emi-field">

            <label>Interest Rate</label>

            <input
              type="text"
              value={selectedLoan.interest + "%"}
              readOnly
            />

          </div>

          <div className="emi-field">

            <label>Select Tenure</label>

            <select
              value={tenure}
              onChange={(e) =>
                setTenure(Number(e.target.value))
              }
            >

              <option value={1}>1 Year</option>
              <option value={3}>3 Years</option>
              <option value={5}>5 Years</option>

            </select>

          </div>

          <div className="emi-results">

            <h2>EMI Calculation</h2>

            <p>
              Loan Amount: {formatAmount(actualLoanAmount)}
            </p>

            <p>
              Interest Rate: {selectedLoan.interest}%
            </p>

            <p>
              Tenure: {tenure} Years
            </p>

            <p>
              Total Interest: {formatAmount(totalInterest)}
            </p>

            <p>
              Total Payment: {formatAmount(totalPayment)}
            </p>

            <div className="emi-final">

              <h3>Monthly EMI</h3>

              <h2>{formatAmount(emi)}</h2>

            </div>
<button
  type="button"
  className="emi-proceed"
  onClick={() =>
    navigate("/identity", {
      state: {
        applicationData,
        loanType,
        loanAmount: actualLoanAmount,
        tenure,
        interestRate: selectedLoan.interest,
        emi
      }
    })
  }
>
  Proceed
</button>
          </div>

        </div>

      </div>

    </div>

  );

}

export default EmiCalculator;