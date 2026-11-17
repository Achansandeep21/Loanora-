
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import CarLoan from "./CarLoan";
import LoanMenu from "./LoanMenu";
import Login from "./Login";
import Profile from "./Profile";
import LoanDetails from "./LoanDetails";
import EmiCalculator from "./EmiCalculator";
import Identity from "./Identity";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/personal-loan" element={<PersonalLoan />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/benefits" element={<HomePage />} />
          <Route path="/eligibility" element={<HomePage />} />
          <Route path="/contact" element={<HomePage />} />
          <Route path="/car-loan" element={<CarLoan />} />
          <Route path="/loan-menu" element={<LoanMenu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loan-details/:loanType" element={<LoanDetails />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/identity" element={<Identity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
