import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency

import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "../component/Header";
import npslogo from "../assets/BG IMAGES/nps.png";
import benifite from "../assets/BG IMAGES/2 png .png"
import howuse from "../assets/BG IMAGES/how2.png"
// import { AlertCircle, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
function NPSCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState(10);

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [totalCorpus, setTotalCorpus] = useState(0);
  const [lumpSumWithdrawal, setLumpSumWithdrawal] = useState(0);
  const [annuityAmount, setAnnuityAmount] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(0);
  const [error, setError] = useState({
    currentAge: "",
    monthlyContribution: "",
    expectedAnnualReturn: "",
  }); // Add error message state

  const fixedRetirementAge = 60;
  const fixedAnnuityPurchasePercentage = 40; // Minimum 40% as per NPS rules
  const fixedExpectedAnnuityReturn = 6;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (validateInputs()) {
        calculateNPS();
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [currentAge, monthlyContribution, expectedAnnualReturn]);

  /**
   * Validates all input fields and sets an error message if any validation fails.
   * @returns {boolean} True if all inputs are valid, false otherwise.
   */

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      currentAge: "",
      monthlyContribution: "",
      expectedAnnualReturn: "",
    };

    if (currentAge < 18 || currentAge >= fixedRetirementAge) {
      newErrors.currentAge = "Age must be between 18 and 59";
      valid = false;
    }

    if (monthlyContribution <= 0 || monthlyContribution >= 1000000000) {
      newErrors.monthlyContribution = "Value must be between 1 and 10000000";
      valid = false;
    }

    if (expectedAnnualReturn <= 0 || expectedAnnualReturn > 20) {
      newErrors.expectedAnnualReturn =
        "Expected return must be between 0.1% and 20%";
      valid = false;
    }

    setError(newErrors);
    return valid;
  };
  const calculateNPS = () => {
    const age = parseFloat(currentAge);
    const contribution = parseFloat(monthlyContribution);
    const annualReturn = parseFloat(expectedAnnualReturn);

    const investmentDurationYears = fixedRetirementAge - age;
    const totalMonths = investmentDurationYears * 12;

    const calculatedTotalInvestment = contribution * totalMonths;

    const monthlyRate = annualReturn / 100 / 12;

    let calculatedCorpus = 0;
    if (monthlyRate === 0) {
      calculatedCorpus = calculatedTotalInvestment;
    } else {
      calculatedCorpus =
        contribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const calculatedInterestEarned =
      calculatedCorpus - calculatedTotalInvestment;

    const calculatedAnnuityAmount =
      calculatedCorpus * (fixedAnnuityPurchasePercentage / 100);
    const calculatedLumpSum = calculatedCorpus - calculatedAnnuityAmount;

    const calculatedMonthlyPension =
      (calculatedAnnuityAmount * (fixedExpectedAnnuityReturn / 100)) / 12;

    setTotalInvestment(parseFloat(calculatedTotalInvestment.toFixed(2)));
    setInterestEarned(parseFloat(calculatedInterestEarned.toFixed(2)));
    setTotalCorpus(parseFloat(calculatedCorpus.toFixed(2)));
    setLumpSumWithdrawal(parseFloat(calculatedLumpSum.toFixed(2)));
    setAnnuityAmount(parseFloat(calculatedAnnuityAmount.toFixed(2)));
    setMonthlyPension(parseFloat(calculatedMonthlyPension.toFixed(2)));
  };

  const handlemonthlyBasicDAChange = (e) => {
    const value = e.target.value;
    // Keeping your character limit validation
    if (value <= 1000000000) {
      setMonthlyContribution(value);
      setError((prev) => ({ ...prev, monthlyContribution: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        monthlyContribution: "Value must be between 1 and 10000000",
      }));
    }
  };

  const handleCurrentAge = (e) => {
    const value = e.target.value;
    if (value <= 59) {
      setCurrentAge(value);
      setError((prev) => ({ ...prev, currentAge: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        currentAge: "Value must be between 18 and 59",
      }));
    }
  };

  const handleAnnualSalaryPercent = (e) => {
    const value = e.target.value;
    if (value <= 20) {
      setExpectedAnnualReturn(value);
      setError((prev) => ({ ...prev, expectedAnnualReturn: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        expectedAnnualReturn:
          "Expected annual increase must be between 0% and 20%",
      }));
    }
  };
  const [openFAQ, setOpenFAQ] = useState(null); // null means no FAQ is open initially

  // Function to toggle the FAQ visibility
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the minimum contribution for NPS?",
      a: "For a Tier-I account, the minimum contribution is currently ₹500 for initial contribution and ₹1000 annually.",
    },
    {
      q: "Can I change my asset allocation in NPS?",
      a: "Yes, you can change your asset allocation (Active Choice) or switch between Active and Auto Choice once a year.",
    },
    {
      q: "Is NPS better than EPF/PPF?",
      a: "NPS, EPF, and PPF serve different purposes and have distinct features. NPS is market-linked with potential for higher returns and offers unique tax benefits. EPF is mandatory for salaried employees with fixed contributions, while PPF is a fixed-income, long-term savings scheme. The 'best' depends on your financial goals, risk appetite, and employment status. It's often recommended to diversify across these instruments.",
    },
    {
      q: "What happens if I don't buy an annuity at retirement?",
      a: "As per NPS rules, a minimum of 40% of your corpus must be used to purchase an annuity if your total corpus exceeds ₹5 lakh at retirement age (60). If the corpus is less than or equal to ₹5 lakh, you can withdraw the entire amount.",
    },
  ];

  return (
    <><Header/>
    <section className="container-div mt-14">
      <div className="second-container">
        <div className="">
          <section className="mb-14">
            <h1 className="text-4xl font-medium text-textColor mb-5 ">
              NPS Calculator
            </h1>
            {/* <p className="mb-8">
            The National Pension System (NPS) is a voluntary, long-term
            investment product introduced by the Government of India to provide
            retirement security for its citizens. Regulated by the Pension Fund
            Regulatory and Development Authority (PFRDA), NPS is a market-linked
            product that aims to build a substantial retirement corpus through
            systematic savings over your working life. It's suitable for boths
            salaried and self-employed individuals looking for a disciplined
            approach to long-term wealth creation
          </p> */}
          </section>
          <div className=" grid-layout">
            {/* <div className="flex-grow grid grid-cols-1 2sm:grid-cols-2 2sm:px-2 px-4 2sm:space-x-3 py-4 overflow-y-auto"> */}

            <div className="">
              {/* Input: Current Age */}
              <div className="mb-6">
                <label
                  htmlFor="currentAge"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Current Age (Years)
                </label>
                <div
                  className={`flex items-center border rounded-xl  px-3 py-3 ${
                    error.currentAge
                      ? "border-red-500 shadow-red-300"
                      : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                  }`}
                >
                  <input
                    type="number"
                    id="currentAge"
                    className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                    value={currentAge}
                    onChange={handleCurrentAge}
                    min="18"
                    max={fixedRetirementAge - 1}
                    aria-label="Current Age"
                  />
                </div>
                {error.currentAge && (
                  <p className="error-text">{error.currentAge}</p>
                )}
              </div>
              {/* Input: Monthly Contribution */}
              <div className="mb-6">
                <label
                  htmlFor="monthlyContribution"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Monthly Contribution (₹)
                </label>
                <div
                  className={`flex items-center border rounded-xl  px-3 py-3  ${
                    error.monthlyContribution
                      ? "border-red-500 shadow-red-300"
                      : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                  }`}
                >
                  <label className="size-5 text-md font-normal text-gray-500">
                    ₹
                  </label>
                  <input
                    type="number"
                    id="monthlyContribution"
                    className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                    value={monthlyContribution}
                    onChange={handlemonthlyBasicDAChange}
                    min="1"
                    placeholder="e.g., 5000"
                    aria-label="Monthly Contribution"
                  />
                </div>
                {error.monthlyContribution && (
                  <p className="error-text">{error.monthlyContribution}</p>
                )}
              </div>

              {/* Input: Expected Annual Return */}
              <div className="mb-6">
                <label
                  htmlFor="expectedAnnualReturn"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Expected Annual Return (%)
                </label>
                <div
                  className={`flex items-center border rounded-xl  px-3 py-3  ${
                    error.expectedAnnualReturn
                      ? "border-red-500 shadow-red-300"
                      : "border-gray-200 focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                  }`}
                >
                  <input
                    type="number"
                    id="expectedAnnualReturn"
                    className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                    value={expectedAnnualReturn}
                    onChange={handleAnnualSalaryPercent}
                    step="0.1"
                    min="0.1"
                    max="20"
                    placeholder="e.g., 10"
                    aria-label="Expected Annual Return"
                  />
                </div>
                {error.expectedAnnualReturn && (
                  <p className="error-text">{error.expectedAnnualReturn}</p>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="p-12 bg-white  w-full sm:p-6 xs:p-2 rounded-tr-lg  rounded-br-lg rounded-bl-lg shadow-shadowsmall">
              <div className="mt-5">
                <div className="space-y-4">
                  {/* Output: Total Investment */}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className=" text-gray-900">Total Investment:</span>
                    <span className="font-normal text-gray-900">
                      ₹{" "}
                      {totalInvestment.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  {/* Output: Interest Earned */}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className=" text-gray-900">Interest Earned:</span>
                    <span className="font-normal text-gray-900">
                      ₹{" "}
                      {interestEarned.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  {/* Output: Total Corpus at Maturity (Maturity Amount) */}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className=" text-gray-900">Maturity Amount:</span>
                    <span className="font-normal text-gray-900">
                      ₹{" "}
                      {totalCorpus.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  {/* Output: Lump Sum Withdrawal */}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className=" text-gray-900">
                      Lump Sum Withdrawal (Tax-Free):
                    </span>
                    <span className="font-normal text-gray-900">
                      ₹{" "}
                      {lumpSumWithdrawal.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  {/* Output: Annuity Purchase Amount */}
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className=" text-gray-900">
                      Annuity Purchase Amount:
                    </span>
                    <span className="font-normal text-gray-900">
                      ₹{" "}
                      {annuityAmount.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  {/* Output: Estimated Monthly Pension */}
                </div>

                <div className="flex text-primary text-xl font-normal justify-between items-center mt-20 py-3  border-t-2 border-t-primary ">
                  <span className="">Estimated Monthly Pension:</span>
                  <span className="">
                    ₹{" "}
                    {monthlyPension.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <div className="space-y-14 text-gray-700 text-base leading-relaxed">
              <section className="">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                    <h2 className="text-2xl text-textColor font-semibold  mb-3">
                      What is the National Pension System (NPS)?
                    </h2>
                    <p className="text-gray-700 tracking-wide text-[16px] mb-4 font-[380] ">
                      The <strong className="text-blue-500">National Pension System (NPS)</strong> is a
                      voluntary, long-term investment product introduced by the
                      Government of India to provide retirement security for its
                      citizens. Regulated by the Pension Fund Regulatory and
                      Development Authority (PFRDA), NPS is a market-linked
                      product that aims to build a substantial retirement corpus
                      through systematic savings over your working life. It's
                      suitable for both salaried and self-employed individuals
                      looking for a disciplined approach to long-term wealth
                      creation.
                    </p>
                  </div>
                  {/* Replaced gstlogo with a placeholder or removed if no equivalent image needed for NPS intro */}
                 <div className="flex justify-center items-center  max-h-[350px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300">
                                
                                  <img
                                    src={npslogo}
                                    alt="EPF - Retirement Savings and Security"
                                    className="w-full h-auto max-h-[350px] xl:max-h-[300px] object-contain"
                                  />
                                </div>
                </div>
              </section>

              {/* Key Benefits of Investing in NPS - Styled like GST's Types section without the grid for text/image */}
              <section className="">
                <h2 className="text-2xl text-textColor font-semibold mb-3">
                  Key Benefits of Investing in NPS
                </h2>
                <p className="text-gray-600 tracking-wide text-[16px] mb-4 font-[380] ">
                  NPS offers several compelling advantages, making it a robust
                  choice for your retirement planning:
                </p>
                <div className="space-y-4">
                  <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                    <h3 className="text-gray-700 tracking-wide text-base  font-[380] leading-relaxed mb-2">
                      Significant Tax Benefits
                    </h3>
                    <ul className="list-disc list-inside ml-4 ">
                      <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                        Contributions are eligible for deduction under{" "}
                        <strong>Section 80C</strong> (up to ₹1.5 lakh) and an
                        additional deduction under{" "}
                        <strong>Section 80CCD(1B)</strong> (up to ₹50,000) for
                        Tier-I accounts.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                        Employer's contribution (up to 10% of basic salary + DA)
                        is tax-deductible under{" "}
                        <strong>Section 80CCD(2)</strong> (for salaried
                        employees).
                      </li>
                      <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                        The maturity amount and lump-sum withdrawal are largely
                        tax-exempt, offering a triple tax benefit (EEE - Exempt,
                        Exempt, Exempt) status under certain conditions.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                    <h3 className="text-gray-600 tracking-wide text-base  font-[380] mb-2">
                      Long-Term Wealth Creation
                    </h3>
                    <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                      As a market-linked product, NPS offers the potential for
                      higher returns compared to traditional fixed-income
                      instruments, leveraging the power of compounding over
                      several decades.
                    </p>
                  </div>
                  <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                    <h3 className="text-gray-600 tracking-wide text-base mb-2 font-[380]">
                      Flexibility & Choice
                    </h3>
                    <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                      You can choose your asset allocation (equity, corporate
                      debt, government securities) and select between "Active
                      Choice" (you decide allocation) or "Auto Choice"
                      (age-based dynamic allocation).
                    </p>
                  </div>
                  <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                    <h3 className="text-gray-600 tracking-wide text-base font-[380] mb-2">Portability</h3>
                    <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                      NPS is entirely portable across jobs and locations,
                      meaning your account remains the same regardless of your
                      employment changes.
                    </p>
                  </div>
                  <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                    <h3 className="ftext-gray-600 tracking-wide text-[14px] mb-2 font-[380]">Low Cost</h3>
                    <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                      NPS is known for its low fund management charges, which
                      ensures a larger portion of your contributions goes
                      towards investment growth.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Use the UniCX Free Online NPS Calculator - Styled like GST's How-To section with image */}
              <section className="">
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  How to Use the UniCX Free Online NPS Calculator
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                  <div className="">
                    <p className="text-gray-600 tracking-wide text-[16px] font-[380] mb-4">
                      Our <strong className="text-blue-500">UniCX NPS Calculator</strong> makes projecting
                      your retirement savings simple. Just follow these steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 mt-2 ">
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Current Age (Years):</strong> Enter your current
                        age. This helps determine your remaining investment
                        period.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Monthly Contribution (₹):</strong> Input the
                        amount you plan to contribute to NPS each month.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Expected Annual Return (%):</strong> Provide
                        your estimated annual return percentage. NPS investments
                        are market-linked, so this is an estimate. (Typical
                        range might be 8-12% but is subject to market
                        conditions).
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Retirement Age:</strong> The calculator uses the
                        standard retirement age of 60 years.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>% of Corpus for Annuity:</strong> The calculator
                        assumes 40% of your maturity amount will be used to
                        purchase an annuity, as per NPS rules.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Expected Annuity Return:</strong> Enter the
                        expected interest rate you anticipate from your annuity
                        plan.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>View Your Results:</strong> The calculator will
                        instantly display your projected total investment,
                        interest earned, maturity amount, tax-free lump sum,
                        annuity purchase amount, and estimated monthly pension.
                      </li>
                    </ol>
                  </div>
                  {/* Replaced calculator image with placeholder */}
                <div className="flex justify-center items-center   max-h-[399px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300  ">
                                      <img
                                        src={howuse}
                                        alt="Abstract minimalist graphic representing interconnectedness of GST types"
                                        className="w-full max-w-lg object-contain h-auto max-h-[400px] xl:max-h-[400px] "
                                      />
                                    </div>
                </div>
              </section>

              {/* Understanding Your NPS Calculator Results - Styled like GST's Example Box (but for explanation) */}
              <section className="">
                <h2 className="text-2xl text-textColor font-semibold mb-3">
                  Understanding Your NPS Calculator Results
                </h2>
                <p className="text-gray-600 tracking-wide text-[16px] font-[380] ">
                  Once you input your details, our calculator provides a
                  comprehensive breakdown of your potential NPS returns:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-3 mt-4 ">
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Total Investment:</strong> This is the cumulative
                    sum of all your monthly contributions until retirement.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Interest Earned:</strong> This shows the total
                    interest or capital appreciation your investment is
                    estimated to generate over the years, thanks to compounding.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Maturity Amount:</strong> This is your total
                    accumulated corpus at retirement (Current EPF Balance +
                    Total Contributions + Total Interest Earned).
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Lump Sum Withdrawal (Tax-Free):</strong> As per
                    current NPS rules, up to 60% of your maturity corpus can be
                    withdrawn as a tax-free lump sum at retirement.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Annuity Purchase Amount:</strong> The remaining 40%
                    (or more, if you choose) of your corpus must be used to
                    purchase an annuity. This amount is used by the annuity
                    provider to give you a regular pension.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Estimated Monthly Pension:</strong> This is the
                    projected monthly income you would receive from the annuity
                    purchased with the mandatory portion of your corpus.
                  </li>
                </ul>

                {/* Removed GST-specific example box and formulas, if you want a numerical example for NPS, add it here */}
                <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
                  <p className="font-medium text-textColor mb-2">
                    🧮 <strong>NPS Calculation Example:</strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Current Age: <strong>30 years</strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Monthly Contribution: <strong>₹5,000</strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Expected Annual Return: <strong>10%</strong>
                  </p>
                  <p className="text-blue-600 font-bold text-lg mt-2">
                    Estimated Maturity at 60: <strong>₹1,13,96,627</strong>{" "}
                    (approx.)
                  </p>
                  <p className="text-blue-600 font-bold text-lg">
                    Estimated Monthly Pension: <strong>₹22,793</strong>{" "}
                    (approx.)
                  </p>
                </div>
              </section>

              {/* Important NPS Rules & Considerations - Styled like a general section */}
              <section className="">
                <h2 className="text-2xl text-textColor font-semibold mb-3">
                  Important NPS Rules & Considerations
                </h2>
                <ul className="list-disc list-inside space-y-3  ">
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Eligibility:</strong> Any Indian citizen, resident
                    or non-resident, between 18 and 70 years of age can open an
                    NPS account.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Minimum Contributions:</strong> There are minimum
                    annual contribution requirements (currently ₹1,000 for Tier
                    I).
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[350]">
                    <strong>Tier I vs. Tier II Accounts:</strong>
                    <ul className="list-disc list-inside ml-4">
                      <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                        <strong>Tier I:</strong> This is your primary retirement
                        account, with tax benefits and withdrawal restrictions.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                        <strong>Tier II:</strong> A voluntary savings account,
                        offering greater flexibility for withdrawals but without
                        direct tax benefits on contributions.
                      </li>
                    </ul>
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Partial Withdrawals:</strong> Limited partial
                    withdrawals (up to 25% of your own contributions) are
                    allowed from Tier I accounts for specific purposes (e.g.,
                    higher education, marriage, house purchase, critical
                    illness) after 3 years of opening the account, with a
                    maximum of three withdrawals over the entire tenure.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Mandatory Annuity:</strong> At least 40% of your
                    accumulated corpus must be utilized to purchase an annuity
                    plan from an Annuity Service Provider (ASP) upon attaining
                    60 years of age.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Taxation of Annuity:</strong> The monthly pension
                    received from the annuity is taxable as per your income tax
                    slab in the year of receipt.
                  </li>
                </ul>
              </section>

              {/* Who Can Benefit from the UniCX GST Calculator? -> Who Can Benefit from NPS Calculator? */}
              <section className="">
                <h2 className="text-2xl text-textColor font-semibold mb-3">
                  Who Can Benefit from the UniCX NPS Calculator?
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                <p className="text-gray-600 tracking-wide text-[16px] font-[380] mb-4">
                  Our <strong className="text-blue-500">NPS calculator</strong> is a versatile tool
                  designed to assist a wide range of users in accurately
                  managing their NPS-related projections:
                </p>
                 
                       <ul className="list-disc list-inside space-y-3 ">
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Individuals planning for retirement:</strong> To
                    estimate their retirement corpus and pension.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Salaried employees:</strong> To understand how NPS
                    can complement their EPF/PF savings.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Self-employed professionals:</strong> To build a
                    disciplined retirement fund with tax advantages.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Financial advisors:</strong> As a quick tool to
                    demonstrate NPS benefits to clients.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>
                      Anyone interested in long-term wealth creation:
                    </strong>{" "}
                    To visualize the power of compounding with NPS.
                  </li>
                </ul>
                  </div>
                   <div className="flex justify-center items-center cursor-pointer hover:scale-102 transition-transform duration-300">
                                  
                                    <img
                                      src={benifite}
                                      alt="Who can use EPF Calculator - Target audience icon"
                                      className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                                    />
                                  </div>
                 </div>
             
              </section>

              {/* Advantages of GST Calculator -> Advantages of NPS Calculator */}
              <section className="">
                <h2 className="text-2xl text-textColor font-semibold mb-3">
                  Advantages of Using the UniCX NPS Calculator
                </h2>
                <p className="mb-3 text-gray-600 tracking-wide text-[16px] font-[380]">
                  Leveraging our <strong>free online NPS calculator</strong>{" "}
                  offers significant benefits for individuals planning their
                  retirement:
                </p>
                <ul className="list-disc list-inside space-y-3 ">
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Clarity on Retirement Corpus:</strong> Get a clear
                    projection of your accumulated wealth at retirement.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Estimate Monthly Pension:</strong> Understand the
                    potential regular income you could receive post-retirement.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Visualize Growth:</strong> See how compounding works
                    over decades to build a substantial fund.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Aids Financial Planning:</strong> Helps in setting
                    realistic retirement goals and adjusting contributions
                    accordingly.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Understand Annuity Impact:</strong> Provides insight
                    into how the mandatory annuity purchase affects your lump
                    sum and pension.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>User-Friendly Interface:</strong> Designed for ease
                    of use, making complex retirement projections simple and
                    accessible.
                  </li>
                </ul>
              </section>

              {/* Tip box - Adapted for NPS */}
              <section className="">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
                  <p className="tracking-wide text-[14px] font-[380] text-yellow-700 ">
                    <strong>UniCX Tip:</strong> Start investing in NPS early to
                    maximize the benefits of compounding. Even small monthly
                    contributions over a long period can lead to a substantial
                    retirement corpus. Explore both Active and Auto Choice
                    options based on your risk appetite!
                  </p>
                </div>
              </section>

              {/* UniCX Expert Support & Resources - Adapted for NPS */}
              <section id="contact" className="">
                <h2 className="text-2xl text-textColor font-semibold mb-3">
                  Beyond Calculations: UniCX - Your Partner in Retirement
                  Planning & Financial Growth
                </h2>
                <p className="text-gray-600 tracking-wide text-[16px] font-[380]">
                  At{" "}
                  <strong>UniconsultX Solutions Private Limited (UniCX)</strong>
                  , our commitment extends beyond providing a powerful NPS
                  calculator. We understand that{" "}
                  <strong className="text-blue-500">retirement planning is a long-term journey</strong>,
                  and navigating its complexities requires comprehensive
                  support. That's why we offer{" "}
                  <strong>comprehensive support and resources</strong> to ensure
                  your financial future is secure.
                </p>
                <h3 className="text-gray-600 tracking-wide text-[16px] font-[400] mt-4 mb-2">
                  Our Expert Financial Services Include:
                </h3>
                <ul className="list-disc list-inside space-y-3 ">
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong>Retirement Planning Guidance:</strong> Personalized
                    strategies to help you achieve your retirement goals.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>Investment Advisory:</strong> Expert advice on
                    various investment avenues, including NPS, mutual funds,
                    etc.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>Tax Planning:</strong> Strategies to optimize your
                    tax savings through instruments like NPS, ELSS, etc.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>Annuity Selection Assistance:</strong> Guidance on
                    choosing the right annuity plan for your post-retirement
                    needs.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>Wealth Management:</strong> Holistic financial
                    planning to grow and protect your wealth.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>Educational Resources:</strong> Access to
                    informative articles, FAQs, and timely updates on retirement
                    planning and investment strategies.
                  </li>
                </ul>
                <p className="mt-4 text-gray-600 tracking-wide text-[15px] font-[380]">
                  <strong>Secure Your Future with UniCX:</strong> We are
                  dedicated to being your reliable source for all things
                  retirement planning. Explore our website for more in-depth
                  articles, common FAQs, and the latest updates. Partner with
                  UniCX for peace of mind in your financial journey.
                </p>
                <div className="mt-6 text-center">
                  <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    Get Expert Retirement Consultation
                  </button>
                </div>
              </section>

              {/* FAQs - Now with interactive toggle functionality */}
              <section className="">
                <h2 className="text-2xl text-textColor font-medium mb-3">
                  Frequently Asked Questions (FAQs) about NPS
                </h2>
                <div className="">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === i ? "bg-blue-50 rounded-lg" : ""
                      }`}
                      onClick={() => toggleFAQ(i)}
                    >
                      <div
                        className={`flex justify-between items-center px-3 ${
                          openFAQ !== i
                            ? "border border-gray-300 rounded-lg py-3"
                            : ""
                        }`}
                      >
                        <p className="text-gray-600 tracking-wide text-[16px] font-[400]">{faq.q}</p>
                        {openFAQ === i ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <p
                        className={`text-gray-600 tracking-wide text-[14px] font-[380] px-3 ${
                          openFAQ === i
                            ? "max-h-[500px] opacity-100 py-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer note - Adapted for NPS */}
              <section className="pt-4 border-t mt-6">
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  This NPS calculator and information is developed and
                  maintained by{" "}
                  <strong>UniCX (UniconsultX Solutions Private Limited)</strong>{" "}
                  to help users simplify National Pension System projections as
                  per current Indian regulations. For complex financial
                  situations or personalized advice, always consult with a
                  qualified financial professional or{" "}
                  <a href="#contact" className="text-blue-600 hover:underline">
                    contact UniCX directly
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default NPSCalculator;
