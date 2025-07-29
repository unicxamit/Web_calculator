import React, { useState, useEffect } from "react";
// import { FaRupeeSign } from "react-icons/fa";
import {
  BarChart,
  DollarSign,
  Clock,
  HelpCircle,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Target,
  Percent,
  CalendarDays,
} from "lucide-react";
import Header from "../component/Header";
import simplelogo from "../assets/BG IMAGES/sim1.png"
import howuse from "../assets/BG IMAGES/how4.png"
import benifite from "../assets/BG IMAGES/5 png .png"
function SimpleInterestCalculator() {
  const [activeTab, setActiveTab] = useState("simple");
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("4");
  const [time, setTime] = useState("2");

  const [compoundings, setCompoundings] = useState("1");

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Refined validateInputs to set specific error messages for each field
  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || P < 100 || P > 1000000000) {
      newErrors.principal = "Amount must be between ₹100 and ₹1,00,00,000.";
      isValid = false;
    }
    if (isNaN(r) || r <= 0.0 || r > 100) {
      // Changed 0 to 0.0 for clarity, assuming rate can be very small but not zero or negative
      newErrors.rate = "Annual Return must be between 0.1% and 100%.";
      isValid = false;
    }
    if (isNaN(T) || T <= 0 || T > 100) {
      newErrors.time = "Duration must be between 1 and 100 years.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const formatNumber = (num) => {
    if (num === null || isNaN(num) || num === "") return "0.00";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const calculateInterest = () => {
    if (!validateInputs()) {
      setResult(null); // Clear previous results if inputs are invalid
      return;
    }

    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (activeTab === "simple") {
      const SI = (P * R * T) / 100;
      const total = P + SI;

      setResult({
        type: "simple",
        principal: P.toFixed(2),
        interest: SI.toFixed(2),
        total: total.toFixed(2),
      });
    } else {
      // activeTab === 'compound'
      const n = parseInt(compoundings);
      const r = R / 100;
      const A = P * Math.pow(1 + r / n, n * T);
      const CI = A - P;

      setResult({
        type: "compound",
        principal: P.toFixed(2),
        interest: CI.toFixed(2),
        total: A.toFixed(2),
      });
    }
  };

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time, compoundings, activeTab]);

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value <= 100) {
      setTime(value);
      setErrors((prev) => ({ ...prev, time: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        time: "Duration must be between 1 and 100 years.",
      }));
    }
  };

  // Rate input handler
  const handleRateChange = (e) => {
    const value = e.target.value;
    if (Number(value) <= 100) {
      setRate(value);
      setErrors((prev) => ({ ...prev, rate: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        rate: "Annual Return must be between 0.1% and 100%.",
      }));
    }
  };

  // Amount input handler
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value <= 1000000000) {
      setPrincipal(value);
      setErrors((prev) => ({ ...prev, principal: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        principal: '"Amount must be between ₹100 and ₹1,00,00,000."',
      }));
    }
  };
  const [openFAQ, setOpenFAQ] = React.useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQs data
  const interestFaqs = [
    {
      q: "Q1: Is interest always compounded?",
      a: "A1: No, it depends on the financial product. Savings accounts often use simple interest (or compound daily/monthly but paid quarterly/annually). Fixed Deposits and most loans use compound interest. Always check the terms and conditions.",
    },
    {
      q: "Q2: Which is better: Simple Interest or Compound Interest?",
      a: "A2: For investments, compound interest is always better as it allows your money to grow exponentially. For loans, simple interest is better as it means you pay less overall.",
    },
    {
      q: "Q3: How does compounding frequency affect returns?",
      a: "A3: The more frequently interest is compounded (e.g., monthly vs. annually), the higher the effective annual return will be. This is because interest is added to the principal more often, allowing it to start earning interest sooner.",
    },
    {
      q: 'Q4: What is the "Rule of 72" and how is it used?',
      a: "A4: The Rule of 72 is a quick mental math shortcut to estimate the number of years it takes for an investment to double in value. You simply divide 72 by the annual interest rate. For example, if you earn 6% interest, your money will roughly double in 12 years (72 / 6 = 12).",
    },
    {
      q: "Q5: Do all loans use compound interest?",
      a: "A5: Most significant loans (like home loans, personal loans, car loans, and especially credit card debt) use compound interest, which means interest accrues on the outstanding principal balance. However, some very short-term or specific types of loans might use simple interest. Always read your loan agreement carefully.",
    },
  ];
  return (
    <>
      <Header />
      <div className="container-div">
        <div className=" second-container">
          {/* Left Section: Introduction and Description */}

          <div className="my-4">
            <h1 className="text-4xl font-medium text-textColor mb-5">
              Simple & Compound Interest Calculator
            </h1>
            <p className="mb-8">
              Compare and calculate Simple Interest and Compound Interest for
              your investments or loans.
            </p>
          </div>

          {/* Right Section: Calculator Inputs and Results */}
          <div className="grid-layout">
            {/* Input Fields Section */}

            <div className="">
              <div className="type-buttons w-full mb-6">
                <button
                  onClick={() => {
                    setActiveTab("simple");
                    setResult(null);
                    // setErrors({});
                  }}
                  className={`type-button  
                                ${
                                  activeTab === "simple"
                                    ? "bg-primary text-white shadow-lg"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }
                            `}
                >
                  Simple Interest
                </button>
                <button
                  onClick={() => {
                    setActiveTab("compound");
                    setResult(null);
                    // setErrors({});
                  }}
                  className={`type-button 
                                ${
                                  activeTab === "compound"
                                    ? "bg-primary text-white shadow-lg"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }
                            `}
                >
                  Compound Interest
                </button>
              </div>
              <div className="">
                {/* Input: Principal Amount */}
                <div className="mb-6">
                  <label
                    htmlFor="principal"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Principal Amount (₹):
                  </label>
                  <div
                    className={` flex items-center border rounded-xl  px-3 py-3 
                                             ${
                                               errors.principal
                                                 ? "border-borderColor shadow"
                                                 : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                             }`}
                  >
                    <label className="size-5 text-md font-normal text-gray-500">
                      ₹
                    </label>
                    <input
                      type="number"
                      id="principal"
                      value={principal}
                      onChange={(e) => handleAmountChange(e)}
                      className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                      min="0"
                      placeholder="e.g., 50000"
                      aria-label="Principal Amount"
                    />
                  </div>
                  {errors.principal && (
                    <p className="error-text">{errors.principal}</p>
                  )}
                </div>

                {/* Input: Annual Interest Rate */}
                <div className="mb-6">
                  <label
                    htmlFor="rate"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Annual Interest Rate (%):
                  </label>
                  <div
                    className={`flex items-center border rounded-xl  px-3 py-3
                                             ${
                                               errors.rate
                                                 ? "border-borderColor shadow"
                                                 : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                             }`}
                  >
                    <input
                      type="number"
                      id="rate"
                      value={rate}
                      onChange={(e) => handleRateChange(e)}
                      className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                      min="0"
                      step="0.01"
                      placeholder="e.g., 7.5"
                      aria-label="Annual Interest Rate"
                    />
                    <label className="size-5 text-md font-normal text-gray-500">
                      %
                    </label>
                  </div>
                  {errors.rate && <p className="error-text">{errors.rate}</p>}
                </div>

                {/* Input: Time (Years) */}
                <div className="mb-6">
                  <label
                    htmlFor="time"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Time Period (in Years):
                  </label>
                  <div
                    className={` flex items-center border rounded-xl  px-3 py-3
                                             ${
                                               errors.time
                                                 ? "border-borderColor shadow"
                                                 : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                             }`}
                  >
                    <input
                      type="number"
                      id="time"
                      value={time}
                      onChange={(e) => handleAgeChange(e)}
                      className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                      min="0"
                      placeholder="e.g., 10"
                      aria-label="Time Period in Years"
                    />
                    <label className="text-md font-normal text-gray-500">
                      years
                    </label>
                  </div>
                  {errors.time && <p className="error-text">{errors.time}</p>}
                </div>

                {/* Compound-Specific Input */}
                {activeTab === "compound" && (
                  <div className="mb-6">
                    <label
                      htmlFor="compoundings"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Compoundings per Year:
                    </label>
                    <div className="w-full  p-1.5  text-gray-600 font-medium outline-none bg-transparent border border-gray-200 rounded-xl px-2 py-1 focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                      <select
                        id="compoundings"
                        value={compoundings}
                        onChange={(e) => setCompoundings(e.target.value)}
                        className="w-full p-1.5 text-gray-600 font-medium outline-none bg-transparent"
                        aria-label="Compoundings per Year"
                      >
                        <option value="1">Yearly</option>
                        <option value="2">Half-Yearly</option>
                        <option value="4">Quarterly</option>
                        <option value="12">Monthly</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Result Section */}
            <div className="p-12 bg-white  w-full sm:p-6  rounded-tr-lg  rounded-br-lg rounded-bl-lg shadow-shadowsmall">
              {result && (
                <div className="mt-5">
                  <div className="space-y-6">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className=" text-gray-900">Principal Amount:</span>
                      <span className="font-normal text-gray-900">
                        ₹ {formatNumber(result.principal)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className=" text-gray-900">
                        Total Interest Earned:
                      </span>
                      <span className="font-normal text-gray-900">
                        ₹ {formatNumber(result.interest)}
                      </span>
                    </div>
                  </div>
                  <div className="flex text-primary text-xl font-normal justify-between items-center mt-20 py-3  border-t-2 border-t-primary  ">
                    <span className=" ">Total Value:</span>
                    <span className="">₹ {formatNumber(result.total)}</span>
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-4 text-center">
                * This calculator provides an estimate. Actual returns may vary
                based on specific terms, taxation, and financial institution
                policies.
              </p>
            </div>
          </div>

          <section className="mt-10">
            <div className="space-y-14 text-gray-700 text-base leading-relaxed">
              {/* What are Simple & Compound Interest? Section */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  What are Simple Interest & Compound Interest?
                </h2>{" "}
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                     <p className="mb-4 text-gray-600 tracking-wide text-[16px] font-[380]">
                  {" "}
                  {/* Reverted text size/color */}
                  Understanding how interest works is fundamental to effective
                  financial planning, whether you're saving, investing, or
                  taking a loan. The{" "}
                  <strong className="text-blue-500">
                    UniCX Simple & Compound Interest Calculator
                  </strong>{" "}
                  helps you differentiate and calculate the impact of these two
                  core concepts:
                </p>
                <ul className="list-disc list-inside space-y-3">
                  {" "}
                  {/* Reverted list style */}
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="text-blue-500">
                      Simple Interest (SI):
                    </strong>{" "}
                    This is the most straightforward form of interest. It is
                    calculated{" "}
                    <strong className="">
                      only on the principal amount
                    </strong>{" "}
                    you initially invest or borrow. The interest earned or paid
                    remains constant throughout the tenure, as it does not
                    factor in previously earned interest.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="text-blue-500">
                      Compound Interest (CI):
                    </strong>{" "}
                    Often called the "eighth wonder of the world," compound
                    interest is calculated on the{" "}
                    <strong className="">
                      initial principal amount AND on the accumulated interest
                    </strong>{" "}
                    from previous periods. This means your interest begins to
                    earn its own interest, leading to exponential growth over
                    time. The more frequently interest is compounded (e.g.,
                    monthly vs. annually), the faster your money grows.
                  </li>
                </ul>
                  </div>
                   <div className="flex justify-center items-center  max-h-[350px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300">
                                
                                  <img
                                    src={simplelogo}
                                    alt="EPF - Retirement Savings and Security"
                                    className="w-full h-auto max-h-[350px] xl:max-h-[300px] object-contain"
                                  />
                                </div>
                                </div>
                {/* Reverted margin */}
               
              </section>

              {/* Why Use the UniCX Simple & Compound Interest Calculator? Section */}
              {/* <section className="">
                {" "}
                {/* Reverted margin */}
                {/* <h2 className="text-2xl font-semibold text-textColor mb-3">
                  Why Use the UniCX Simple & Compound Interest Calculator?
                </h2>{" "} */}
                {/* Reverted margin */}
                {/* <p className="mb-8 text-gray-600 tracking-wide text-[16px] font-[380]">
                  Our calculator is an indispensable tool for anyone looking to
                  understand the mechanics of interest and make informed
                  financial decisions:
                </p> */}
              {/* </section> */} 

              {/* Main Calculator Grid (Placeholder for actual calculator UI) */}
              {/*
          IMPORTANT: This section is a placeholder for your *existing* calculator's UI.
          You should integrate your actual calculator components and logic here.
          The input fields below are just for visual representation of the content structure.
        */}

              {/* Why Use the UniCX Simple & Compound Interest Calculator? (Expanded Benefits Section) */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-4"> */}
                  {" "}
                  {/* Reverted gap */}
                  <div>
                    <h2 className="text-2xl font-semibold text-textColor mb-3">
                      Key Benefits of Using the UniCX Simple & Compound Interest
                      Calculator
                    </h2>
                    <p className="mb-4 text-gray-600 tracking-wide text-[16px] font-[380]">
                      Our calculator is an indispensable tool for anyone looking
                      to understand the mechanics of interest and make informed
                      financial decisions:
                    </p>
                    <ul className="list-none space-y-3 ">
                      {" "}
                      {/* Reverted spacing */}
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="flex items-start">
                          <BarChart
                            size={18}
                            className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                          />{" "}
                          {/* Reverted icon color */}
                          Visualize Growth:
                        </strong>
                        <span className="block ml-6 -mt-1">
                          Clearly see how your money grows under both simple and
                          compound interest scenarios, especially over{" "}
                          <strong className="font-semibold">
                            longer periods
                          </strong>
                          .
                        </span>
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="flex items-start">
                          <Target
                            size={18}
                            className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                          />{" "}
                          {/* Reverted icon color */}
                          Compare Investment Options:
                        </strong>
                        <span className="block ml-6 -mt-1">
                          Evaluate potential returns from various investment
                          avenues that offer{" "}
                          <strong className="font-semibold">
                            different interest calculation methods
                          </strong>
                          .
                        </span>
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="flex items-start">
                          <DollarSign
                            size={18}
                            className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                          />{" "}
                          {/* Reverted icon color */}
                          Plan for Loans & Debts:
                        </strong>
                        <span className="block ml-6 -mt-1">
                          Understand the{" "}
                          <strong className="font-semibold">
                            true cost of borrowing money
                          </strong>{" "}
                          where interest is often compounded.
                        </span>
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="flex items-start">
                          <CheckCircle
                            size={18}
                            className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                          />{" "}
                          {/* Reverted icon color */}
                          Empower Financial Decisions:
                        </strong>
                        <span className="block ml-6 -mt-1">
                          Gain clarity on how interest rates, principal amounts,
                          time, and compounding frequency{" "}
                          <strong className="font-semibold">
                            impact your financial outcomes
                          </strong>
                          .
                        </span>
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="flex items-start">
                          <HelpCircle
                            size={18}
                            className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                          />{" "}
                          {/* Reverted icon color */}
                          Educational Tool:
                        </strong>
                        <span className="block ml-6 -mt-1">
                          An excellent resource for students, financial novices,
                          or anyone wanting to grasp the{" "}
                          <strong className="font-semibold">
                            basics of financial mathematics
                          </strong>
                          .
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* Image for Benefits */}
                  {/* <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded cursor-pointer hover:scale-102 transition-transform duration-300"> */}
                    {/* <img
                src={interestBenefitImage} 
                alt="Benefits of using UniCX Simple & Compound Interest Calculator - Financial Growth"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
              /> */}
                  {/* </div> */}
                {/* </div> */}
              </section>

              {/* How to Use the UniCX Simple & Compound Interest Calculator Section */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  How to Use the UniCX Simple & Compound Interest Calculator
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  {" "}
                  {/* Reverted gap */}
                  <div>
                    <p className="text-gray-600 tracking-wide text-[16px] font-[380]">
                      Our calculator is designed to be user-friendly, allowing
                      you to quickly determine interest earned or paid under
                      different conditions.
                    </p>
                    <h3 className="text-gray-600 tracking-wide text-[17px] font-[500] mt-4 mb-2">
                      Inputs Common to Both:
                    </h3>
                    <ol className="list-decimal list-inside space-y-3 ">
                      {" "}
                      {/* Reverted spacing */}
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Principal Amount (₹):</strong> The initial
                        amount of money you are investing or borrowing.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Annual Interest Rate (%):</strong> The annual
                        rate at which interest is applied.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Time Period (Years):</strong> The duration for
                        which the money is invested or borrowed.
                      </li>
                    </ol>
                    <h3 className="text-gray-600 tracking-wide text-[17px] font-[500] mt-4 mb-2">
                      Additional Input for Compound Interest:
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {" "}
                      {/* Reverted spacing */}
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong>Compounding Frequency:</strong> Select how often
                        the interest is compounded (Annually, Semi-annually,
                        Quarterly, Monthly, or Daily).
                      </li>
                    </ul>
                    <h3 className="text-gray-600 tracking-wide text-[17px] font-[500] mt-4 mb-2">
                      Outputs:
                    </h3>
                    <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                      The calculator will instantly provide you with the{" "}
                      <strong className="font-semibold">
                        Total Interest Earned
                      </strong>{" "}
                      (or paid) and the{" "}
                      <strong className="font-semibold">Total Amount</strong> at
                      the end of the period.
                    </p>
                  </div>
                  {/* Image for How to Use */}
                  <div className="flex justify-center items-center  cursor-pointer hover:scale-102 transition-transform duration-300">
                    <img
                src={howuse} 
                alt="How to use UniCX Simple & Compound Interest Calculator - Step by step guide"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
              />
                  </div>
                </div>
              </section>

              {/* Key Factors Influencing Interest */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  Key Factors Influencing Interest
                </h2>
                <p className="mb-4 text-gray-600 tracking-wide text-[16px] font-[380]">
                  The amount of interest earned or paid is determined by several
                  crucial factors:
                </p>
                <ul className="list-none space-y-3 ">
                  {" "}
                  {/* Reverted spacing */}
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="flex items-start">
                      <DollarSign
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                      />{" "}
                      {/* Reverted icon color */}
                      Principal Amount:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      The{" "}
                      <strong className="font-semibold">
                        initial sum of money
                      </strong>
                      . A larger principal will generate more interest, assuming
                      other factors remain constant.
                    </span>
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="flex items-start">
                      <Percent
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                      />{" "}
                      {/* Reverted icon color */}
                      Interest Rate:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      The{" "}
                      <strong className="font-semibold">
                        percentage charged or earned
                      </strong>{" "}
                      on the principal per year. A higher interest rate leads to
                      more interest over the same period.
                    </span>
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="flex items-start">
                      <CalendarDays
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                      />{" "}
                      {/* Reverted icon color */}
                      Time Period:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      The <strong className="font-semibold">duration</strong>{" "}
                      for which the money is invested or borrowed. The longer
                      the period, the more interest accrues, especially with
                      compounding.
                    </span>
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="flex items-start">
                      <Clock
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                      />{" "}
                      {/* Reverted icon color */}
                      Compounding Frequency (for CI only):
                    </strong>
                    <span className="block ml-6 -mt-1">
                      How often the interest is added to the principal. The{" "}
                      <strong className="font-semibold">
                        more frequently interest is compounded
                      </strong>
                      , the greater the total interest earned will be.
                    </span>
                  </li>
                </ul>
              </section>

              {/* Important Considerations for Interest Calculations - Info Box */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
                  {" "}
                  {/* Reverted styling */}
                  <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center">
                    <Target size={20} className="mr-3 mt-1 flex-shrink-0" />
                    Important Considerations for Interest Calculations
                  </h2>
                  <p className="text-blue-800 mb-4  tracking-wide text-[16px] font-[380]">
                    When dealing with interest, especially for long-term
                    investments or loans, consider these critical points:
                  </p>
                  {/* Image for Important Considerations */}
                  {/* <img
                src={interestConsiderationsImage} 
                alt="Important Considerations for Interest Calculations"
                className="w-auto h-16 mx-auto my-4" 
            /> */}
                  <ul className="list-none space-y-2 text-blue-700 text-[15px] font-[350] leading-relaxed">
                    {" "} 
                    {/* Reverted spacing */}
                    <li>
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        Inflation's Impact:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        The "real" return on your investment is often less than
                        the nominal interest rate due to{" "}
                        <strong className="font-semibold">inflation</strong>.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        Taxation on Interest:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Interest income from investments is typically{" "}
                        <strong className="font-semibold">taxable</strong> as
                        "Income from Other Sources" as per your applicable
                        income tax slab.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        Real vs. Nominal Interest Rates:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        <strong className="font-semibold">Nominal rates</strong>{" "}
                        are advertised, while{" "}
                        <strong className="font-semibold">real rates</strong>{" "}
                        account for inflation, giving a truer picture.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        The Power of Early Investment:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Due to{" "}
                        <strong className="font-semibold">compounding</strong>,
                        starting investments early, even with small amounts,
                        leads to significantly larger wealth.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        Compound Interest in Debt:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        While beneficial for investments, compound interest can
                        also{" "}
                        <strong className="font-semibold">
                          work against you in loans
                        </strong>{" "}
                        if not managed properly.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        Rule of 72:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        A quick way to estimate how long it takes for an
                        investment to{" "}
                        <strong className="font-semibold">
                          double in value
                        </strong>{" "}
                        (72 divided by the annual interest rate).
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Who Can Benefit from the UniCX Simple & Compound Interest Calculator? */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  Who Can Benefit from the UniCX Simple & Compound Interest
                  Calculator?
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  {" "}
                  {/* Reverted gap */}
                  <div>
                    <p className="text-gray-600 tracking-wide text-[16px] font-[380] mb-4">
                      This versatile calculator is beneficial for a wide array
                      of users:
                    </p>
                    <ul className="list-disc list-inside space-y-3 ">
                      {" "}
                      {/* Reverted spacing */}
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="">Investors:</strong> To
                        estimate returns on various investment products like
                        FDs, RDs, bonds, or equity growth assumptions.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="">Borrowers:</strong> To
                        understand the actual cost of personal loans, car loans,
                        or home loans.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="">
                          Financial Planners & Advisors:
                        </strong>{" "}
                        As a quick estimation tool during client consultations.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="">
                          Students & Educators:
                        </strong>{" "}
                        To learn and teach fundamental financial concepts in a
                        practical way.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="">
                          Anyone Planning Savings:
                        </strong>{" "}
                        To set realistic savings goals and see the impact of
                        consistent contributions and interest.
                      </li>
                      <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                        <strong className="">
                          Small Business Owners:
                        </strong>{" "}
                        For calculating interest on business loans or potential
                        returns on short-term investments.
                      </li>
                    </ul>
                  </div>
                  {/* Image for Who Can Benefit */}
                  <div className="flex justify-center items-center  cursor-pointer hover:scale-102 transition-transform duration-300">
                    <img
                    src={benifite} 
                    alt="Who can use UniCX Simple & Compound Interest Calculator - Diverse users"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                />
                  </div>
                </div>
              </section>

              {/* Why Choose UniCX for Your Interest Calculations? */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  Why Choose UniCX for Your Interest Calculations?
                </h2>
                <ul className="list-disc list-inside space-y-3">
                  {" "}
                  {/* Reverted spacing */}
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="">
                      Dual Functionality:
                    </strong>{" "}
                    Calculate both{" "}
                    <strong className="">
                      Simple and Compound Interest
                    </strong>{" "}
                    in one convenient tool.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="">
                      Accuracy & Precision:
                    </strong>{" "}
                    Our calculator uses standard financial formulas to ensure{" "}
                    <strong className="">
                      reliable and precise results
                    </strong>
                    .
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="">
                      User-Friendly Design:
                    </strong>{" "}
                    An{" "}
                    <strong className="">
                      intuitive interface
                    </strong>{" "}
                    makes it easy for anyone to input data and understand the
                    output.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="">Instant Insights:</strong>{" "}
                    Get{" "}
                    <strong className="">
                      immediate calculations
                    </strong>
                    , allowing for quick comparisons and informed
                    decision-making.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="">Completely Free:</strong>{" "}
                    Access this powerful financial tool at{" "}
                    <strong className="">no cost</strong>, whenever
                    you need it.
                  </li>
                  <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                    <strong className="">
                      Educational Value:
                    </strong>{" "}
                    Helps in demystifying interest calculations and{" "}
                    <strong className="">
                      empowering users with financial knowledge
                    </strong>
                    .
                  </li>
                </ul>
              </section>

              {/* Understanding the Formulas & Example Scenarios */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  Understanding the Formulas & Example Scenarios
                </h2>
                <h3 className="text-gray-600 tracking-wide text-[17px] font-[500] mt-4 mb-2">
                  Simple Interest Formula:
                </h3>
                <p className="text-gray-600 text-[15px] font-[380]">
                  Simple Interest is calculated using the formula:
                </p>
                <div className="bg-gray-100 p-3 rounded-md my-3 inline-block">
                  {" "}
                  {/* Reverted background */}
                  <code className="text-blue-700 font-mono text-lg">
                    SI = (P × R × T) / 100
                  </code>
                </div>
                <p className="text-gray-800 text-[15px] leading-relaxed">
                  Where: <br />
                  <code className="bg-gray-50 px-1 rounded">P</code> = Principal
                  Amount <br />
                  <code className="bg-gray-50 px-1 rounded">R</code> = Annual
                  Interest Rate <br />
                  <code className="bg-gray-50 px-1 rounded">T</code> = Time
                  Period in Years
                </p>
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm mt-6">
                  {" "}
                  {/* Reverted styling */}
                  <p className="text-gray-700 mb-2">
                    📊{" "}
                    <strong className="font-semibold">
                      Example: Simple Interest
                    </strong>
                  </p>
                  <p className="text-blue-700 font-semibold">
                    Principal ($P$): <strong>₹10,000</strong>
                  </p>
                  <p className="text-blue-700 font-semibold">
                    Annual Interest Rate ($R$): <strong>5%</strong>
                  </p>
                  <p className="text-blue-700 font-semibold">
                    Time Period ($T$): <strong>3 Years</strong>
                  </p>
                  <p className="text-primary font-bold text-lg mt-3">
                    Total Interest Earned: <strong>₹1,500</strong>
                  </p>
                  <p className="text-primary font-bold text-lg mt-1">
                    Total Amount after 3 years: <strong>₹11,500</strong>
                  </p>
                </div>
                <h3 className="text-gray-600 tracking-wide text-[17px] font-[500] mt-8 mb-2">
                  Compound Interest Formula:
                </h3>{" "}
                {/* Reverted margin */}
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  The formula for the total amount ($A$) after compounding is:
                </p>
                <div className="bg-gray-100 p-3 rounded-md my-3 inline-block">
                  {" "}
                  {/* Reverted background */}
                  <code className="text-green-700 font-mono text-lg">
                    A = P (1 + R/n)<sup>nt</sup>
                  </code>
                </div>
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  And the Compound Interest ($CI$) is:
                </p>
                <div className="bg-gray-100 p-3 rounded-md my-3 inline-block">
                  {" "}
                  {/* Reverted background */}
                  <code className="text-green-700 font-mono text-lg">
                    CI = A - P
                  </code>
                </div>
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  Where: <br />
                  <code className="bg-gray-50 px-1 rounded">P</code> = Principal
                  Amount <br />
                  <code className="bg-gray-50 px-1 rounded">R</code> = Annual
                  Interest Rate (as a decimal, e.g., 5% = 0.05) <br />
                  <code className="bg-gray-50 px-1 rounded">n</code> = Number of
                  times interest is compounded per year <br />
                  <code className="bg-gray-50 px-1 rounded">t</code> = Time
                  Period in Years <br />
                  <code className="bg-gray-50 px-1 rounded">A</code> = Amount
                  after time t <br />
                  <code className="bg-gray-50 px-1 rounded">CI</code> = Compound
                  Interest
                </p>
                <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
                  {" "}
                  {/* Reverted styling */}
                  <p className="text-gray-700 mb-2">
                    📊{" "}
                    <strong className="font-semibold">
                      Example: Compound Interest (Annually)
                    </strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Principal ($P$): <strong>₹10,000</strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Annual Interest Rate ($R$): <strong>5%</strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Time Period ($T$): <strong>3 Years</strong>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Compounding Frequency ($n$): <strong>Annually (n=1)</strong>
                  </p>
                  <p className="text-primary font-bold text-lg mt-3">
                    Total Interest Earned: <strong>₹1,576.25</strong>
                  </p>
                  <p className="text-primary font-bold text-lg mt-1">
                    Total Amount after 3 years: <strong>₹11,576.25</strong>
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    <strong className="font-semibold">Comparison Note:</strong>{" "}
                    Notice how for the same principal, rate, and time, Compound
                    Interest (₹1,576.25) yields more than Simple Interest
                    (₹1,500) because of the "interest on interest" effect. This
                    difference becomes significantly larger over longer periods
                    and with more frequent compounding.
                  </p>
                </div>
              </section>

              {/* FAQs Section */}
              <section className="">
                {" "}
                {/* Reverted margin */}
                <h2 className="text-2xl font-semibold text-textColor mb-3">
                  Frequently Asked Questions (FAQs) about Simple & Compound
                  Interest
                </h2>
                <div className="space-y-2">
                  {" "}
                  {/* Reverted spacing */}
                  {interestFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === i ? "bg-blue-50 rounded-lg " : "" // Reverted styling
                      }`}
                      onClick={() => toggleFAQ(i)}
                    >
                      <div
                        className={`flex justify-between items-center px-3 ${
                          openFAQ !== i
                            ? "border border-gray-300 rounded-lg py-3"
                            : "" // Reverted styling
                        }`}
                      >
                        <p className="text-gray-600 tracking-wide text-[16px] font-[380]">{faq.q}</p>
                        {openFAQ === i ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <p
                        className={`text-gray-600 tracking-wide text-[15px] font-[380] px-3 ${
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
              <section className="pt-4 border-t mt-8">
                {" "}
                {/* Reverted margin/padding */}
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  This Simple & Compound Interest Calculator and the information
                  provided are developed and maintained by{" "}
                  <strong className="text-blue-500">
                    UniCX (UniconsultX Solutions Private Limited)
                  </strong>{" "}
                  to help users understand interest calculations. While we
                  strive for accuracy, the information is for illustrative
                  purposes only and should not be considered financial advice.
                  For personalized financial guidance or specific product
                  details, always consult with a qualified financial
                  professional or your financial institution.
                </p>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default SimpleInterestCalculator;
