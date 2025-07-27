import React, { useState, useEffect } from "react"; // Assuming React is imported
import { FaRupeeSign, FaBirthdayCake } from "react-icons/fa"; // Assuming these are installed
import { RiPercentFill } from "react-icons/ri"; // Assuming this is installed
import {
  Landmark,
  Briefcase,
  TrendingUp,
  Calculator,
  BellRing,
  CheckCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import "../css/Epf.css";
import Header from "../component/Header";
import epfcalc from "../assets/epf2.png"
function EPFCalculator() {
  const [monthlyBasicDA, setMonthlyBasicDA] = useState("25000");
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("58");
  const [employeeContributionPercent, setEmployeeContributionPercent] =
    useState("12");
  const [annualSalaryIncreasePercent, setAnnualSalaryIncreasePercent] =
    useState("5");
  const [currentEPFBalance, setCurrentEPFBalance] = useState("0");
  const [annualInterestRate, setAnnualInterestRate] = useState("8.25");

  const [estimatedCorpus, setEstimatedCorpus] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState(0);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handler = setTimeout(() => {
      calculatePF();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [
    monthlyBasicDA,
    currentAge,
    retirementAge,
    employeeContributionPercent,
    annualSalaryIncreasePercent,
    currentEPFBalance,
    annualInterestRate,
  ]);

  /**
   * Validates all input fields and sets specific error messages if any validation fails.
   * @returns {boolean} True if all inputs are valid, false otherwise.
   */
  const validateInputs = () => {
    let currentErrors = {};
    let isValid = true;

    const basicDA = parseFloat(monthlyBasicDA);
    const cAge = parseFloat(currentAge);
    const rAge = parseFloat(retirementAge);
    const empCont = parseFloat(employeeContributionPercent);
    const annualInc = parseFloat(annualSalaryIncreasePercent);
    const epfBalance = parseFloat(currentEPFBalance);
    const interestRate = parseFloat(annualInterestRate);

    // Validate Monthly Basic Salary + DA
    if (isNaN(basicDA) || basicDA <= 0 || basicDA > 1000000000) {
      currentErrors.monthlyBasicDA =
        "Monthly Basic Salary + DA must be between ₹1 and ₹1,00,00,000.";
      isValid = false;
    }

    // Validate Current Age
    if (isNaN(cAge) || cAge < 18 || cAge >= rAge || cAge > 59) {
      currentErrors.currentAge =
        "Current Age must be between 18 and 59 years and less than Retirement Age.";
      isValid = false;
    }

    // Validate Retirement Age
    if (isNaN(rAge) || rAge <= cAge || rAge > 70) {
      currentErrors.retirementAge =
        "Retirement Age must be greater than Current Age and up to 70 years.";
      isValid = false;
    }

    // Validate Employee Contribution Percent
    if (isNaN(empCont) || empCont < 12 || empCont > 100) {
      currentErrors.employeeContributionPercent =
        "Your Contribution must be between 12% and 100%.";
      isValid = false;
    }

    // Validate Annual Salary Increase Percent
    if (isNaN(annualInc) || annualInc < 0 || annualInc > 20) {
      currentErrors.annualSalaryIncreasePercent =
        "Expected Annual Salary Increase must be between 0% and 20%.";
      isValid = false;
    }

    // Validate Current EPF Balance
    if (isNaN(epfBalance) || epfBalance < 0 || epfBalance > 100000000) {
      currentErrors.currentEPFBalance =
        "Current EPF Balance must be between ₹0 and ₹10,00,00,000.";
      isValid = false;
    }

    // Validate Annual Interest Rate
    if (isNaN(interestRate) || interestRate <= 0 || interestRate > 15) {
      currentErrors.annualInterestRate =
        "Interest Rate must be between 0.1% and 15%.";
      isValid = false;
    }

    setErrors(currentErrors); // Update the errors state with all collected errors

    if (!isValid) {
      // Reset results on validation failure
      setEstimatedCorpus(0);
      setTotalContributions(0);
      setTotalInterestEarned(0);
    }
    return isValid;
  };

  /**
   * Calculates the estimated EPF corpus, total contributions, and total interest earned.
   */
  const calculatePF = () => {
    // Only proceed with calculation if inputs are valid
    if (!validateInputs()) {
      return;
    }

    let currentCorpus = parseFloat(currentEPFBalance);
    let totalEmployeeContributions = 0;
    let totalEmployerContributions = 0;
    let totalInterest = 0;

    const monthsToRetirement =
      (parseFloat(retirementAge) - parseFloat(currentAge)) * 12;
    let currentMonthlyBasicDA = parseFloat(monthlyBasicDA);
    const monthlyInterestRate = parseFloat(annualInterestRate) / 100 / 12;

    // Loop through each month until retirement
    for (let month = 0; month < monthsToRetirement; month++) {
      // Annual salary increase logic
      if (month > 0 && month % 12 === 0) {
        currentMonthlyBasicDA *=
          1 + parseFloat(annualSalaryIncreasePercent) / 100;
      }

      // Calculate employee's monthly EPF contribution
      const employeeMonthlyEPF =
        currentMonthlyBasicDA * (parseFloat(employeeContributionPercent) / 100);

      // Calculate employer's raw contribution (12% of Basic + DA)
      const employerRawContribution = currentMonthlyBasicDA * 0.12;

      // Calculate EPS contribution (capped at 1250 if Basic+DA * 8.33% is higher)
      const epsContribution = Math.min(currentMonthlyBasicDA * 0.0833, 1250);

      // Calculate employer's EPF contribution (total employer contribution minus EPS)
      const employerMonthlyEPF = employerRawContribution - epsContribution;

      // Total monthly deposit into EPF
      const totalMonthlyDeposit = employeeMonthlyEPF + employerMonthlyEPF;

      // Accumulate total contributions
      totalEmployeeContributions += employeeMonthlyEPF;
      totalEmployerContributions += employerMonthlyEPF;

      // Calculate interest for the current month on the accumulated corpus + new deposit
      const monthlyInterestEarned =
        (currentCorpus + totalMonthlyDeposit) * monthlyInterestRate;

      // Update current corpus and total interest
      currentCorpus += totalMonthlyDeposit + monthlyInterestEarned;
      totalInterest += monthlyInterestEarned;
    }

    // Set the calculated results to state variables
    setEstimatedCorpus(currentCorpus);
    // Total contributions include initial balance + employee contributions + employer EPF contributions
    setTotalContributions(
      totalEmployeeContributions +
        totalEmployerContributions +
        parseFloat(currentEPFBalance)
    );
    setTotalInterestEarned(totalInterest);
  };

  const handleMonthlyBasicDAChange = (e) => {
    const value = e.target.value;
    // Allow empty string or numbers only
    if (value <= 1000000000) {
      setMonthlyBasicDA(value);
      // Clear error as user is typing a valid number
      setErrors((prev) => ({ ...prev, monthlyBasicDA: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        monthlyBasicDA:
          "Monthly Basic Salary + DA must be between ₹1 and ₹1,00,00,000.",
      }));
    }
  };

  const handleCurrentAgeChange = (e) => {
    const value = e.target.value;
    if (value <= 59) {
      setCurrentAge(value);
      setErrors((prev) => ({ ...prev, currentAge: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        currentAge:
          "Current Age must be between 18 and 59 years and less than Retirement Age.",
      }));
    }
  };

  const handleRetirementAgeChange = (e) => {
    const value = e.target.value;
    if (value <= 70) {
      setRetirementAge(value);
      setErrors((prev) => ({ ...prev, retirementAge: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        retirementAge:
          "Retirement Age must be greater than Current Age and up to 70 years.",
      }));
    }
  };

  const [openFAQ, setOpenFAQ] = React.useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // EPF FAQs data (similar structure to your GST FAQs)
  const epfFaqs = [
    {
      q: "Q1: Is EPF contribution mandatory?",
      a: "A1: Yes, if your basic salary plus dearness allowance is below ₹15,000 per month, EPF contribution is mandatory. For those above ₹15,000, it's optional, though most employers continue to deduct it.",
    },
    {
      q: "Q2: What is the current EPF interest rate?",
      a: "A2: The EPF interest rate is declared annually by the Employees' Provident Fund Organisation (EPFO). Please refer to the official EPFO website for the latest and most accurate rate.",
    },
    {
      q: "Q3: Can I withdraw my entire EPF balance before retirement?",
      a: "A3: Full withdrawal of the EPF balance is generally allowed upon retirement (after 55 years of age) or in case of permanent disability. Partial withdrawals are permitted only under specific, predefined circumstances like house purchase, medical emergencies, or children's education/marriage.",
    },
    {
      q: "Q4: How important is my Universal Account Number (UAN) for EPF?",
      a: "A4: Your Universal Account Number (UAN) is crucial as it links all your EPF accounts from different employers. It simplifies the process of checking balances, applying for withdrawals, and transferring funds without needing employer intervention for each step.",
    },
    {
      q: "Q5: Is interest earned on EPF taxable?",
      a: "A5: Interest earned on EPF is tax-exempt if contributions are made for at least 5 continuous years. However, for contributions made on or after April 1, 2021, interest on employee contributions exceeding ₹2.5 lakh (or ₹5 lakh for government employees) in a financial year may be taxable.",
    },
  ];

  const handleEmployeeContributionPercentChange = (e) => {
    const value = e.target.value;
    if (value <= 100) {
      setEmployeeContributionPercent(value);
      setErrors((prev) => ({ ...prev, employeeContributionPercent: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        employeeContributionPercent:
          "Your Contribution must be between 12% and 100%.",
      }));
    }
  };

  const handleAnnualSalaryIncreasePercentChange = (e) => {
    const value = e.target.value;
    if (value <= 20) {
      setAnnualSalaryIncreasePercent(value);
      setErrors((prev) => ({ ...prev, annualSalaryIncreasePercent: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        annualSalaryIncreasePercent:
          "Expected Annual Salary Increase must be between 0% and 20%.",
      }));
    }
  };

  const handleCurrentEPFBalanceChange = (e) => {
    const value = e.target.value;
    if (value <= 1000000000) {
      setCurrentEPFBalance(value);
      setErrors((prev) => ({ ...prev, currentEPFBalance: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        currentEPFBalance:
          "Current EPF Balance must be between ₹0 and ₹10,00,00,000.",
      }));
    }
  };

  return (
    <>
    <Header/>
    <section className="container-div mt-14">
      <div className=" second-container">
        <div className="border-4">
        <section className="mb-14">
          <h1 className="text-4xl font-medium text-textColor mb-5">EPF Calculator</h1>
          {/* <p className="mb-8 ">
            The <strong>EPF Calculator</strong> by <strong>UniCX</strong> helps
            employees in India estimate their total Provident Fund (PF) savings.
            It simplifies retirement planning by combining employer/employee
            contributions and applicable interest into one projection.
          </p> */}
        </section>

        <div className=" grid-layout ">
          <div className="">
          
            <div className="mb-6 mt-[-5px]">
              <label htmlFor="monthlyBasicDA" className="block text-gray-600 font-medium mb-2">
                Monthly Basic Salary + DA (₹)
              </label>
              <div
                className={` flex items-center border rounded-xl  px-3 py-3 ${
                  errors.monthlyBasicDA
                    ? "border-red-400 shadow-sm"
                    : " focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="monthlyBasicDA"
                  inputMode="numeric"
                  value={monthlyBasicDA}
                  onChange={handleMonthlyBasicDAChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="e.g., 25000"
                  min="0"
                  aria-invalid={errors.monthlyBasicDA ? "true" : "false"}
                  aria-describedby="monthlyBasicDA-error"
                />
              </div>
              {errors.monthlyBasicDA && (
                <p
                  id="monthlyBasicDA-error"
                  className="error-text "
                  aria-live="polite"
                >
                  {errors.monthlyBasicDA}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="currentAge" className="block text-gray-600 font-medium mb-2">
                Current Age (Years)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 ${
                  errors.currentAge
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300  focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <FaBirthdayCake className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="currentAge"
                  inputMode="numeric"
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="e.g., 30"
                  min="18"
                  aria-invalid={errors.currentAge ? "true" : "false"}
                  aria-describedby="currentAge-error"
                />
              </div>
              {errors.currentAge && (
                <p
                  id="currentAge-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.currentAge}
                </p>
              )}
            </div>

            {/* Retirement Age */}
            <div className="mb-6">
              <label htmlFor="retirementAge" className="block text-gray-600 font-medium mb-2">
                Retirement Age (Years)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3  ${
                  errors.retirementAge
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300  focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <FaBirthdayCake className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="retirementAge"
                  inputMode="numeric"
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="e.g., 58"
                  min="0"
                  aria-invalid={errors.retirementAge ? "true" : "false"}
                  aria-describedby="retirementAge-error"
                />
              </div>
              {errors.retirementAge && (
                <p
                  id="retirementAge-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.retirementAge}
                </p>
              )}
            </div>

            {/* Employee Contribution Percent Input */}
            <div className="mb-6">
              <label
                htmlFor="employeeContributionPercent"
                className="block text-gray-600 font-medium mb-2"
              >
                Your Contribution to EPF (%)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 ${
                  errors.employeeContributionPercent
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300  focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <RiPercentFill className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="employeeContributionPercent"
                  inputMode="numeric"
                  value={employeeContributionPercent}
                  onChange={handleEmployeeContributionPercentChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="e.g., 12"
                  min="0"
                  aria-invalid={
                    errors.employeeContributionPercent ? "true" : "false"
                  }
                  aria-describedby="employeeContributionPercent-error"
                />
              </div>
              {errors.employeeContributionPercent && (
                <p
                  id="employeeContributionPercent-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.employeeContributionPercent}
                </p>
              )}
            </div>

            {/* Annual Salary Increase Percent Input */}
            <div className="mb-6">
              <label
                htmlFor="annualSalaryIncreasePercent"
                className="block text-gray-600 font-medium mb-2"
              >
                Expected Annual Salary Increase (%)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 ${
                  errors.annualSalaryIncreasePercent
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300  focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <RiPercentFill className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="annualSalaryIncreasePercent"
                  inputMode="numeric"
                  value={annualSalaryIncreasePercent}
                  onChange={handleAnnualSalaryIncreasePercentChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="e.g., 5"
                  min="0"
                  aria-invalid={
                    errors.annualSalaryIncreasePercent ? "true" : "false"
                  }
                  aria-describedby="annualSalaryIncreasePercent-error"
                />
              </div>
              {errors.annualSalaryIncreasePercent && (
                <p
                  id="annualSalaryIncreasePercent-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.annualSalaryIncreasePercent}
                </p>
              )}
            </div>

            {/* Current EPF Balance Input */}
            <div className="mb-6">
              <label htmlFor="currentEPFBalance" className="block text-gray-600 font-medium mb-2">
                Current EPF Balance (₹)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 ${
                  errors.currentEPFBalance
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300  focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                }`}
              >
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="currentEPFBalance"
                  inputMode="numeric"
                  value={currentEPFBalance}
                  onChange={handleCurrentEPFBalanceChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="e.g., 0"
                  min="0"
                  aria-invalid={errors.currentEPFBalance ? "true" : "false"}
                  aria-describedby="currentEPFBalance-error"
                />
              </div>
              {errors.currentEPFBalance && (
                <p
                  id="currentEPFBalance-error"
                  className="error-text"
                  aria-live="polite"
                >
                  {errors.currentEPFBalance}
                </p>
              )}
            </div>

            {/* Current EPF Interest Rate */}
            <div className="mb-6">
              <label htmlFor="annualInterestRate" className="block text-gray-600 font-medium mb-2">
                Current EPF Interest Rate (%)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 ${
                  // Added bg-gray-50 for read-only feel
                  errors.annualInterestRate
                    ? "border-red-400 shadow-sm"
                    : "border-gray-300 "
                }`}
              >
                <RiPercentFill className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="annualInterestRate"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent" // Added cursor-not-allowed
                  value={annualInterestRate}
                  readOnly
                  min="0"
                  step="0.01"
                  placeholder="e.g., 8.25"
                  aria-label="Annual Interest Rate"
                />
              </div>
              {errors.annualInterestRate && (
                <p className="text-red-500 text-xs mt-1" aria-live="polite">
                  {errors.annualInterestRate}
                </p>
              )}
            </div>
          </div>

          {/* Right - Result Section */}

          <div className="p-12 bg-white h-[23rem] w-full sm:p-6  rounded-tr-lg   rounded-br-lg rounded-bl-lg shadow-shadowsmall">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-900">
                    Your Estimated PF Corpus
                  </span>
                  <span className="font-normal text-gray-900">
                    ₹{" "}
                    {estimatedCorpus.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-900">Total Contributions:</span>
                  <span className="font-normal text-gray-900">
                    ₹{" "}
                    {totalContributions.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>

                <div className=" pt-3 ">
                  <p className="text-sm text-gray-600 font-semibold mb-3">
                    Breakdown
                  </p>

                  <div className="flex text-primary text-xl font-normal justify-between items-center mt-20 py-3  border-t-2 border-t-primary  ">
                    <span className="">
                      Total Interest Earned:
                    </span>
                    <span className="">
                      {" "}
                      ₹
                      {totalInterestEarned.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* What is EPF Section */}
        <div className="mt-24 border-2">
          <div className="space-y-14 text-gray-700 text-base leading-relaxed">
            <section className="">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    What is Employees' Provident Fund (EPF) in India?
                  </h2>
                  <p className="text-md">
                    The <strong>Employees' Provident Fund (EPF)</strong> is a
                    mandatory savings scheme in India, managed by the Employees'
                    Provident Fund Organisation (EPFO). It's designed to provide
                    financial security for employees after retirement, acting as
                    a crucial long-term savings instrument. Both employees and
                    employers contribute a fixed percentage of the employee's
                    basic salary and dearness allowance to the fund each month.
                    These contributions earn interest, accumulating a
                    substantial corpus over an employee's working life.
                  </p>
                </div>
                {/* Image for What is EPF - Concept: Security, Savings, Growth */}
                <div className="flex justify-center items-center  max-h-[350px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300">
                
                  <img
                    src={epfcalc}
                    alt="EPF - Retirement Savings and Security"
                    className="w-full h-auto max-h-[350px] xl:max-h-[300px] object-contain"
                  />
                </div>
              </div>
            </section>

            {/* Key Benefits of EPF Section */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                Key Benefits of EPF for Employees
              </h2>
              <p className="mb-4 text-md">
                EPF offers a multitude of advantages, making it an indispensable
                part of financial planning for salaried individuals:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 flex items-start">
                  <Landmark
                    size={20}
                    className="mr-3 mt-1 text-blue-600 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-normal text-md">
                      Retirement Security
                    </h3>
                    <p className="text-sm text-gray-600">
                      A primary objective is to build a substantial retirement
                      corpus, ensuring financial independence in later years.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 flex items-start">
                  <Briefcase
                    size={20}
                    className="mr-3 mt-1 text-blue-600 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-normal text-md">Tax Benefits</h3>
                    <p className="text-sm text-gray-600">
                      Contributions to EPF are eligible for tax deductions under
                      Section 80C. Interest and withdrawals (under certain
                      conditions) are also tax-exempt, making it an EEE
                      instrument.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 flex items-start">
                  <TrendingUp
                    size={20}
                    className="mr-3 mt-1 text-blue-600 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-normal text-md">
                      Guaranteed Returns
                    </h3>
                    <p className="text-sm text-gray-600">
                      EPF interest rates are declared by the government annually
                      and are generally stable and higher than many other
                      traditional savings instruments.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 flex items-start">
                  <Calculator
                    size={20}
                    className="mr-3 mt-1 text-blue-600 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-normal text-md">
                      Withdrawal Facility
                    </h3>
                    <p className="text-sm text-gray-600">
                      While primarily a retirement fund, partial withdrawals are
                      permitted for specific purposes like house purchase or
                      medical emergencies.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use the UniCX Free Online EPF Calculator */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                How to Use the UniCX Free Online EPF Calculator
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-800 text-[15px] leading-relaxed">
                    Our <strong>UniCX EPF Calculator</strong> simplifies the
                    complex task of estimating your EPF corpus. Here’s a simple
                    guide to using it:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <strong>Enter Your Current Age:</strong> Provide your
                      current age in years.
                    </li>
                    <li>
                      <strong>Enter Your Retirement Age:</strong> Specify the
                      age you plan to retire.
                    </li>
                    <li>
                      <strong>Enter Your Basic Monthly Salary & DA:</strong>{" "}
                      Input your current basic salary plus dearness allowance.
                    </li>
                    <li>
                      <strong>Enter Annual Salary Increment (%):</strong> If you
                      expect an annual increase in your salary, enter the
                      estimated percentage.
                    </li>
                    <li>
                      <strong>Enter EPF Employee Contribution (%):</strong> The
                      mandatory contribution is 12%, but you can voluntarily
                      contribute more.
                    </li>
                    <li>
                      <strong>Enter EPF Employer Contribution (%):</strong> The
                      employer's mandatory contribution is also 12%.
                    </li>
                    <li>
                      <strong>Current EPF Balance (if any):</strong> If you
                      already have an existing EPF balance, enter it.
                    </li>
                    <li>
                      <strong>View Your Results:</strong> Click on "Calculate"
                      to instantly see your estimated total EPF corpus at
                      retirement.
                    </li>
                  </ol>
                </div>
                {/* Image for How to Use EPF Calculator - Concept: Calculator with growth/piggy bank */}
                <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
                  {/* Placeholder for the "How to Use EPF Calculator" image. You'll need to generate and import this image (e.g., epfCalculatorIcon.png) */}
                  {/* <img
                                src={epfCalculatorIcon}
                                alt="How to use UniCX EPF Calculator - Step by step guide"
                                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                            /> */}
                  <img
                    src="Gemini_Generated_Image_ybrwi9ybrwi9ybrw.jpg"
                    alt="How to use UniCX EPF Calculator - Step by step guide"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                  />
                </div>
              </div>
            </section>

            {/* Key Factors Affecting EPF Calculation */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                Key Factors Affecting Your EPF Calculation
              </h2>
              <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
                Understanding these factors can help you better estimate your
                EPF growth:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Contribution Rate:</strong> Both employee and employer
                  contribute 12% of Basic Salary + DA. A higher voluntary
                  contribution from the employee (VPC) will lead to a larger
                  corpus.
                </li>
                <li>
                  <strong>Interest Rate:</strong> The interest rate on EPF is
                  declared annually by the EPFO. It's compounded annually.
                </li>
                <li>
                  <strong>Years of Service:</strong> The longer you contribute,
                  the greater the power of compounding on your savings.
                </li>
                <li>
                  <strong>Salary Growth:</strong> Annual increments
                  significantly boost your future corpus as contributions
                  increase with salary.
                </li>
                <li>
                  <strong>Withdrawals:</strong> Any partial withdrawals before
                  retirement will reduce the final corpus.
                </li>
              </ul>
            </section>

            {/* Important EPF Rules & Recent Updates - Similar to your 'Critical GST Updates' box */}
            <section className="">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-md shadow-sm">
                <h2 className="text-2xl font-bold text-yellow-700 mb-3 flex items-center">
                  <BellRing size={20} className="mr-3 mt-1 flex-shrink-0" />
                  Important EPF Rules & Recent Updates
                </h2>
               
                {/* <img
                  src="Gemini_Generated_Image_ybrwi9ybrwi9ybrw.jpg"
                  alt="Important EPF Rules and Updates"
                  className="w-auto h-16 mx-auto my-4"
                /> */}
                <p className="text-yellow-800 mb-4 text-md leading-relaxed">
                  Stay informed about crucial EPF regulations and recent
                  changes:
                </p>
                <ul className="list-inside space-y-2 text-yellow-700 text-[15px] leading-relaxed">
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Universal Account Number (UAN):
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Essential for all EPF members, UAN links multiple EPF
                      accounts and simplifies online services.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      EPF Interest Payout:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Interest is usually credited monthly but officially
                      declared annually by the EPFO.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Tax on EPF Withdrawals:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      While generally tax-exempt after 5 years of continuous
                      service, certain conditions or early withdrawals might
                      attract tax.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Online Services:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Leverage online facilities for UAN activation, balance
                      check, claims, and transfers.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Who Can Benefit from the UniCX EPF Calculator? */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                Who Can Benefit from the UniCX EPF Calculator?
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-800 text-[15px] leading-relaxed">
                    Our EPF Calculator is a valuable tool for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                    <li>
                      <strong>Salaried Employees:</strong> To estimate their
                      retirement savings and plan for the future.
                    </li>
                    <li>
                      <strong>Financial Planners:</strong> To create robust
                      financial plans for their clients.
                    </li>
                    <li>
                      <strong>New Joinees:</strong> To understand the potential
                      growth of their initial EPF contributions.
                    </li>
                    <li>
                      <strong>Individuals Planning Early Retirement:</strong> To
                      project their corpus and assess financial readiness.
                    </li>
                    <li>
                      <strong>Anyone Curious:</strong> To simply understand how
                      their EPF grows over time.
                    </li>
                  </ul>
                </div>
                {/* Image for Who Can Benefit - Concept: Users/Audience */}
                <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-102 transition-transform duration-300">
                  {/* Placeholder for the "Who Can Benefit" image. You'll need to generate and import this image (e.g., epfUserIcon.png) */}
                  {/* <img
                                src={epfUserIcon}
                                alt="Who can use EPF Calculator - Target audience icon"
                                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                            /> */}
                  <img
                    src="Gemini_Generated_Image_ybrwi9ybrwi9ybrw.jpg"
                    alt="Who can use EPF Calculator - Target audience icon"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                  />
                </div>
              </div>
            </section>

            {/* Why Use UniCX EPF Calculator? - Similar to Advantages of GST Calculator */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                Why Use UniCX EPF Calculator?
              </h2>
              <p className="mb-4 text-gray-800 text-[15px] leading-relaxed">
                Leveraging our <strong>free online EPF calculator</strong>{" "}
                offers significant advantages for your financial planning:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Accuracy:</strong> Our calculator provides precise
                  estimations based on current rules and your inputs.
                </li>
                <li>
                  <strong>Simplicity:</strong> Designed for ease of use, making
                  complex projections accessible to everyone.
                </li>
                <li>
                  <strong>Future Planning:</strong> Helps you visualize your
                  retirement corpus, aiding in better financial decisions.
                </li>
                <li>
                  <strong>Time-Saving:</strong> Get instant results without
                  manual calculations.
                </li>
                <li>
                  <strong>Free & Accessible:</strong> Available online 24/7
                  without any cost.
                </li>
              </ul>
            </section>

            {/* EPF Calculation Formula (Simplified) & Practical Examples - Similar to GST formulas */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                EPF Calculation Formulas & Practical Examples (Simplified)
              </h2>
              <p className="text-gray-800 text-[15px] leading-relaxed">
                While our calculator handles the complexities, understanding the
                underlying principles can provide deeper insights into your EPF
                growth:
              </p>
              <h3 className="font-normal text-lg mt-4 mb-2">
                1. Monthly Contribution Calculation:
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800 text-[15px] leading-relaxed">
                <li>
                  <strong>Employee Share</strong> = 12% of (Basic Salary + DA)
                </li>
                <li>
                  <strong>Employer Share</strong> = 12% of (Basic Salary + DA)
                </li>
                <li>
                  <strong>Total Monthly Contribution</strong> = Employee Share +
                  Employer Share
                </li>
              </ul>

              <h3 className="font-normal text-lg mt-4 mb-2">
                2. Annual Interest Accrual:
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800 text-[15px] leading-relaxed">
                <li>Interest is calculated on the monthly running balance.</li>
                <li>The annual interest rate is declared by EPFO.</li>
                <li>
                  Interest is compounded annually, meaning interest earned in
                  one year also starts earning interest in subsequent years.
                </li>
              </ul>

              <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
                <p className="text-gray-700 mb-2">
                  📊 <strong>Example Scenario:</strong>
                </p>
                <p className="text-green-500 font-semibold">
                  Current Age: <strong>25 years</strong>
                </p>
                <p className="text-green-500 font-semibold">
                  Retirement Age: <strong>58 years</strong>
                </p>
                <p className="text-green-500 font-semibold">
                  Monthly Basic Salary + DA: <strong>₹30,000</strong>
                </p>
                <p className="text-green-500 font-semibold">
                  Estimated Annual Increment: <strong>5%</strong>
                </p>
                <p className="text-green-500 font-semibold">
                  Current EPF Balance: <strong>₹50,000</strong>
                </p>
                <p className="text-primary font-bold text-lg mt-3">
                  Estimated Total EPF Corpus at Retirement (approx):{" "}
                  <strong>₹1.5 Crores</strong>
                </p>
              </div>

              <p className="mt-4 text-gray-800 text-[15px] leading-relaxed">
                <strong>The Power of Compounding:</strong> This example
                illustrates how consistent contributions, coupled with annual
                salary increments and compounding interest, can lead to a
                significant retirement fund over time. The earlier you start,
                the more substantial your corpus can become.
              </p>
            </section>

            {/* FAQs Section */}
            <section className="">
              <h2 className="text-2xl text-textColor font-medium mb-3">
                Frequently Asked Questions (FAQs) about EPF
              </h2>
              <div className="space-y-2">
                {epfFaqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === i ? "bg-blue-50 rounded-lg " : ""
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
                      <p className="font-normal text-gray-800">{faq.q}</p>
                      {openFAQ === i ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                    <p
                      className={`text-gray-800 text-md font-normal px-3 ${
                        openFAQ === i
                          ? "max-h-[500px] opacity-100 py-2 "
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer note */}
            <section className="pt-6 border-t mt-10">
              <p className="text-sm text-gray-500">
                This EPF calculator and information is developed and maintained
                by{" "}
                <strong>UniCX (UniconsultX Solutions Private Limited)</strong>{" "}
                to help users understand and estimate their Employees' Provident
                Fund corpus. For personalized financial advice or complex
                EPF-related queries, always consult with a qualified financial
                advisor or the official EPFO channels.
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

export default EPFCalculator;
