import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign for consistency
import {
  Landmark,
  Briefcase,
  Calculator,
  ScrollText,
  Scale,
  Award,
  FileText,
  ChevronDown,
  ChevronUp,
  HandCoins,
 
  HelpCircle,
} from "lucide-react";
import Header from "../component/Header";
import gratuitylogo from "../assets/BG IMAGES/gratuity1.png"
function GratuityCalculator() {
  const [lastSalary, setLastSalary] = useState("10000");
  const [yearsOfService, setYearsOfService] = useState("5");
  const [covered, setCovered] = useState("yes"); // 'yes' = Covered under Act, 'no' = Not covered
  const [gratuity, setGratuity] = useState(0);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;

    const salary = parseFloat(lastSalary);
    const years = parseFloat(yearsOfService);

    if (isNaN(salary) || salary < 100 || salary > 1000000000) {
      newErrors.lastSalary = "Salary must be between ₹100 and ₹1,00,00,000.";
      isValid = false;
    }

    if (isNaN(years) || years <= 0 || years > 50) {
      newErrors.yearsOfService = "Years of service must be between 1 and 50.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateGratuity = () => {
    if (!validateInputs()) {
      setGratuity(0);
      return;
    }

    const salary = parseFloat(lastSalary);
    const years = parseFloat(yearsOfService);
    let actualYears = Math.floor(years);
    let yearsForCalculation = actualYears;
    let amount = 0;

    if (covered === "yes") {
      // If more than or equal to 0.75 year, round up
      if (years - actualYears >= 0.75) {
        yearsForCalculation = actualYears + 1;
      }

      // 15 days' salary for every completed year
      amount = Math.floor((salary * 15 * yearsForCalculation) / 26);
    } else {
      // Not covered: 0.5 month's salary per completed year
      amount = Math.floor((salary / 2) * actualYears);
    }

    setGratuity(amount);
  };

  useEffect(() => {
    calculateGratuity();
  }, [lastSalary, yearsOfService, covered]);

  const formatNumber = (num) => {
    if (num === null || isNaN(num)) return "";
    return parseFloat(num).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value <= 1000000000) {
      setLastSalary(value);
      setErrors((prev) => ({ ...prev, lastSalary: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lastSalary: "Salary must be between ₹100 and ₹1,00,00,000.",
      }));
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value <= 50) {
      setYearsOfService(value);
      setErrors((prev) => ({ ...prev, yearsOfService: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        yearsOfService: "Years of service must be between 1 and 50.",
      }));
    }
  };

  const handleCoverageChange = (e) => {
    setCovered(e.target.value);
  };
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the minimum service period required to be eligible for gratuity?",
      a: "Under the Payment of Gratuity Act, 1972, an employee must complete at least five years of continuous service to be eligible for gratuity. This rule has exceptions in cases of death or disablement.",
    },
    {
      q: "Is gratuity taxable?",
      a: "Gratuity is taxable, but there are significant exemptions. For government employees, it's fully exempt. For private sector employees, the least of the actual gratuity received, ₹20 lakhs (or ₹10 lakhs for those not covered by the Act), or a specific formula-based amount is exempt.",
    },
    {
      q: "Can I get gratuity if I resign?",
      a: "Yes, you can receive gratuity upon resignation, provided you have completed at least five years of continuous service with the employer.",
    },
    {
      q: "What is 'Last Drawn Salary' for gratuity calculation?",
      a: "For employees covered by the Gratuity Act, 'Last Drawn Salary' typically includes Basic Salary + Dearness Allowance. For those not covered, it often includes Basic Salary + Dearness Allowance + all other fixed monthly allowances, as per company policy.",
    },
    {
      q: "Can an employer deny gratuity payment?",
      a: "An employer can only deny or forfeit gratuity in specific circumstances, such as termination due to an employee's gross misconduct, riotous or disorderly behavior, violence, or any act involving moral turpitude, which caused damage or loss to the employer.",
    },
  ];

  return (
    <><Header/>
    <div className=" container-div">
      <div className=" second-container">
        <div className="my-4">
          <h1 className="text-4xl font-medium text-textColor mb-5">Gratuity Calculator</h1>
          <p className="mb-8">
            Calculate your estimated gratuity amount based on your last drawn
            salary, years of service, and whether your organization is covered
            under the Gratuity Act.
          </p>
        </div>

      
        <div className="grid-layout">
          <div className="">
            {/* Input: Last Drawn Salary */}
            <div className="mb-6">
              <label htmlFor="lastSalary" className=" block text-gray-600 font-medium mb-2">
                Last Drawn Salary (Basic + DA) (₹)
              </label>
              <div
                className={`  flex items-center border rounded-xl  px-3 py-3 
                                            ${
                                              errors.lastSalary
                                                ? "border-borderColor shadow-red-400"
                                                : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  id="lastSalary"
                  value={lastSalary}
                  onChange={handleAmountChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  min="0"
                  placeholder="e.g., 50000"
                  aria-label="Last Drawn Salary"
                />
              </div>
              {errors.lastSalary && (
                <p className="error-text">{errors.lastSalary}</p>
              )}
            </div>
            {/* Input: Years of Service */}
            <div className="mb-6">
              <label htmlFor="yearsOfService" className="block text-gray-600 font-medium mb-2">
                Years of Service
              </label>
              <div
                className={` flex items-center border rounded-xl  px-3 py-3 
                                            ${
                                              errors.yearsOfService
                                                ? "border-borderColor shadow-red-400"
                                                : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
                                            }`}
              >
                <input
                  type="number"
                  id="yearsOfService"
                  value={yearsOfService}
                  onChange={handleYearChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  min="0"
                  step="0.01" // Allow decimal for months (e.g., 5.5 years)
                  placeholder="e.g., 10.5"
                  aria-label="Years of Service"
                />
              </div>
              {errors.yearsOfService && (
                <p className="error-text">{errors.yearsOfService}</p>
              )}
            </div>
            {/* Select: Covered under Gratuity Act */}
            <div className="mb-6">
              <label htmlFor="covered" className="block text-gray-600 font-medium mb-2">
                Are you covered under the Gratuity Act?
              </label>
              <div className="flex items-center border rounded-xl w-full  py-3  focus-within:border-primary focus-within:shadow-primary focus-within:shadow">
                <select
                  id="covered"
                  value={covered}
                  onChange={(e) => setCovered(e.target.value)}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  aria-label="Covered under Gratuity Act"
                >
                  <option value="yes">Yes (Covered)</option>
                  <option value="no">No (Not Covered)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-12 bg-white max-h-[180px]  w-full sm:p-6  rounded-tr-lg  rounded-br-lg rounded-bl-lg shadow-shadowsmall">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="flex text-primary text-xl font-normal justify-between items-center mt-0 py-3  border-t-2 border-t-primary  ">
                  <span className=" ">
                    Estimated Gratuity Amount:
                  </span>
                  <span className="">
                    ₹ {formatNumber(gratuity) || "0.00"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  * This calculation is an estimate and may vary based on
                  specific company policies and the Gratuity Act rules.
                </p>
              </div>
            </div>
          </div>
        </div>
<section className="mt-10">
  <div className="space-y-14 text-gray-700 text-base leading-relaxed">
    {/* What is Gratuity? */}
    <section>
      <h2 className="text-2xl font-bold mb-3">What is Gratuity?</h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                      <p className="mb-4">
        <strong>Gratuity</strong> is a lump sum payment made by an employer to an
        employee upon the employee's superannuation (retirement),
        resignation, death, or disablement, provided they meet certain
        eligibility criteria, primarily related to the length of
        service. It's a statutory benefit for employees covered under
        the <strong>Payment of Gratuity Act, 1972</strong>, and a policy-based
        benefit for others.
      </p>
       <p>
        It serves as a long-term benefit for employees, recognizing
        their loyalty and contribution to the company over the years.
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

    {/* The Payment of Gratuity Act, 1972 (and its Scope) */}
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <Landmark size={22} className="flex-shrink-0" />
        The Payment of Gratuity Act, 1972 (and its Scope)
      </h2>
      <p className="mb-4">
        The <strong>Payment of Gratuity Act, 1972</strong> is a central act that
        mandates the payment of gratuity to employees engaged in
        factories, mines, oilfields, plantations, ports, railway
        companies, shops or other establishments, and for matters
        connected therewith or incidental thereto.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          <strong className="text-lg">Applicability:</strong> Applies to
          establishments employing <strong>10 or more persons</strong> on any day in
          the preceding 12 months. Once the Act becomes applicable, it
          continues to apply even if the number of employees falls below
          10.
        </li>
        <li>
          <strong className="text-lg">Purpose:</strong> To provide a
          social security net for employees in their old age or upon
          cessation of employment after significant service.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <Briefcase size={22} className="flex-shrink-0" />
        Eligibility Criteria for Gratuity
      </h2>
      <p className="mb-4">
        To be eligible for gratuity under the Payment of Gratuity Act,
        1972, an employee must have completed <strong>at least five years of
        continuous service</strong> with the same employer.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          <strong className="text-lg">
            Exceptions to 5-Year Rule:
          </strong>{" "}
          The five-year continuous service rule does not apply in cases
          of:
          <ul className="list-disc list-inside ml-6 mt-1">
            <li>Death of the employee.</li>
            <li>
              Disablement of the employee due to accident or disease.
            </li>
          </ul>
          In such cases, gratuity is payable even if the service period
          is less than five years.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <Calculator size={22} className="flex-shrink-0" />
        How Gratuity is Calculated?
      </h2>
      <p className="mb-4">
        The method of calculating gratuity differs based on whether the
        employee is covered under the Payment of Gratuity Act, 1972.
      </p>

      <h3 className="font-semibold text-xl mt-6 mb-3">
        A. For Employees Covered Under the Payment of Gratuity Act, 1972
      </h3>
      <p className="mb-2">
        The gratuity amount is calculated using the following formula:
      </p>
      <p className="bg-gray-100 p-3 rounded-md text-gray-800 font-mono text-center mb-4">
        <strong>Gratuity = (Last Drawn Salary) &times; (15/26) &times; (Number
        of Years of Service)</strong>
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
        <li>
          <strong>Last Drawn Salary:</strong> This includes Basic Salary + Dearness
          Allowance (DA). Any other allowances are generally not
          included.
        </li>
        <li>
          <strong>15/26:</strong> Represents 15 days' salary for every completed year
          of service, assuming a month has 26 working days.
        </li>
        <li>
          <strong>Number of Years of Service:</strong>
          <ul className="list-disc list-inside ml-6 mt-1">
            <li>
              If the service period is six months or more in a year, it
              is rounded up to the next full year. (e.g., 5 years 7
              months is considered 6 years).
            </li>
            <li>
              If the service period is less than six months in a year,
              it is ignored. (e.g., 5 years 4 months is considered 5
              years).
            </li>
          </ul>
        </li>
        <li>
          <strong>Maximum Limit:</strong> The maximum gratuity payable under the Act
          is currently <strong>₹20 Lakhs</strong> (as per the Gratuity Amendment Act,
          2018).
        </li>
      </ul>

      <h3 className="font-semibold text-xl mt-6 mb-3">
        B. For Employees NOT Covered Under the Payment of Gratuity Act,
        1972
      </h3>
      <p className="mb-2">
        For employees working in establishments not covered by the Act,
        gratuity payment is typically based on the company's internal
        policy or employment contract. The calculation formula commonly
        used in such cases is:
      </p>
      <p className="bg-gray-100 p-3 rounded-md text-gray-800 font-mono text-center mb-4">
        <strong>Gratuity = (Last Drawn Salary) &times; (15/30) &times; (Number
        of Years of Service)</strong>
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Last Drawn Salary:</strong> This usually includes Basic Salary +
          Dearness Allowance + all other allowances (fixed monthly
          payments).
        </li>
        <li>
          <strong>15/30:</strong> Represents 15 days' salary for every completed year
          of service, assuming a month has 30 working days.
        </li>
        <li>
          <strong>Number of Years of Service:</strong> No rounding up for months is
          generally applied; only completed years of service are
          considered.
        </li>
        <li>
          <strong>Maximum Limit:</strong> The maximum limit is as per the company's
          policy, often capped at ₹20 Lakhs, similar to the Act, but can
          vary.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <Scale size={22} className="flex-shrink-0" />
        Taxation of Gratuity
      </h2>
      <p className="mb-4">
        The tax treatment of gratuity varies based on the type of
        employer:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          <strong className="text-lg">
            For Government Employees (Central/State/Local Authority):
          </strong>{" "}
          Gratuity received by government employees is <strong>fully exempt
          from income tax</strong>.
        </li>
        <li>
          <strong className="text-lg">
            For Private Sector Employees (Covered under Payment of
            Gratuity Act, 1972):
          </strong>{" "}
          The *least* of the following three amounts is exempt from tax:
          <ol className="list-decimal list-inside ml-6 mt-1">
            <li>Actual Gratuity Received.</li>
            <li>
              ₹20,00,000 (Twenty Lakh Rupees) - The statutory limit.
            </li>
            <li>
              15 days' salary for each completed year of service or part
              thereof in excess of six months (calculated as per the
              Act's formula: Last Drawn Salary &times; 15/26 &times; No.
              of Years of Service).
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg">
            For Private Sector Employees (NOT Covered under Payment of
            Gratuity Act, 1972):
          </strong>{" "}
          The *least* of the following three amounts is exempt from tax:
          <ol className="list-decimal list-inside ml-6 mt-1">
            <li>Actual Gratuity Received.</li>
            <li>
              ₹10,00,000 (Ten Lakh Rupees) - The statutory limit (Note:
              This limit was ₹10 Lakhs and is not updated to ₹20 Lakhs
              for this category unless specified by latest
              rules/policy).
            </li>
            <li>
              Half-month's average salary for each completed year of
              service (calculated as: Average Last 10 months' Salary
              &times; 1/2 &times; No. of Completed Years of Service).
            </li>
          </ol>
        </li>
        <li>
          <strong className="text-lg">
            Gratuity received by dependents of an employee who dies in
            service:
          </strong>{" "}
          This is <strong>fully exempt from tax</strong>.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <Calculator size={22} className="flex-shrink-0" />
        How to Use the UniCX Free Online Gratuity Calculator
      </h2>
      <p className="mb-4">
        Our UniCX Gratuity Calculator makes estimating your potential
        returns simple and quick. Follow these steps to see your wealth
        growth potential:
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-4">
        <li>
          <strong>Coverage Status:</strong> Select whether you are 'Covered under
          Gratuity Act' or 'Not Covered under Gratuity Act'. This
          determines the calculation method.
        </li>
        <li>
          <strong>Last Drawn Basic Salary (Monthly ₹):</strong> Enter your monthly
          Basic Salary.
        </li>
        <li>
          <strong>Last Drawn Dearness Allowance (Monthly ₹):</strong> Enter your
          monthly Dearness Allowance (DA). If applicable for those not
          covered, include other fixed allowances here.
        </li>
        <li>
          <strong>Years of Service (Completed Years):</strong> Enter the number of
          full years you have completed with the employer.
        </li>
        <li>
          <strong>Months in Excess (if any):</strong> If applicable (for those
          covered by the Act), enter the number of additional months (0
          to 11).
        </li>
        <li>
          <strong>Click "Calculate":</strong> The calculator will instantly display
          your "Estimated Gratuity Amount" and "Taxable Gratuity (if
          any)."
        </li>
      </ol>
    </section>

    {/* Understanding Your Gratuity Calculator Results */}
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <FileText size={22} className="flex-shrink-0" />
        Understanding Your Gratuity Calculator Results
      </h2>
      <p className="mb-4">
        Once you input your details, our calculator provides a clear
        breakdown of your potential gratuity:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2">
        <li>
          <strong>Estimated Gratuity Amount:</strong> This is the calculated gratuity
          payment you are potentially eligible for.
        </li>
        <li>
          <strong>Tax Exempt Gratuity:</strong> This is the portion of your gratuity
          that is exempt from income tax, based on the applicable rules.
        </li>
        <li>
          <strong>Taxable Gratuity:</strong> This is any remaining portion of your
          gratuity that will be added to your taxable income and taxed
          as per your applicable income tax slab.
        </li>
      </ul>

      <div className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm mt-6">
        <p className="text-gray-700 mb-2">
          📊 <strong>Example Calculation (Covered by Act):</strong>
        </p>
        <p className="text-green-700 font-semibold">
          Last Drawn Basic + DA: <strong>₹50,000</strong>
        </p>
        <p className="text-green-700 font-semibold">
          Years of Service: <strong>15 Years, 8 Months</strong> (Calculated as 16
          years)
        </p>
        <p className="text-blue-800 font-bold text-lg mt-2">
          Estimated Gratuity Amount: <strong>₹4,61,538</strong>
        </p>
        <p className="text-blue-800 font-bold text-lg">
          Tax Exempt (Example): <strong>₹4,61,538</strong>
        </p>
        <p className="text-blue-800 font-bold text-lg">
          Taxable Gratuity: <strong>₹0</strong>
        </p>
      </div>
    </section>

    {/* Important Gratuity Rules & Considerations */}
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <ScrollText size={22} className="flex-shrink-0" />
        Important Gratuity Rules & Considerations
      </h2>
      <p className="mb-4">
        While gratuity is a significant benefit, keep these important
        points in mind:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong className="text-lg">Continuous Service:</strong> This
          means uninterrupted service, including periods of leave,
          absence due to accident/sickness, or strike/lockout not due to
          employee's fault.
        </li>
        <li>
          <strong className="text-lg">Termination:</strong> Gratuity is
          payable upon termination of employment for any reason
          (superannuation, resignation, death, disablement, or even
          retrenchment).
        </li>
        <li>
          <strong className="text-lg">Forfeiture of Gratuity:</strong>{" "}
          Gratuity can be wholly or partially forfeited if the
          employee's services have been terminated for certain acts of
          omission or negligence causing damage or loss to the employer,
          or for riotous/disorderly conduct, or any act involving moral
          turpitude committed in the course of employment.
        </li>
        <li>
          <strong className="text-lg">Employer's Obligation:</strong>{" "}
          The employer is legally obligated to pay gratuity within 30
          days of it becoming payable. If not, they are liable to pay
          simple interest on the unpaid amount.
        </li>
      </ul>
    </section>

    {/* Advantages of Using the UniCX Gratuity Calculator */}
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <Award size={22} className="flex-shrink-0" />
        Advantages of Using the UniCX Gratuity Calculator
      </h2>
      <p className="mb-4">
        Leveraging our <strong>free online Gratuity calculator</strong> offers
        significant benefits for accurate financial planning:
      </p>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
            <Calculator size={20} className="flex-shrink-0" /> <strong>Accuracy
            & Ease:</strong>
          </h3>
          <p className="text-sm text-gray-600">
            Ensures precise calculation based on relevant Act or company
            policy, simplifying complex computations.
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
            <Briefcase size={20} className="flex-shrink-0" /> <strong>Clarity on
            Eligibility:</strong>
          </h3>
          <p className="text-sm text-gray-600">
            Helps understand eligibility conditions and their impact on
            your payout.
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
            <Scale size={20} className="flex-shrink-0" /> <strong>Tax Impact
            Analysis:</strong>
          </h3>
          <p className="text-sm text-gray-600">
            Provides insight into the taxability of your gratuity
            payout.
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
            <HandCoins size={20} className="flex-shrink-0" /> <strong>Financial
            Planning:</strong>
          </h3>
          <p className="text-sm text-gray-600">
            Aids in estimating your retirement or end-of-service corpus
            for better financial security.
          </p>
        </div>
      </div>
    </section>

    {/* Frequently Asked Questions (FAQs) about Gratuity */}
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <HelpCircle size={22} className="flex-shrink-0" />
        Frequently Asked Questions (FAQs) about Gratuity
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`py-2 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
              openFAQ === i
                ? "bg-blue-50 rounded-lg shadow-md border border-blue-200"
                : ""
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
              <p className="font-semibold">{faq.q}</p>
              {openFAQ === i ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            <p
              className={`text-gray-800 text-md font-normal px-3 ${
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

    {/* --- */}
    <div className="my-10 border-t border-gray-200"></div>

    {/* UniCX Expert Support & Resources */}
    <section id="contact">
      <h2 className="text-2xl font-bold mb-3">
        Beyond Calculations: UniCX - Your Partner in Financial Planning
      </h2>
      <p className="mb-4">
        At <strong>UniconsultX Solutions Private Limited (UniCX)</strong>, our
        commitment extends beyond providing powerful financial
        calculators. We understand that navigating end-of-service
        benefits, taxation, and overall financial planning requires
        expert guidance. That's why we offer <strong>comprehensive support and
        resources</strong> to help you optimize your finances.
      </p>
      <h3 className="font-semibold text-xl mt-4 mb-2">
        Our Expert Financial Services Include:
      </h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>Retirement Planning:</strong> Strategies to ensure a secure and
          comfortable post-employment life.
        </li>
        <li>
          <strong>Tax Consulting:</strong> Expert advice on gratuity taxation, income
          tax filing, and overall tax optimization.
        </li>
        <li>
          <strong>Wealth Management:</strong> Holistic financial planning to grow and
          protect your wealth.
        </li>
        <li>
          <strong>Investment Advisory:</strong> Guidance on suitable investment
          avenues for your long-term goals.
        </li>
      </ul>
      <p className="mt-4">
        <strong>Plan Your Financial Future with UniCX:</strong> We are dedicated to
        being your reliable source for all things financial planning and
        tax advisory. Explore our website for more in-depth articles,
        common FAQs, and the latest updates. Partner with UniCX for
        peace of mind in your wealth creation journey.
      </p>
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          Get Expert Financial Planning Consultation
        </button>
      </div>
    </section>

    {/* Footer note */}
    <footer className="pt-6 border-t mt-6">
      <p className="text-sm text-gray-500">
        This Gratuity calculator and information is developed and
        maintained by <strong>UniCX (UniconsultX Solutions Private Limited)</strong>
        to help users estimate their potential gratuity as per general
        understanding of the Payment of Gratuity Act, 1972, and common
        practices. For precise calculations, specific legal advice, or
        personalized financial planning, always consult with a qualified
        legal or tax professional or{" "}
        <a href="#contact" className="text-blue-600 hover:underline">
          contact UniCX directly
        </a>
        . Tax laws are subject to change.
      </p>
    </footer>
  </div>
</section>
      </div>
    </div>
    </>
  );
}

export default GratuityCalculator;
