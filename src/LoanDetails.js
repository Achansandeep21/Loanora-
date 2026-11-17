
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import loanInformation from "./information";
import "./LoanDetails.css";
import { useNavigate } from "react-router-dom";

function LoanDetails() {
  const { loanType } = useParams();

  const loan = loanInformation[loanType];

  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  // Reset image and form when loan type changes
  useEffect(() => {
    setCurrentImage(0);
    setFormData({});
  }, [loanType]);

  // Automatic carousel
  useEffect(() => {
    if (!loan || !loan.images || loan.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        (prev + 1) % loan.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [loanType, loan]);

  // Next image
  const nextImage = () => {
    if (!loan || !loan.images.length) return;

    setCurrentImage((prev) =>
      (prev + 1) % loan.images.length
    );
  };

  // Previous image
  const prevImage = () => {
    if (!loan || !loan.images.length) return;

    setCurrentImage((prev) =>
      (prev - 1 + loan.images.length) % loan.images.length
    );
  };

  // Handle form changes
  
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {

    if (name === "educationLevel") {
      return {
        ...prev,
        educationLevel: value,
        tenthMarks: "",
        twelfthMarks: "",
        graduationMarks: "",
        entranceExam: "",
        entranceScore: ""
      };
    }

    return {
      ...prev,
      [name]: value
    };

  });
};


  // Submit form
  const handleSubmit = (e) => {
  e.preventDefault();

  const applicationData = {
    loanType,
    ...formData
  };

  navigate("/emi-calculator", {
    state: applicationData
  });
};

  if (!loan) {
    return <h2>Loan not found!</h2>;
  }

  return (
    <div className="loan-page">

      <Navbar />

      <div className="loan-details-container">

        {/* LOAN TITLE */}

        <h1>
          {loan.icon} {loan.title}
        </h1>

        <p>{loan.description}</p>

        {/* IMAGE CAROUSEL */}

        <div className="loan-carousel">

          <button
            type="button"
            onClick={prevImage}
            disabled={loan.images.length <= 1}
          >
            ❮
          </button>

          <div className="carousel-image">

            <img
              src={loan.images[currentImage]}
              alt={loan.title}
            />

            <p>
              {currentImage + 1} / {loan.images.length}
            </p>

          </div>

          <button
            type="button"
            onClick={nextImage}
            disabled={loan.images.length <= 1}
          >
            ❯
          </button>

        </div>

        {/* LOAN INFORMATION */}

        <div className="loan-info">

          <h2>Loan Information</h2>

          <p>
            Interest Rate: {loan.interest}
          </p>

          <p>
            Loan Duration: {loan.duration}
          </p>

        </div>

        {/* DYNAMIC APPLICATION FORM */}

        <div className="loan-form-container">

          <h2>{loan.title} Application Details</h2>

<form onSubmit={handleSubmit}>

  {/* EXISTING DYNAMIC FIELDS */}

  {loan.fields.map((field) => (

    <div
      className="loan-form-field"
      key={field.name}
    >

      <label htmlFor={field.name}>
        {field.label}
      </label>

      {field.type === "select" ? (

        <select
          id={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required
        >

          <option value="">
            Select an option
          </option>

          {field.options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}

        </select>

      ) : (

        <input
          id={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required
          min={field.type === "number" ? 0 : undefined}
        />

      )}

    </div>

  ))}


  {/* BACHELOR'S DEGREE FIELDS */}

  {loanType === "education" &&
    formData.educationLevel === "Bachelor's Degree" && (
      <>

        <div className="loan-form-field">

          <label>10th Marks / Percentage</label>

          <input
            type="text"
            name="tenthMarks"
            placeholder="Enter 10th marks"
            value={formData.tenthMarks || ""}
            onChange={handleChange}
            required
          />

        </div>

        <div className="loan-form-field">

          <label>12th Marks / Percentage</label>

          <input
            type="text"
            name="twelfthMarks"
            placeholder="Enter 12th marks"
            value={formData.twelfthMarks || ""}
            onChange={handleChange}
            required
          />

        </div>

        <div className="loan-form-field">

          <label>Entrance Examination</label>

          <select
            name="entranceExam"
            value={formData.entranceExam || ""}
            onChange={handleChange}
            required
          >

            <option value="">Select Exam</option>
            <option value="EAMCET">EAMCET / EAPCET</option>
            <option value="JEE">JEE</option>
            <option value="Other">Other</option>

          </select>

        </div>

        <div className="loan-form-field">

          <label>Entrance Exam Score / Rank</label>

          <input
            type="text"
            name="entranceScore"
            placeholder="Enter score or rank"
            value={formData.entranceScore || ""}
            onChange={handleChange}
            required
          />

        </div>

      </>
    )}


  {/* MASTER'S DEGREE FIELDS */}

  {loanType === "education" &&
    formData.educationLevel === "Master's Degree" && (
      <>

        <div className="loan-form-field">

          <label>Graduation Marks / CGPA</label>

          <input
            type="text"
            name="graduationMarks"
            placeholder="Enter graduation marks"
            value={formData.graduationMarks || ""}
            onChange={handleChange}
            required
          />

        </div>

        <div className="loan-form-field">

          <label>Entrance Examination</label>

          <select
            name="entranceExam"
            value={formData.entranceExam || ""}
            onChange={handleChange}
            required
          >

            <option value="">Select Exam</option>
            <option value="GATE">GATE</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="Duolingo">Duolingo</option>
            <option value="Other">Other</option>

          </select>

        </div>

        <div className="loan-form-field">

          <label>Entrance Exam Score</label>

          <input
            type="text"
            name="entranceScore"
            placeholder="Enter exam score"
            value={formData.entranceScore || ""}
            onChange={handleChange}
            required
          />

        </div>

      </>
    )}


  {/* SUBMIT BUTTON */}

  <button type="submit">
    Submit Loan Details
  </button>

</form>


        </div>

        {/* REQUIRED DOCUMENTS */}

        <div className="loan-documents">

          <h2>Required Documents</h2>

          {loan.documents.map((document, index) => (

            <p key={index}>
              ✓ {document}
            </p>

          ))}

        </div>

      </div>

    </div>
  );
}

export default LoanDetails;
