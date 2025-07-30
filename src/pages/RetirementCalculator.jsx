import React, { useState, useEffect } from "react";
// Assuming you're using Lucide icons, adjust imports as needed
import {
  Clock,
  Landmark,
  TrendingUp,
  DollarSign,
  Target,
  Briefcase,
  BarChart,
  CheckCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Header from "../component/Header";
import gratuitylogo from "../assets/BG IMAGES/retir1.png"
import howuse from "../assets/BG IMAGES/how1.png";
import benifite from "../assets/BG IMAGES/3 png.png"

function RetirementCalculator() {
  // State variables for user inputs
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(5); // in %
  const [preRetirementROI, setPreRetirementROI] = useState(10); // in %
  const [postRetirementROI, setPostRetirementROI] = useState(7); // in %
  const [existingSavings, setExistingSavings] = useState(100000);
  const [retirementBenefits, setRetirementBenefits] = useState(0);
  const [errors, setErrors] = useState({});

  // State variables for calculated results
  const [monthlyExpensesAtRetirement, setMonthlyExpensesAtRetirement] =
    useState(0);
  const [corpusRequired, setCorpusRequired] = useState(0);
  const [monthlySIPRequired, setMonthlySIPRequired] = useState(0);
  const [message, setMessage] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Function to format numbers to Indian Rupee system
  const formatIndianRupee = (amount) => {
    if (isNaN(amount) || amount === 0) return "₹0";
    const parts = Math.round(amount).toString().split(".");
    let lastThree = parts[0].substring(parts[0].length - 3);
    let otherNumbers = parts[0].substring(0, parts[0].length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return "₹" + res + (parts.length > 1 ? "." + parts[1] : "");
  };

  // Centralized validation function
  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;

    // Current Age validation
    if (
      currentAge === "" ||
      Number(currentAge) < 15 ||
      Number(currentAge) > 60
    ) {
      newErrors.currentAge = "Current age must be between 15 and 60 years.";
      isValid = false;
    }

    // Retirement Age validation
    if (
      retirementAge === "" ||
      Number(retirementAge) <= Number(currentAge) ||
      Number(retirementAge) > 70
    ) {
      newErrors.retirementAge =
        "Retirement age must be greater than current age and less than or equal to 70.";
      isValid = false;
    }

    // Life Expectancy validation
    if (
      lifeExpectancy === "" ||
      Number(lifeExpectancy) <= Number(retirementAge) ||
      Number(lifeExpectancy) > 100
    ) {
      newErrors.lifeExpectancy =
        "Life expectancy must be greater than retirement age and less than or equal to 100.";
      isValid = false;
    }

    // Current Monthly Expenses validation
    if (
      currentMonthlyExpenses === "" ||
      Number(currentMonthlyExpenses) < 0 ||
      String(currentMonthlyExpenses).length > 1000000000
    ) {
      newErrors.currentMonthlyExpenses =
        "Monthly expenses must be a non-negative number and cannot be more than 1000000000 .";
      isValid = false;
    }

    // Inflation Rate validation
    if (
      inflationRate === "" ||
      Number(inflationRate) < 0 ||
      Number(inflationRate) > 15
    ) {
      newErrors.inflationRate = "Inflation rate must be between 0% and 15%.";
      isValid = false;
    }

    // Pre-Retirement ROI validation
    if (
      preRetirementROI === "" ||
      Number(preRetirementROI) < 0 ||
      Number(preRetirementROI) > 60
    ) {
      newErrors.preRetirementROI =
        "Pre-retirement ROI must be between 0% and 60%.";
      isValid = false;
    }

    // Post-Retirement ROI validation
    if (
      postRetirementROI === "" ||
      Number(postRetirementROI) < 0 ||
      Number(postRetirementROI) > 30
    ) {
      newErrors.postRetirementROI =
        "Post-retirement ROI must be between 0% and 30%.";
      isValid = false;
    }

    // Existing Savings validation
    if (
      existingSavings === "" ||
      Number(existingSavings) < 0 ||
      Number(existingSavings) > 1000000000
    ) {
      newErrors.existingSavings =
        "Existing savings must be a 1 and cannot be more than 1000000000 .";
      isValid = false;
    }

    // Retirement Benefits validation
    if (
      retirementBenefits === "" ||
      Number(retirementBenefits) < 0 ||
      Number(retirementBenefits) > 1000000000
    ) {
      newErrors.retirementBenefits =
        "Retirement benefits must be a 1  and cannot be more than 1000000000.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to calculate retirement planning
  const calculateRetirement = () => {
    if (!validateInputs()) {
      setShowResults(false);
      return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    // Convert percentages to decimals
    const inflRateDecimal = inflationRate / 100;
    const preRetROI_Decimal = preRetirementROI / 100;
    const postRetROI_Decimal = postRetirementROI / 100;

    // 1. Calculate future monthly expenses at retirement
    const futureMonthlyExpenses =
      currentMonthlyExpenses * Math.pow(1 + inflRateDecimal, yearsToRetirement);
    setMonthlyExpensesAtRetirement(futureMonthlyExpenses);

    // 2. Calculate the total corpus required at retirement
    const annualExpensesAtRetirement = futureMonthlyExpenses * 12;

    let corpusNeededForRetirement = 0;
    // Calculate inflation-adjusted return during retirement
    const realRateOfReturnPostRetirement =
      (1 + postRetROI_Decimal) / (1 + inflRateDecimal) - 1;

    if (realRateOfReturnPostRetirement === 0) {
      // If real rate of return is 0, simple multiplication
      corpusNeededForRetirement =
        annualExpensesAtRetirement * yearsInRetirement;
    } else {
      // Present value of an annuity formula for corpus
      corpusNeededForRetirement =
        (annualExpensesAtRetirement *
          (1 -
            Math.pow(1 + realRateOfReturnPostRetirement, -yearsInRetirement))) /
        realRateOfReturnPostRetirement;
    }
    setCorpusRequired(corpusNeededForRetirement);

    // 3. Calculate future value of existing savings and retirement benefits
    const fvExistingSavings =
      existingSavings * Math.pow(1 + preRetROI_Decimal, yearsToRetirement);
    const fvRetirementBenefits = retirementBenefits; // Assuming retirement benefits are received at retirement, so no future value calculation needed for them if they are current values

    const netCorpusToBuild =
      corpusNeededForRetirement - fvExistingSavings - fvRetirementBenefits;

    // 4. Calculate monthly SIP required
    let requiredSIP = 0;
    if (netCorpusToBuild <= 0) {
      setMessage(
        "Congratulations! Based on your current savings and benefits, you already have enough or more than enough for your estimated retirement corpus."
      );
      setMonthlySIPRequired(0);
    } else {
      const monthsToRetirement = yearsToRetirement * 12;
      const monthlyPreRetROI = Math.pow(1 + preRetROI_Decimal, 1 / 12) - 1;

      if (monthlyPreRetROI === 0) {
        requiredSIP = netCorpusToBuild / monthsToRetirement;
      } else {
        // Future value of annuity formula for SIP
        requiredSIP =
          netCorpusToBuild *
          (monthlyPreRetROI /
            (Math.pow(1 + monthlyPreRetROI, monthsToRetirement) - 1));
      }
      setMonthlySIPRequired(requiredSIP);
      setMessage(""); // Clear any previous messages if there was a "have enough" message
    }
    setShowResults(true);
  };

  // useEffect to recalculate when any input changes, and validate
  useEffect(() => {
    calculateRetirement();
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentMonthlyExpenses,
    inflationRate,
    preRetirementROI,
    postRetirementROI,
    existingSavings,
    retirementBenefits,
  ]);

  // Input change handlers with validation
  const handleCurrentAgeChange = (e) => {
    const value = e.target.value;
    if (value <= 60) {
      setCurrentAge(value);
      setErrors((prev) => ({ ...prev, currentAge: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        currentAge: "Current age must be between 15 and 60 years.",
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
          "Retirement age must be greater than current age and less than or equal to 70.",
      }));
    }
  };

  const handleLifeExpectancyChange = (e) => {
    const value = e.target.value;

    if (value <= 100) {
      setLifeExpectancy(value);
      setErrors((prev) => ({ ...prev, lifeExpectancy: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lifeExpectancy:
          "Life expectancy must be greater than retirement age and less than or equal to 100.",
      }));
    }
  };

  const handleCurrentMonthlyExpensesChange = (e) => {
    const value = e.target.value;
    if (value <= 1000000000) {
      setCurrentMonthlyExpenses(value);
      setErrors((prev) => ({ ...prev, currentMonthlyExpenses: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        currentMonthlyExpenses:
          "Monthly expenses must be a non-negative number and cannot be more than 1000000000.",
      }));
    }
  };

  const handleInflationRateChange = (e) => {
    const value = e.target.value;
    if (value <= 15) {
      setInflationRate(value);
      setErrors((prev) => ({ ...prev, inflationRate: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        inflationRate: "Inflation rate must be between 0% and 15%.",
      }));
    }
  };

  const handlePreRetirementROIChange = (e) => {
    const value = e.target.value;
    if (value <= 60) {
      setPreRetirementROI(value);
      setErrors((prev) => ({ ...prev, preRetirementROI: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        preRetirementROI: "Pre-retirement ROI must be between 0% and 60%.",
      }));
    }
  };

  const handlePostRetirementROIChange = (e) => {
    const value = e.target.value;
    if (value <= 30) {
      setPostRetirementROI(value);
      setErrors((prev) => ({ ...prev, postRetirementROI: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        postRetirementROI: "Post-retirement ROI must be between 0% and 30%..",
      }));
    }
  };

  const handleExistingSavingsChange = (e) => {
    const value = e.target.value;
    if (value <= 1000000000) {
      setExistingSavings(value);
      setErrors((prev) => ({ ...prev, existingSavings: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        existingSavings:
          "Existing savings must be a 1 and cannot be more than 1000000000 .",
      }));
    }
  };

  const handleRetirementBenefitsChange = (e) => {
    const value = e.target.value;
    if (value <= 1000000000) {
      setRetirementBenefits(value);
      setErrors((prev) => ({ ...prev, retirementBenefits: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        retirementBenefits:
          "Retirement benefits must be a 1  and cannot be more than 1000000000.",
      }));
    }
  };

  const [openFAQ, setOpenFAQ] = React.useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Retirement Calculator FAQs data
  const retirementFaqs = [
    {
      q: "Q1: When should I start planning for retirement?",
      a: "A1: The earlier, the better. Starting in your 20s or early 30s gives your investments the maximum time to grow due to compounding, significantly reducing the pressure to save large amounts later.",
    },
    {
      q: "Q2: How much should I save for retirement?",
      a: "A2: There's no single answer as it depends on your desired retirement lifestyle, current age, income, and inflation. A common rule of thumb is to save 10-15% of your income, increasing it over time. Our calculator helps personalize this number.",
    },
    {
      q: "Q3: What is a safe withdrawal rate in retirement?",
      a: "A3: The '4% rule' is a widely discussed guideline, suggesting you can withdraw 4% of your initial retirement corpus in the first year of retirement, adjusted for inflation annually, with a high probability of not running out of money for 30 years. However, this rule has nuances and should be adapted to individual circumstances.",
    },
    {
      q: "Q4: Should I consider inflation when planning for retirement?",
      a: "A4: Absolutely. Inflation is crucial. It operates in the background, eroding purchasing power over time. What costs ₹100 today might cost significantly more in 20-30 years. Our calculator incorporates inflation to provide a realistic future expense estimate.",
    },
    {
      q: "Q5: What investment options are suitable for retirement?",
      a: "A5: A diversified portfolio is key. Common options include: Equity Mutual Funds/Stocks (for long-term growth), Public Provident Fund (PPF), Employees' Provident Fund (EPF), National Pension System (NPS), and Fixed Deposits/Bonds (for stability). Always align your investments with your risk tolerance and financial goals.",
    },
  ];
  return (
    <><Header/>
    <section className="container-div mt-14">
      <div className="second-container">
        <div className="mb-14">
          <h1 className="text-4xl font-medium text-textColor mb-5">Retirement Calculator</h1>
         
        </div>

        {/* Right Section: Calculator Inputs and Results */}
        <div className="grid-layout ">
          {/* Input Fields Section */}
          <div className="">
            {/* Current Age */}
            <div className="mb-6">
              <label htmlFor="currentAge" className="block text-gray-600 font-medium mb-2">
                Current Age (Years)
              </label>
              <div
                className={` flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.currentAge
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <input
                  type="number"
                  id="currentAge"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                  min="15"
                  max="60"
                />
                <label className="text-md font-normal text-gray-500">
                  years
                </label>
              </div>
              {errors.currentAge && (
                <p className="error-text">{errors.currentAge}</p>
              )}
            </div>

            {/* Retirement Age */}
            <div className="mb-6">
              <label htmlFor="retirementAge" className="block text-gray-600 font-medium mb-2">
                Retirement Age (Years)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.retirementAge
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <input
                  type="number"
                  id="retirementAge"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                  min={Number(currentAge) + 1}
                  max="70"
                />
                <label className="text-md font-normal text-gray-500">
                  years
                </label>
              </div>
              {errors.retirementAge && (
                <p className="error-text">{errors.retirementAge}</p>
              )}
            </div>

            {/* Life Expectancy */}
            <div className="mb-6">
              <label htmlFor="lifeExpectancy" className="block text-gray-600 font-medium mb-2">
                Life Expectancy (Years)
              </label>
              <div
                className={` flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.lifeExpectancy
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <input
                  type="number"
                  id="lifeExpectancy"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                  value={lifeExpectancy}
                  onChange={handleLifeExpectancyChange}
                  min={Number(retirementAge) + 1}
                  max="100"
                />
                <label className="text-md font-normal text-gray-500">
                  years
                </label>
              </div>
              {errors.lifeExpectancy && (
                <p className="error-text">{errors.lifeExpectancy}</p>
              )}
            </div>

            {/* Current Monthly Expenses */}
            <div className="mb-6">
              <label htmlFor="currentMonthlyExpenses" className="block text-gray-600 font-medium mb-2">
                Current Monthly Expenses (₹)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.currentMonthlyExpenses
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  id="currentMonthlyExpenses"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  value={currentMonthlyExpenses}
                  onChange={handleCurrentMonthlyExpensesChange}
                  min="0"
                />
              </div>
              {errors.currentMonthlyExpenses && (
                <p className="error-text">{errors.currentMonthlyExpenses}</p>
              )}
            </div>

            {/* Inflation Rate */}
            <div className="mb-6">
              <label htmlFor="inflationRate" className="block text-gray-600 font-medium mb-2">
                Expected Inflation Rate (%)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.inflationRate
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <input
                  type="number"
                  id="inflationRate"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  value={inflationRate}
                  onChange={handleInflationRateChange}
                  min="0"
                  max="15"
                  step="0.1"
                />
                <label className="size-5 text-md font-normal text-gray-500">
                  %
                </label>
              </div>
              {errors.inflationRate && (
                <p className="error-text">{errors.inflationRate}</p>
              )}
            </div>

            {/* Pre-Retirement ROI */}
            <div className="mb-6">
              <label htmlFor="preRetirementROI" className="block text-gray-600 font-medium mb-2">
                Expected ROI (Pre-Retirement, %)
              </label>
              <div
                className={` flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.preRetirementROI
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <input
                  type="number"
                  id="preRetirementROI"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  value={preRetirementROI}
                  onChange={handlePreRetirementROIChange}
                  min="0"
                  max="60"
                  step="0.1"
                />
                <label className="size-5 text-md font-normal text-gray-500">
                  %
                </label>
              </div>
              {errors.preRetirementROI && (
                <p className="error-text">{errors.preRetirementROI}</p>
              )}
            </div>

            {/* Post-Retirement ROI */}
            <div className="mb-6">
              <label htmlFor="postRetirementROI" className="block text-gray-600 font-medium mb-2">
                Expected ROI (Post-Retirement, %)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.postRetirementROI
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <input
                  type="number"
                  id="postRetirementROI"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  value={postRetirementROI}
                  onChange={handlePostRetirementROIChange}
                  min="0"
                  max="60"
                  step="0.1"
                />
                <label className="size-5 text-md font-normal text-gray-500">
                  %
                </label>
              </div>
              {errors.postRetirementROI && (
                <p className="error-text">{errors.postRetirementROI}</p>
              )}
            </div>

            {/* Existing Savings */}
            <div className="mb-6">
              <label htmlFor="existingSavings" className="block text-gray-600 font-medium mb-2">
                Existing Retirement Savings (₹)
              </label>
              <div
                className={`flex items-center border rounded-xl  px-3 py-3 
                        ${
                          errors.existingSavings
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  id="existingSavings"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  value={existingSavings}
                  onChange={handleExistingSavingsChange}
                  min="0"
                />
              </div>
              {errors.existingSavings && (
                <p className="error-text">{errors.existingSavings}</p>
              )}
            </div>

            {/* Retirement Benefits */}
            <div className="mb-6">
              <label htmlFor="retirementBenefits" className="block text-gray-600 font-medium mb-2">
                Expected Retirement Benefits (₹)
              </label>
              <div
                className={` flex items-center border rounded-xl  px-3 py-3
                        ${
                          errors.retirementBenefits
                            ? "border-red-500 shadow-red-200 shadow"
                            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                        }`}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  id="retirementBenefits"
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  value={retirementBenefits}
                  onChange={handleRetirementBenefitsChange}
                  min="0"
                />
              </div>
              {errors.retirementBenefits && (
                <p className="error-text">{errors.retirementBenefits}</p>
              )}
            </div>
          </div>

          {/* Results Display */}
          <div className="p-12 bg-white lg:max-h-[40rem]  w-full sm:p-6   rounded-tr-lg  rounded-br-lg rounded-bl-lg shadow-shadowsmall">
            <div className="mt-5">
              {/* {showResults && Object.keys(errors).length === 0 ? ( */}
              <div className="space-y-6">
              
                <div className="flex justify-between py-2 border-b border-gray-200 mt-4">
                  <span className="text-gray-900 ">
                    Monthly Expenses at Retirement Age ({retirementAge} yrs):
                  </span>
                  <span className="font-normal text-gray-900">
                    {formatIndianRupee(monthlyExpensesAtRetirement)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 mt-4">
                  <span className="text-gray-900 ">
                    Total Corpus Required at Retirement:
                  </span>
                  <span className="font-normal text-gray-900">
                    {formatIndianRupee(corpusRequired)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 mt-4">
                  <span className="text-gray-900 ">
                    Monthly SIP Required to Achieve Goal:
                  </span>
                  <span className="font-normal text-gray-900">
                    {formatIndianRupee(monthlySIPRequired)}
                  </span>
                </div>
               

                {/* Detailed Retirement Insights */}
                <h3 className="text-xl font-normal text-gray-600  ">
                  Detailed Retirement Insights
                </h3>
{/* <span className=" mt-20"> */}
                
                <div className="flex justify-between py-2 border-b border-gray-200 mt-4">
                  <span className="text-gray-900 ">
                    Annual Income Required :
                  </span>
                  <span className="font-normal text-gray-900">
                    {formatIndianRupee(monthlyExpensesAtRetirement * 12)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 mt-4">
                  <span className="text-gray-900 ">
                    Additional Retirement Fund :
                  </span>
                  <span className="font-normal text-gray-900">
                    {formatIndianRupee(
                      corpusRequired -
                        existingSavings *
                          Math.pow(
                            1 + preRetirementROI / 100,
                            retirementAge - currentAge
                          ) -
                        retirementBenefits
                    )}
                  </span>
                </div>
                {/* </span> */}
               
              </div>
              <div className="flex text-primary text-xl font-normal justify-between items-center mt-28 py-3  border-t-2 border-t-primary">
                  <span className="">Monthly Savings :</span>
                  <span className="">
                    {formatIndianRupee(monthlySIPRequired)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 text-center mt-6">
                  *All values are estimates based on your inputs and assumed
                  rates. Consult a financial advisor for personalized planning.
                </p>
            </div>
          </div>
        </div>

        {/* add content
         */}

        <section className="mt-24">
          <div className="space-y-14 text-gray-700 text-base leading-relaxed">
            {/* What is Retirement Planning? Section */}
            <section className="">
              <h2 className="main-heading mb-3">
                What is Retirement Planning?
              </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                     <p className="mb-4 p-content">
                <strong className="text-blue-500">Retirement planning</strong>{" "}
                is the process of setting financial goals for your post-working
                life and developing a strategy to achieve them. It involves
                assessing your future expenses, estimating the funds required to
                cover them, and setting aside adequate savings and investments
                over your working years. Effective retirement planning aims to
                ensure you maintain your desired lifestyle and financial
                independence long after you stop earning an active income.
              </p>
                  </div>
             
               <div className="flex justify-center items-center  max-h-[350px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300">
                                
                                  <img
                                    src={gratuitylogo}
                                    alt="EPF - Retirement Savings and Security"
                                    className="w-full h-auto max-h-[350px] xl:max-h-[300px] object-contain"
                                  />
                                </div>
                                </div>
            </section>

            {/* Securing Your Future: Why a Retirement Calculator is Essential Section */}
            <section className="">
              <h2 className="main-heading mb-3">
                Securing Your Future: Why a Retirement Calculator is Essential
              </h2>
              <p className="mb-8 p-content">
                <strong className="text-blue-500">Retirement planning</strong>{" "}
                is not just about saving money; it's about building a financial
                foundation that ensures your comfort, independence, and desired
                lifestyle long after your working years. The{" "}
                <strong className="text-sm">
                  UniCX Retirement Calculator
                </strong>{" "}
                is a powerful tool designed to help you visualize your financial
                future, estimate the corpus you'll need, and understand if your
                current savings trajectory is sufficient to achieve your
                retirement goals. It brings clarity to a crucial, often
                overwhelming, aspect of long-term financial planning.
              </p>
            </section>

            {/* Why Retirement Planning is Crucial Section */}
            <section className="">
              {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-4"> */}
                <div>
                  <h2 className="main-heading mb-3">
                    The Indispensable Benefits of Early Retirement Planning
                  </h2>
                  <p className="mb-4 p-content">
                    <strong className="text-blue-500">Starting early</strong>{" "}
                    with your retirement planning, and regularly checking your
                    progress with a calculator, offers significant advantages:
                  </p>
                  {/* Removed list-disc list-inside for icon-based list */}
                  <ul className="list-none space-y-2 ">
                    <li className="list-content">
                      <strong className="flex items-start">
                        <Clock
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Harnessing Compounding Power:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Time is your greatest ally. The longer your investments
                        grow, the more the{" "}
                        <strong className="font-semibold">
                          power of compounding
                        </strong>{" "}
                        multiplies your wealth, even with smaller, consistent
                        contributions.
                      </span>
                    </li>
                    <li className="list-content">
                      <strong className="flex items-start">
                        <BarChart
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Beating Inflation:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Retirement is decades away.{" "}
                        <strong className="font-semibold">Inflation</strong>{" "}
                        will significantly erode the purchasing power of money.
                        Proper planning accounts for this, ensuring your future
                        savings can actually buy what you need.
                      </span>
                    </li>
                    <li className="list-content">
                      <strong className="flex items-start">
                        <Landmark
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Financial Independence:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Avoid relying on family or external support. A
                        well-planned retirement means you maintain control over
                        your finances and lifestyle choices.
                      </span>
                    </li>
                    <li className="list-content">
                      <strong className="flex items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Peace of Mind:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Knowing you're on track for a secure retirement reduces
                        financial stress and allows you to enjoy your present
                        more fully.
                      </span>
                    </li>
                    <li className="list-content">
                      <strong className="flex items-start">
                        <Target
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                        />
                        Achieving Lifestyle Goals:
                      </strong>
                      <span className="block ml-6 -mt-1">
                        Whether it's travel, hobbies, or simply comfortable
                        living, a calculator helps you quantify the cost of your
                        desired retirement lifestyle and plan accordingly.
                      </span>
                    </li>
                  </ul>
                </div>
                {/* Image for Why Retirement Planning is Crucial - Concept: Serene retirement scene */}
                {/* <div className="flex justify-center items-center mt-[-20px] max-h-[350px] border rounded cursor-pointer hover:scale-102 transition-transform duration-300"> */}
                  {/* <img
                src={retirementBenefitImage} // You'll generate this image later
                alt="Benefits of Early Retirement Planning - Financial Freedom"
                className="w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
              /> */}
                {/* </div> */}
              {/* </div> */}
            </section>

            {/* How to Use the UniCX Free Online Retirement Calculator Section */}
            <section className="">
              <h2 className="main-heading mb-3">
                How to Use the UniCX Free Online Retirement Calculator
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="p-content mb-4">
                    Our{" "}
                    <strong className="font-semibold">
                      intuitive UniCX Retirement Calculator
                    </strong>{" "}
                    simplifies the process of estimating your retirement needs.
                    To get started, simply input the following details:
                  </p>
                  <ol className="list-decimal list-inside space-y-3">
                    <li className="list-content">
                      <strong>Current Age:</strong> Your current age in years.
                    </li>
                    <li className="list-content">
                      <strong>Retirement Age:</strong> The age at which you plan
                      to retire.
                    </li>
                    <li className="list-content">
                      <strong>Current Monthly Expenses (₹):</strong> Your
                      estimated current monthly expenditure.
                    </li>
                    <li className="list-content">
                      <strong>Inflation Rate (%):</strong> The expected annual
                      inflation rate.
                    </li>
                    <li className="list-content">
                      <strong>
                        Expected Rate of Return (Pre-Retirement, %):
                      </strong>{" "}
                      Expected return from investments before retirement.
                    </li>
                    <li className="list-content">
                      <strong>
                        Expected Rate of Return (Post-Retirement, %):
                      </strong>{" "}
                      Expected return from investments after retirement.
                    </li>
                    <li className="list-content">
                      <strong>Current Retirement Savings (if any, ₹):</strong>{" "}
                      Your existing retirement corpus.
                    </li>
                    <li className="list-content">
                      <strong>Monthly Savings Towards Retirement (₹):</strong>{" "}
                      The amount you currently save monthly for retirement.
                    </li>
                    <li className="list-content">
                      <strong>View Your Results:</strong> The calculator will
                      show your estimated monthly expenses in retirement, the
                      total corpus needed, and your retirement readiness.
                    </li>
                  </ol>
                </div>
                {/* Image for How to Use Retirement Calculator - Concept: Abstract financial growth */}
                <div className="flex justify-center items-center  cursor-pointer hover:scale-102 transition-transform duration-300">
                  <img
                src={howuse} // You'll generate this image later
                alt="How to use UniCX Retirement Calculator - Step by step guide"
                className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
              />
                </div>
              </div>
            </section>

            {/* Key Factors Influencing Your Retirement Corpus */}
            <section className="">
              <h2 className="main-heading mb-3">
                Key Factors Influencing Your Retirement Corpus
              </h2>
              <p className="mb-4 p-content">
                Several variables play a critical role in determining how much
                you need for retirement and how quickly you can accumulate it:
              </p>
              {/* Removed list-disc list-inside for icon-based list */}
              <ul className="list-none space-y-3 ">
                <li className="list-content">
                  <strong className="flex items-start">
                    <DollarSign
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Inflation:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    The{" "}
                    <strong className="font-semibold">
                      silent wealth-eroder
                    </strong>
                    . What costs ₹100 today might cost ₹300-400 in 30 years due
                    to inflation. Accounting for it ensures your retirement
                    funds have real purchasing power.
                  </span>
                </li>
                <li className="list-content">
                  <strong className="flex items-start">
                    <TrendingUp
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Investment Returns:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    The higher and more consistent your annual returns, the
                    faster your corpus grows. However, balance returns with risk
                    tolerance.
                  </span>
                </li>
                <li className="list-content">
                  <strong className="flex items-start">
                    <Clock
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Retirement Age & Life Expectancy:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Retiring earlier means fewer earning years and more
                    retirement years to fund. Longer life expectancy means
                    needing a larger corpus.
                  </span>
                </li>
                <li className="list-content">
                  <strong className="flex items-start">
                    <Target
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Post-Retirement Expenses:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    Your desired lifestyle in retirement (travel, healthcare,
                    hobbies) directly dictates your annual expenses and,
                    consequently, the required corpus.
                  </span>
                </li>
                <li className="list-content">
                  <strong className="flex items-start">
                    <Briefcase
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0 text-blue-600"
                    />
                    Current Savings & Future Contributions:
                  </strong>
                  <span className="block ml-6 -mt-1">
                    The amount you've already saved and your consistent future
                    contributions are fundamental to reaching your goal.
                  </span>
                </li>
              </ul>
            </section>

            {/* Important Considerations for Robust Retirement Planning - Similar to your 'Critical Updates' box, but distinct color/icon */}
            <section className="">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
                <h2 className="text-2xl font-semibold  text-blue-700 mb-3 flex items-center">
                  <Target size={20} className="mr-3 mt-1 flex-shrink-0" />{" "}
                  {/* Using Target for planning focus */}
                  Important Considerations for Robust Retirement Planning
                </h2>
                <p className="text-blue-800 mb-4  tracking-wide text-[16px] font-[380]">
                  Beyond the numbers, a{" "}
                  <strong className="font-semibold">holistic approach</strong>{" "}
                  to retirement planning involves several key aspects:
                </p>
                {/* Image for Planning Considerations */}
                {/* <img
                src={planningConsiderationsImage} // You'll generate this image later
                alt="Important Considerations for Retirement Planning"
                className="w-auto h-16 mx-auto my-4" // Consistent with other info box image sizes
            /> */}
                {/* Removed list-inside for icon-based list */}
                <ul className="list-none space-y-3 text-blue-700 ">
                  <li className=" ">
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Start Early, Stay Consistent:
                    </strong>
                    <span className="block ml-6 -mt-1 tracking-wide text-[15px] font-[380]">
                      The{" "}
                      <strong className="">
                        most impactful advice
                      </strong>
                      . Even small amounts saved consistently over a long period
                      can become substantial due to compounding.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Diversify Investments:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Don't put all your eggs in one basket. A{" "}
                      <strong className="font-semibold">
                        diversified portfolio
                      </strong>{" "}
                      can mitigate risk and optimize returns.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Account for Healthcare:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      <strong className="font-semibold">
                        Healthcare costs
                      </strong>{" "}
                      typically rise with age. Factor in potential medical
                      expenses, health insurance, and critical illness cover.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Review Regularly:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Life circumstances, inflation, and market conditions
                      change.{" "}
                      <strong className="font-semibold">
                        Review your retirement plan annually
                      </strong>{" "}
                      and adjust your savings or investment strategy as needed.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Consider Professional Advice:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      A{" "}
                      <strong className="font-semibold">
                        financial advisor
                      </strong>{" "}
                      can provide personalized guidance, help you create a
                      tailored plan, and optimize your investment strategy.
                    </span>
                  </li>
                  <li>
                    <strong className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="mr-2 mt-1 flex-shrink-0"
                      />
                      Factor in Contingencies:
                    </strong>
                    <span className="block ml-6 -mt-1">
                      Build an{" "}
                      <strong className="font-semibold">emergency fund</strong>{" "}
                      separate from your retirement savings to handle unforeseen
                      circumstances without derailing your long-term goals.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Who Can Benefit from the UniCX Retirement Calculator? */}
            <section className="">
              <h2 className="main-heading mb-3">
                Who Can Benefit from the UniCX Retirement Calculator?
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <p className="p-content mb-4">
                    Our{" "}
                    <strong className="font-semibold">
                      Retirement Calculator
                    </strong>{" "}
                    is a versatile and invaluable tool for:
                  </p>
                  <ul className="list-disc list-inside space-y-3">
                    <li className="list-content">
                      <strong className="">
                        Young Professionals:
                      </strong>{" "}
                      To kickstart their retirement planning early and
                      understand the magic of compounding.
                    </li>
                    <li className="list-content">
                      <strong className="font-semibold">
                        Mid-Career Individuals:
                      </strong>{" "}
                      To assess if they are on track and make necessary
                      adjustments to their savings strategy.
                    </li>
                    <li className="list-content">
                      <strong className="font-semibold">
                        Individuals Approaching Retirement:
                      </strong>{" "}
                      To fine-tune their plans and ensure they have adequate
                      funds.
                    </li>
                    <li className="list-content">
                      <strong className="font-semibold">
                        Financial Advisors:
                      </strong>{" "}
                      As a quick estimation tool for client consultations and
                      initial planning discussions.
                    </li>
                    <li className="list-content">
                      <strong className="font-semibold">
                        Anyone Concerned About Their Future:
                      </strong>{" "}
                      To gain clarity and actionable insights into their
                      long-term financial security.
                    </li>
                  </ul>
                </div>
                {/* Image for Who Can Benefit - Concept: Diverse group of people planning their future */}
                <div className="flex justify-center items-center  cursor-pointer hover:scale-102 transition-transform duration-300">
                  <img
                    src={benifite} // You'll generate this image later
                    alt="Who can use Retirement Calculator - Diverse age groups"
                    className="w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain"
                />
                </div>
              </div>
            </section>

            {/* Why Use UniCX Retirement Calculator? - Similar to Advantages section */}
            <section className="">
              <h2 className="main-heading mb-3">
                Why Choose UniCX for Your Retirement Planning Needs?
              </h2>
              <p className="mb-4 p-content">
                Leveraging our{" "}
                <strong className="font-semibold">
                  free online Retirement Calculator
                </strong>{" "}
                offers significant advantages for your financial planning:
              </p>
              <ul className="list-disc list-inside space-y-3 ">
                <li className="list-content">
                  <strong className="">
                    User-Friendly Interface:
                  </strong>{" "}
                  Designed for simplicity, allowing anyone to estimate their
                  retirement needs with ease.
                </li>
                <li className="list-content">
                  <strong className="">
                    Comprehensive Inputs:
                  </strong>{" "}
                  Takes into account crucial factors like inflation and
                  pre/post-retirement returns for a more realistic projection.
                </li>
                <li className="list-content">
                  <strong className="">
                    Instant & Accurate Results:
                  </strong>{" "}
                  Get immediate insights into your retirement readiness.
                </li>
                <li className="list-content">
                  <strong className="">
                    Empowering Decisions:
                  </strong>{" "}
                  Helps you make informed choices about your savings and
                  investments.
                </li>
                <li className="list-content">
                  <strong className="">Free & Accessible:</strong>{" "}
                  A valuable resource available to you anytime, anywhere.
                </li>
              </ul>
            </section>

            {/* Simplified Retirement Calculation Concept & Example Scenario */}
            <section className="">
              <h2 className="main-heading mb-3">
                Simplified Retirement Calculation Concept & Example Scenario
              </h2>
              <p className="p-content mb-4">
                While the calculator handles the detailed math, the{" "}
                <strong className="">core idea</strong> is:
              </p>
              <h3 className="text-gray-600 tracking-wide text-[17px] font-[500] mt-4 mb-2">
                Core Calculation Principles:
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-3">
                <li className="list-content">
                  <strong>Future Value of Expenses:</strong> Project your
                  current monthly expenses into the future using an inflation
                  rate.
                </li>
                <li className="list-content">
                  <strong>Corpus Needed:</strong> Estimate the total corpus
                  required to cover your desired retirement lifestyle,
                  considering post-retirement returns.
                </li>
                <li className="list-content">
                  <strong>Future Value of Current & Future Savings:</strong>{" "}
                  Calculate how much your existing savings and regular
                  contributions will grow to by retirement.
                </li>
                <li className="list-content">
                  <strong>Gap Analysis:</strong> Compare your total estimated
                  future savings against the total corpus needed to identify any
                  shortfall or surplus.
                </li>
              </ul>

       <div className=" container mx-auto p-4 max-w-[1024px] mt-5">
  <div className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-sm">
    <table className="min-w-full bg-white">
      <thead className="bg-[#B7D5FE]">
        <tr>
          <th className="py-3 px-4 text-left text-gray-700 tracking-wide text-[16px] font-[500] border border-blue-300">
            Example Scenario
          </th>
          <th className="py-3 px-4 text-left text-gray-700 tracking-wide text-[16px] font-[500] border border-blue-300">
            Details
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-200">
        <tr className="bg-white">
          <td className="py-3 px-4 text-gray-800 tracking-wide text-[15px] font-[400] border border-blue-200">Current Age</td>
          <td className="py-3 px-4 text-gray-600 tracking-wide text-[15px] font-[380] border border-blue-200">30 years</td>
        </tr>
        <tr className="bg-blue-50">
          <td className="py-3 px-4 text-gray-800 tracking-wide text-[15px] font-[400] border border-blue-200">Retirement Age</td>
          <td className="py-3 px-4 text-gray-600 tracking-wide text-[15px] font-[380] border border-blue-200">60 years</td>
        </tr>
        <tr className="bg-white">
          <td className="py-3 px-4 text-gray-800 tracking-wide text-[15px] font-[400] border border-blue-200">Current Monthly Expenses</td>
          <td className="py-3 px-4 text-gray-600 tracking-wide text-[15px] font-[380] border border-blue-200">₹30,000</td>
        </tr>
        <tr className="bg-blue-50">
          <td className="py-3 px-4 text-gray-800 tracking-wide text-[15px] font-[400] border border-blue-200">Inflation Rate</td>
          <td className="py-3 px-4 text-gray-600 tracking-wide text-[15px] font-[380] border border-blue-200">6%</td>
        </tr>
        <tr className="bg-white">
          <td className="py-3 px-4 text-gray-800 tracking-wide text-[15px] font-[400] border border-blue-200">Expected Pre-Retirement Return</td>
          <td className="py-3 px-4 text-gray-600 tracking-wide text-[15px] font-[380] border border-blue-200">10%</td>
        </tr>
        <tr className="bg-blue-50">
          <td className="py-3 px-4 ttext-gray-800 tracking-wide text-[16px] font-[400] border border-blue-300">
           Expected Post-Retirement Return
          </td>
          <td className="py-3 px-4 text-gray-700 tracking-wide text-[15px] font-[400] border border-blue-300">
            7%
          </td>
        </tr>
          <tr className="bg-white">
          <td className="py-3 px-4 ttext-gray-800 tracking-wide text-[16px] font-[400] border border-blue-300">
          Estimated Total Corpus Needed at 60
          </td>
          <td className="py-3 px-4 text-gray-700 tracking-wide text-[15px] font-[400] border border-blue-300">
            3.5 crores
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


              <p className="mt-4 p-content">
                <strong className="font-semibold">
                  The Power of Compounding:
                </strong>{" "}
                This example illustrates how consistent contributions, coupled
                with annual salary increments and compounding interest, can lead
                to a significant retirement fund over time. The earlier you
                start, the more substantial your corpus can become.
              </p>
            </section>

            {/* FAQs Section */}
            <section className="">
              <h2 className="main-heading mb-3">
                Frequently Asked Questions (FAQs) about Retirement Planning
              </h2>
              <div className="space-y-2">
                {" "}
                {/* Added space-y-2 for vertical separation between FAQs */}
                {retirementFaqs.map((faq, i) => (
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
                      <p className="p-content">{faq.q}</p>
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
            <section className="pt-4 border-t mt-10">
              <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                This Retirement Calculator and information is developed and
                maintained by{" "}
                <strong className="text-blue-500">
                  UniCX (UniconsultX Solutions Private Limited)
                </strong>{" "}
                to help users estimate their retirement needs and plan for a
                secure financial future. For personalized financial advice or
                complex retirement planning scenarios, always consult with a
                qualified financial professional.
              </p>
            </section>
          </div>
        </section>
      </div>
    </section>
    </>
  );
}

export default RetirementCalculator;
