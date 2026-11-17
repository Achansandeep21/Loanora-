# Loanora - Loan Application Website

A responsive React-based loan application website for browsing and applying for personal, car, education, and two-wheeler loans. The app includes a landing page, loan category selection, loan application forms, EMI calculator, login/register flow, and user profile screens.

## Overview

This project is a frontend prototype for a digital lending platform. It is designed to help users:

- explore available loan products
- compare loan options
- submit loan application details
- calculate EMI estimates
- register or log in to a customer portal
- view profile and application-related information

## Features

- Modern landing page with loan highlights and benefits
- Loan category menu with multiple financing options
- Dynamic loan application forms based on loan type
- Loan detail carousel with product info and interest/tenure details
- EMI calculator page for estimating repayment
- Customer login and registration UI with validation
- Profile and identity sections for customer data
- Responsive styling for mobile and desktop layouts

## Supported Loan Types

- Personal Loan
- Car Loan
- Education Loan
- Two Wheeler Loan

## Tech Stack

- React
- React Router DOM
- HTML/CSS
- JavaScript
- Create React App

## Project Structure

```text
loan-website/
├── public/
├── src/
│   ├── App.js
│   ├── CarLoan.js
│   ├── EmiCalculator.js
│   ├── HomePage.jsx
│   ├── Identity.js
│   ├── LoanDetails.js
│   ├── LoanMenu.js
│   ├── Login.js
│   ├── Navbar.js
│   ├── Profile.js
│   ├── information.js
│   ├── images/
│   ├── index.js
│   ├── main.css
│   └── ...
├── package.json
├── README.md
└── package-lock.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm

### Installation

```bash
npm install
```

### Run the App

```bash
npm start
```

The application will run in development mode at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm start
npm test
npm run build
```

### Description

- `npm start` — runs the React development server
- `npm test` — launches the test runner
- `npm run build` — creates an optimized production build in the `build` directory

## Key Routes

| Route | Description |
| --- | --- |
| `/` | Home/landing page |
| `/login` | Login and registration screen |
| `/loan-menu` | Loan options menu |
| `/loan-details/:loanType` | Dynamic loan application page |
| `/emi-calculator` | Loan EMI estimation page |
| `/profile` | User profile screen |
| `/identity` | Identity-related section |

## Notes

- This project currently works as a frontend UI prototype.
- User registration/login validation is implemented on the client side using browser storage (`sessionStorage`).
- No real backend API, database, or payment integration is connected yet.
- The app can be extended with backend authentication, real loan APIs, and database persistence.

## Future Improvements

- integrate backend authentication and database
- add API-driven loan processing
- add PDF/approval management
- add admin dashboard
- connect EMI calculations to backend rules
- improve accessibility and performance

## License

This project is for educational/demo purposes and is not intended for production financial processing without legal and compliance review.
