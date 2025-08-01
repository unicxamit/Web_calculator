import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './pages/Home';
// import About from './pages/About';
// import './App.css';
import GSTCalculator from "./pages/GSTCalculator";
import EPFCalculator from "./pages/EPFCalculator";
import AllCalculator from "./pages/AllCalculator";
import NPSCalculator from "./pages/NPSCalculator";
import HRACalculator from "./pages/HRACalculator";
import SIPCalculator from "./pages/SIPCalculator";
import GratuityCalculator from "./pages/GratuityCalculator";
import RetirementCalculator from "./pages/RetirementCalculator";
import RDCalculator from "./pages/RDCalculator";
import SimpleInterestCalculator from "./pages/SimpleInterestCalculator";
import TDSCalculator from "./pages/TDSCalculator";
import PPFCalculator from "./pages/PPFCalculator";
import MutualFundCalculator from "./pages/MutualFundCalculator";
import EMICalculator from "./pages/EMICalculator";
import FDCalculator from "./pages/FDCalculator";
import HomeEMICalculator from "./pages/HomeEMICalculator";
import LumpsumCalculator from "./pages/LumpsumCalculator";
import ITRCalculator from "./pages/ITRCalculator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllCalculator />} />
        <Route path="/gst-calc" element={<GSTCalculator />} />
        <Route path="/itr-calc" element={<ITRCalculator />} />
        <Route path="/epf-calc" element={<EPFCalculator />} />
        <Route path="/nps-calc" element={<NPSCalculator />} />
        <Route path="/hra-calc" element={<HRACalculator />} />
        <Route path="/sip-calc" element={<SIPCalculator />} />
        <Route path="/gratuity-calc" element={<GratuityCalculator />} />
        <Route path="/retirement-calc" element={<RetirementCalculator />} />
        <Route path="/rd-calc" element={<RDCalculator />} />
        <Route path="/simple-calc" element={<SimpleInterestCalculator />} />
        <Route path="/tds-calc" element={<TDSCalculator />} />
        <Route path="/ppf-calc" element={<PPFCalculator />} />
        <Route path="/mutual-calc" element={<MutualFundCalculator />} />
        <Route path="/emi-calc" element={<EMICalculator />} />
        <Route path="/fd-calc" element={<FDCalculator />} />
        <Route path="/homeEmi-calc" element={<HomeEMICalculator />} />
        <Route path="/lumsum-calc" element={<LumpsumCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
