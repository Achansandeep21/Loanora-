
import car from "./images/carloan.jpg";
import car1 from "./images/carloan1.jpg";
import car2 from "./images/carloan3.jpg";

import bike from "./images/bikeloan.jpg";
import bike1 from "./images/bikeloan1.jpg";
import bike2 from "./images/bikeloan2.jpg";

import personal from "./images/personalloan.png";
import personal1 from "./images/personalloan1.png";

import education from "./images/educationloan.jpg";
import education1 from "./images/educationloan2.jpg";
import education2 from "./images/educationloan1.jpg";

const loanInformation = {

  // CAR LOAN

  car: {
    title: "Car Loan",
    // icon: "🚗",
    description: "Get financial support to purchase your dream car.",
    interest: "8.5%",
    duration: "Up to 3 years",

    images: [car, car1, car2],

    fields: [
      {
        name: "carModel",
        label: "Car Model",
        type: "text",
        placeholder: "Enter car model"
      },
      {
        name: "dealerQuotation",
        label: "Dealer Quotation",
        type: "number",
        placeholder: "Enter quotation amount"
      },
      {
        name: "downPayment",
        label: "Down Payment",
        type: "number",
        placeholder: "Enter down payment"
      },
      {
        name: "insurance",
        label: "Insurance Amount",
        type: "number",
        placeholder: "Enter insurance amount"
      },
      {
        name: "loanAmount",
        label: "Required Loan Amount",
        type: "number",
        placeholder: "Enter required loan amount"
      }
    ],

    documents: [
      "Dealer quotation",
      "Car proforma invoice",
      "Identity proof",
      "Address proof",
      "Income proof",
      "Bank statements"
    ]
  },

  // EDUCATION LOAN

  education: {
    title: "Education Loan",
    // icon: "🎓",
    description: "Finance your higher education and achieve your dreams.",
    interest: "9%",
    duration: "Up to 7 years",

    images: [education, education1, education2],
 fields: [
    {
      name: "educationLevel",
      label: "Education Level",
      type: "select",
      options: ["Bachelor's Degree", "Master's Degree"]
    },
    {
      name: "courseName",
      label: "Course Name",
      type: "text",
      placeholder: "Enter course name"
    },
    {
      name: "collegeName",
      label: "College / University",
      type: "text",
      placeholder: "Enter college name"
    },
    {
      name: "feeStructure",
      label: "Total Course Fee",
      type: "number",
      placeholder: "Enter course fee"
    },
    {
      name: "loanAmount",
      label: "Required Loan Amount",
      type: "number",
      placeholder: "Enter required loan amount"
    }
  ],

    documents: [
      "10th marksheet",
      "12th marksheet",
      "Graduation marksheet (if applicable)",
      "Entrance exam scorecard (if applicable)",
      "College admission letter",
      "Course fee structure",
      "Identity proof",
      "Address proof"
    ]
  },

  // TWO WHEELER LOAN

  "two-wheeler": {
    title: "Two Wheeler Loan",
    icon: "🏍️",
    description: "Purchase your dream bike with affordable financing.",
    interest: "8%",
    duration: "Up to 2 years",

    images: [bike, bike1, bike2],

    fields: [
      {
        name: "bikeModel",
        label: "Bike Model",
        type: "text",
        placeholder: "Enter bike model"
      },
      {
        name: "dealerName",
        label: "Dealer Name",
        type: "text",
        placeholder: "Enter dealer name"
      },
      {
        name: "bikeQuotation",
        label: "Bike Quotation",
        type: "number",
        placeholder: "Enter bike quotation"
      },
      {
        name: "downPayment",
        label: "Down Payment",
        type: "number",
        placeholder: "Enter down payment"
      },
      {
        name: "insurance",
        label: "Insurance Amount",
        type: "number",
        placeholder: "Enter insurance amount"
      },
      {
        name: "loanAmount",
        label: "Required Loan Amount",
        type: "number",
        placeholder: "Enter required loan amount"
      }
    ],

    documents: [
      "Bike dealer quotation",
      "Identity proof",
      "Address proof",
      "Income proof",
      "Bank statements",
      "Driving licence"
    ]
  },

  // PERSONAL LOAN

  personal: {
    title: "Personal Loan",
    // icon: "💰",
    description: "Get financial support for your personal needs.",
    interest: "11%",
    duration: "Up to 5 years",

    images: [personal, personal1],

    fields: [
      {
        name: "employmentType",
        label: "Employment Type",
        type: "select",
        options: ["Salaried", "Self Employed"]
      },
      {
        name: "monthlyIncome",
        label: "Monthly Income",
        type: "number",
        placeholder: "Enter monthly income"
      },
      {
        name: "companyName",
        label: "Company / Business Name",
        type: "text",
        placeholder: "Enter company name"
      },
      {
        name: "loanPurpose",
        label: "Loan Purpose",
        type: "text",
        placeholder: "Enter loan purpose"
      },
      {
        name: "loanAmount",
        label: "Required Loan Amount",
        type: "number",
        placeholder: "Enter required loan amount"
      }
    ],

    documents: [
      "Identity proof",
      "Address proof",
      "Salary slips or income proof",
      "Bank statements",
      "Employment proof or business registration"
    ]
  }

};

export default loanInformation;
