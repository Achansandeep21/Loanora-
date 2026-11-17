
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Identity.css";

function Identity() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    applicationData = {},
    loanType,
    loanAmount,
    tenure,
    interestRate,
    emi
  } = location.state || {};

  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");

  const [files, setFiles] = useState({});

  const [errors, setErrors] = useState({});

  // Loan-specific documents
  const documentRequirements = {

    car: [
      "Dealer quotation",
      "Car proforma invoice",
      "Address proof",
      "Income proof",
      "Bank statements"
    ],

    "two-wheeler": [
      "Bike dealer quotation",
      "Address proof",
      "Income proof",
      "Bank statements",
      "Driving licence"
    ],

    personal: [
      "Address proof",
      "Salary slips or income proof",
      "Bank statements",
      "Employment proof or business registration"
    ],

    education: [
      "Address proof",
      "College admission letter",
      "Course fee structure"
    ]

  };

  const extraDocuments =
    loanType === "education"
      ? [
          ...(applicationData.educationLevel === "Bachelor's Degree"
            ? ["10th marksheet", "12th marksheet"]
            : ["Graduation marksheet"]),
          "Entrance exam scorecard"
        ]
      : [];

  const requiredDocuments = [
    ...(documentRequirements[loanType] || []),
    ...extraDocuments
  ];

  // Aadhaar validation using 12-digit format and Verhoeff checksum
  const validateAadhaar = (number) => {

    const digits = number.replace(/\s/g, "");

    if (!/^[2-9]\d{11}$/.test(digits)) {
      return false;
    }

    const d = [
      [0,1,2,3,4,5,6,7,8,9],
      [1,2,3,4,0,6,7,8,9,5],
      [2,3,4,0,1,7,8,9,5,6],
      [3,4,0,1,2,8,9,5,6,7],
      [4,0,1,2,3,9,5,6,7,8],
      [5,9,8,7,6,0,4,3,2,1],
      [6,5,9,8,7,1,0,4,3,2],
      [7,6,5,9,8,2,1,0,4,3],
      [8,7,6,5,9,3,2,1,0,4],
      [9,8,7,6,5,4,3,2,1,0]
    ];

    const p = [
      [0,1,2,3,4,5,6,7,8,9],
      [1,5,7,6,2,8,3,0,9,4],
      [5,8,0,3,7,9,6,1,4,2],
      [8,9,1,6,0,4,3,5,2,7],
      [9,4,5,3,1,2,6,8,7,0],
      [4,2,8,6,5,7,3,9,0,1],
      [2,7,9,3,8,0,6,4,1,5],
      [7,0,4,6,9,1,3,2,5,8]
    ];

    let checksum = 0;

    for (let i = 0; i < digits.length; i++) {
      const digit = Number(digits[digits.length - 1 - i]);

      checksum = d[checksum][p[i % 8][digit]];
    }

    return checksum === 0;
  };

  // PAN validation
  const validatePAN = (number) => {

    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    return panPattern.test(number.toUpperCase());

  };

  // PDF upload validation
  const handleFileChange = (e, documentName) => {

    const file = e.target.files[0];

    if (!file) return;

    const isPDF =
      file.type === "application/pdf" &&
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPDF) {

      setErrors(prev => ({
        ...prev,
        [documentName]: "Only PDF files are allowed."
      }));

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {

      setErrors(prev => ({
        ...prev,
        [documentName]: "File size must not exceed 5 MB."
      }));

      e.target.value = "";
      return;
    }

    setFiles(prev => ({
      ...prev,
      [documentName]: file
    }));

    setErrors(prev => ({
      ...prev,
      [documentName]: ""
    }));

  };

  // Submit identity details
  const handleSubmit = (e) => {

    e.preventDefault();

    const newErrors = {};

    if (!validateAadhaar(aadhaar)) {
      newErrors.aadhaar =
        "Enter a valid 12-digit Aadhaar number.";
    }

    if (!validatePAN(pan)) {
      newErrors.pan =
        "Enter a valid PAN number (example: ABCDE1234F).";
    }

    if (!files["Aadhaar Card"]) {
      newErrors["Aadhaar Card"] =
        "Please upload Aadhaar PDF.";
    }

    if (!files["PAN Card"]) {
      newErrors["PAN Card"] =
        "Please upload PAN PDF.";
    }

    requiredDocuments.forEach(document => {

      if (!files[document]) {
        newErrors[document] =
          "Please upload this document.";
      }

    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const identityData = {
      aadhaar,
      pan: pan.toUpperCase(),
      documents: files
    };

    console.log("Loan Application:", applicationData);
    console.log("EMI Details:", {
      loanType,
      loanAmount,
      tenure,
      interestRate,
      emi
    });

    // Continue to next stage or submit to backend
    alert("Identity details and documents validated successfully!");

  };

  if (!loanType || !documentRequirements[loanType]) {
    return (
      <div>
        <Navbar />
        <h2>No loan application found. Please start again.</h2>
      </div>
    );
  }

  return (

    <div className="identity-page">

      <Navbar />

      <div className="identity-container">

        <h1>Identity Verification</h1>

        <p className="identity-description">
          Upload your identity documents and required
          loan documents in PDF format.
        </p>

        <form onSubmit={handleSubmit}>

          {/* LOAN SUMMARY */}

          <div className="identity-card">

            <h2>Loan Summary</h2>

            <p>Loan Type: <strong>{loanType}</strong></p>

            <p>
              Loan Amount: <strong>
                ₹{Number(loanAmount || 0).toLocaleString("en-IN")}
              </strong>
            </p>

            <p>Interest Rate: <strong>{interestRate}%</strong></p>

            <p>Tenure: <strong>{tenure} Years</strong></p>

            <p>
              Monthly EMI: <strong>
                ₹{Number(emi || 0).toLocaleString("en-IN", {
                  maximumFractionDigits: 2
                })}
              </strong>
            </p>

          </div>

          {/* AADHAAR DETAILS */}

          <div className="identity-card">

            <h2>Aadhaar Card Details</h2>

            <div className="identity-field">

              <label>Aadhaar Number</label>

              <input
                type="text"
                value={aadhaar}
                maxLength={12}
                placeholder="Enter 12-digit Aadhaar number"
                onChange={(e) => {
                  setAadhaar(e.target.value.replace(/\D/g, ""));
                  setErrors(prev => ({...prev, aadhaar: ""}));
                }}
                required
              />

              {errors.aadhaar && (
                <span className="identity-error">
                  {errors.aadhaar}
                </span>
              )}

            </div>

            <div className="identity-field">

              <label>Upload Aadhaar Card (PDF)</label>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) =>
                  handleFileChange(e, "Aadhaar Card")
                }
                required
              />

              {errors["Aadhaar Card"] && (
                <span className="identity-error">
                  {errors["Aadhaar Card"]}
                </span>
              )}

            </div>

          </div>

          {/* PAN DETAILS */}

          <div className="identity-card">

            <h2>PAN Card Details</h2>

            <div className="identity-field">

              <label>PAN Number</label>

              <input
                type="text"
                value={pan}
                maxLength={10}
                placeholder="Enter PAN number"
                style={{textTransform: "uppercase"}}
                onChange={(e) => {
                  setPan(e.target.value.toUpperCase());
                  setErrors(prev => ({...prev, pan: ""}));
                }}
                required
              />

              {errors.pan && (
                <span className="identity-error">
                  {errors.pan}
                </span>
              )}

            </div>

            <div className="identity-field">

              <label>Upload PAN Card (PDF)</label>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) =>
                  handleFileChange(e, "PAN Card")
                }
                required
              />

              {errors["PAN Card"] && (
                <span className="identity-error">
                  {errors["PAN Card"]}
                </span>
              )}

            </div>

          </div>

          {/* OTHER LOAN DOCUMENTS */}

          <div className="identity-card">

            <h2>Required Loan Documents</h2>

            {requiredDocuments.map((document) => (

              <div
                className="identity-field"
                key={document}
              >

                <label>{document} (PDF)</label>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) =>
                    handleFileChange(e, document)
                  }
                  required
                />

                {errors[document] && (
                  <span className="identity-error">
                    {errors[document]}
                  </span>
                )}

                {files[document] && (
                  <span className="identity-success">
                    Uploaded: {files[document].name}
                  </span>
                )}

              </div>

            ))}

          </div>

          <button
            type="submit"
            className="identity-submit"
          >
            Submit Documents
          </button>

        </form>

      </div>

    </div>

  );

}

export default Identity;
