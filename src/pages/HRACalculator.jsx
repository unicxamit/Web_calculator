import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
// import "../css/Hra.css";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
  CheckCircle,
  MapPin,
  Users,
} from "lucide-react"; 
import Header from "../component/Header";
import hralogo from "../assets/images/calculators_img/BG IMAGES/hra1.png"
import howuse from "../assets/images/calculators_img/BG IMAGES/how3.png";



const HRACalculator = () => {
  const [basic, setBasic] = useState("600000");
  const [da, setDa] = useState("998");
  const [hra, setHra] = useState("240000");
  const [rent, setRent] = useState("180000");
  const [isMetro, setIsMetro] = useState(false);

  const [error, setError] = useState("");
  const [errorDa, setErrorDa] = useState("");
  const [errorHra, setErrorHra] = useState("");
  const [errorRent, setErrorRent] = useState("");

  const basicNum = parseFloat(basic) || 0;
  const daNum = parseFloat(da) || 0;
  const hraNum = parseFloat(hra) || 0;
  const rentNum = parseFloat(rent) || 0;

  const salary = basicNum + daNum;

  const actualHRAReceived = hraNum;
  const percentOfSalary = isMetro ? 0.5 : 0.4;
  const percentOfBasic = percentOfSalary * basicNum;
  const rentExcess = rentNum - 0.1 * salary;
  const rentPaidExcess = rentExcess > 0 ? rentExcess : 0;

  const hraExempt = Math.min(actualHRAReceived, percentOfBasic, rentPaidExcess);
  const hraTaxable = actualHRAReceived - hraExempt;

  const validateValue = (value) => {
    if (!/^\d+$/.test(value)) {
      return "Only numbers are allowed";
    }
    const numeric = parseInt(value, 10);
    if ((numeric < 100 ) || numeric > 100000000) {
      return "Value must be between 1000 and 100000000";
    }
    return "";
  };

  const handleCostChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setBasic("");
      setError("");
      return;
    }
    const errorMsg = validateValue(value);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setBasic(value);
      setError("");
    }
  };

  const handleDaChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setDa("");
      setErrorDa("");
      return;
    }
    const errorMsg = validateValue(value);
    if (errorMsg) {
      setErrorDa(errorMsg);
    } else {
      setDa(value);
      setErrorDa("");
    }
  };

  const handleHraChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setHra("");
      setErrorHra("");
      return;
    }
    const errorMsg = validateValue(value);
    if (errorMsg) {
      setErrorHra(errorMsg);
    } else {
      setHra(value);
      setErrorHra("");
    }
  };

  const handleRentChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setRent("");
      setErrorRent("");
      return;
    }
    const errorMsg = validateValue(value);
    if (errorMsg) {
      setErrorRent(errorMsg);
    } else {
      setRent(value);
      setErrorRent("");
    }
  };
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "Can I claim HRA if I live with my parents?",
      a: "Yes, you can, provided you genuinely pay rent to your parents, and they declare this as rental income in their tax returns. Ensure you have proper rent receipts to avoid issues.",
    },
    {
      q: "Do I need my landlord's PAN for HRA exemption?",
      a: "Yes, if your annual rent payment exceeds ₹1,00,000 (Rupees One Lakh), you must provide your landlord's PAN to your employer. If the landlord does not have a PAN, a declaration to that effect is required.",
    },
    {
      q: "What if I move to a new city during the financial year?",
      a: "Your HRA exemption will be calculated proportionately for the period you paid rent in each type of city (metro/non-metro) and for the actual HRA received during those periods. The calculation considers the rent paid in each city.",
    },
    {
      q: "Can both husband and wife claim HRA exemption for the same rented property?",
      a: "Only one person can claim the HRA exemption for the same property to avoid double deductions. If both are paying rent, they can claim HRA proportionally to their rent payment if it's genuinely split and documented, or one person can claim the full eligible amount.",
    },
    {
      q: "What is Basic Salary + DA for HRA calculation?",
      a: "For HRA calculation, 'salary' typically includes your Basic Salary and Dearness Allowance (DA), but only if DA forms part of your retirement benefits. Other allowances or perquisites are generally excluded from this calculation.",
    },
  ];
  return (
    <><Header/>
    <section className="container-div mt-14">
      <div className=" second-container ">
      <div className=""> 

      
        <div className="mb-14">
          <h1 className="md:text-4xl text-3xl font-medium text-textColor mb-5 ">HRA Calculator</h1>
          {/* <p className="mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            veniam beatae veritatis possimus nisi quaerat ad, omnis voluptas
            harum odit quod eveniet pariatur ex vel magni reprehenderit nobis
            minus dolore.
          </p> */}
        </div>
        <div className="grid-layout ">
          <div className="  ">
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">Basic salary received (₹)</label>

              <div
                className={`flex items-center border rounded-xl  px-3 py-3
        ${
          error
            ? "border-red-500 shadow-red-300"
            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
        }
      `}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={basic}
                  onChange={handleCostChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              {error && <p className="error-text">{error}</p>}
            </div>
            <div className="mb-6">
              <label className=" block text-gray-600 font-medium mb-2">
                Dearness Allowance received (₹)
              </label>

              <div
                className={`flex items-center border rounded-xl  px-3 py-3
        ${
          errorDa
            ? "border-red-500 shadow-red-300"
            : "border-gray-200 focus-within:border-primary  focus-within:shadow-primary focus-within:shadow"
        }
      `}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={da}
                  onChange={handleDaChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
               {errorDa && (
                <p className="error-text">{errorDa}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">
                HRA received (₹)
              </label>

              <div
                className={`flex items-center border rounded-xl  px-3 py-3
        ${
          errorHra
            ? "border-red-500 shadow-red-300"
            : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
        }
      `}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={hra}
                  onChange={handleHraChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              {errorHra && (
                <p className="error-text">{errorHra}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">
                Total Rent paid (₹)
              </label>

              <div
                className={`flex items-center border rounded-xl  px-3 py-3
        ${errorRent
           ? "border-red-500 shadow-red-300"
           : "border-gray-200  focus-within:border-primary focus-within:shadow-primary focus-within:shadow"
       }
      `}
              >
                <label className="size-5 text-md font-normal text-gray-500">
                  ₹
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={rent}
                  onChange={handleRentChange}
                  className="text-gray-900 font-[25rem] w-full outline-none bg-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              {errorRent && (
                <p className="error-text">{errorRent}</p>
              )}
            </div>

            <p className="block text-gray-600 font-medium mb-2">
              Do you live in Delhi, Mumbai, Kolkata or Chennai?
            </p>
            <div className="flex gap-4 mt-2">
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="metro"
                  checked={isMetro}
                  onChange={() => setIsMetro(true)}
                />
                <label
                  htmlFor="yes"
                  className="ml-1 text-gray-600 font-medium"
                >
                  Yes
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no"
                  name="metro"
                  checked={!isMetro}
                  onChange={() => setIsMetro(false)}
                />
                <label
                  htmlFor="no"
                  className="ml-1 text-gray-600 font-medium"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="p-12 bg-white  w-full sm:p-6  rounded-tr-lg  rounded-br-lg rounded-bl-lg shadow-shadowsmall">
            {" "}
            {/* flex-col to stack its children vertically */}
            <div className=" mt-5 space-y-6">
           
   <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-900">Actual HRA received</span>
        <span className="font-normal text-gray-900">₹{actualHRAReceived}</span>
      </div>
              {/* <div className="flex flex-col py-2 space-y-4"> */}
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className=" text-gray-900">
                    {isMetro ? "50%" : "40%"} of basic salary
                  </p>
                  <span className="font-normal text-gray-900">
                    ₹{percentOfBasic.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className=" text-gray-900">
                    Rent Paid in excess of 10% of salary
                  </p>
                  <span className="font-normal text-gray-900">
                    ₹{rentPaidExcess.toFixed(2)}
                  </span>
                </div>

                {/* <hr className="my-4 pb-4 border-gray-500" /> */}

                {/* <span className=" text-gray-800 block   text-md font-normal ">
                  The least of the above three is exempt from HRA
                </span> */}

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className=" text-gray-900">Amount of exempted HRA</p>
                  <span className="font-normal text-gray-900">₹{hraExempt.toFixed(2)}</span>
                </div>

                 
              
              

            </div>
            
                <div className="flex text-primary text-xl font-normal justify-between items-center mt-28 py-3  border-t-2 border-t-primary  ">
          <h2 className="">Total Amount</h2>
          <p className="">₹{hraTaxable.toFixed(2)}</p>
        </div>
          </div>
        </div>
     

      <div className="mt-24 ">
        <div className="space-y-14 text-gray-700 text-base leading-relaxed">
          {/* Intro - Expanded with Updates/Rules style */}
          <section className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3 gap-2 flex items-center">
              <AlertCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
              HRA Tax Exemption:
            Important Updates & Rules You Need to Know!
            </h2>
            <p className="text-blue-700 mb-4  tracking-wide text-base font-[400]">
              Understanding the <strong>House Rent Allowance (HRA)</strong>{" "}
              rules is crucial for salaried individuals looking to minimize
              their income tax liability. Stay informed about these key
              regulations to accurately claim your HRA exemption and ensure
              compliance.
            </p>
            <ul className="list-inside space-y-6 text-blue-700">
              <li>
                <strong className="flex items-start  tracking-wide text-[16px] font-[400] ">
                  <FileText size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Mandatory Landlord PAN for High Rent:
                </strong>
                <span className="block ml-6 -mt-1  tracking-wide text-[15px] font-[380]">
                  If your annual rent payment exceeds{" "}
                  <strong>₹1,00,000 (Rupees One Lakh)</strong>, it is mandatory
                  to furnish your landlord's PAN details to your employer.
                  Ensure you obtain this to claim your full HRA benefit.
                </span>
              </li>
              <li>
                <strong className="flex items-start tracking-wide text-[16px] font-[400]">
                  <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Retain Rent Receipts as Proof:
                </strong>
                <span className="block ml-6 -mt-1  tracking-wide text-[15px] font-[380]">
                  Always collect and retain{" "}
                  <strong>proper rent receipts</strong> for the rent paid. These
                  documents are essential evidence for your HRA claim and may be
                  required during tax assessments.
                </span>
              </li>
              <li>
                <strong className="flex items-start  tracking-wide text-[16px] font-[400]">
                  <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Metro vs. Non-Metro City Definition:
                </strong>
                <span className="block ml-6 -mt-1  tracking-wide text-[15px] font-[380]">
                  The percentage of HRA exemption depends on your city of
                  residence. <strong>Metro cities</strong> are defined as Delhi,
                  Mumbai, Kolkata, and Chennai (50% exemption), while all other
                  cities fall under the <strong>non-metro</strong> category (40%
                  exemption). Confirm your city status for accurate calculation.
                </span>
              </li>
              <li>
                <strong className="flex items-start  tracking-wide text-[16px] font-[400]">
                  <Users size={18} className="mr-2 mt-1 flex-shrink-0" />
                  Claiming HRA for Rent Paid to Parents:
                </strong>
                <span className="block ml-6 -mt-1  tracking-wide text-[15px] font-[380]">
                  You can claim HRA exemption even if you pay rent to your
                  parents, provided the transaction is genuine. Your parents
                  must declare this rent as income in their tax returns. Ensure
                  all documentation is clear and verifiable.
                </span>
              </li>
            </ul>
            <p className="text-blue-800 mt-4  tracking-wide text-[16px] font-[380]">
              Our UniCX HRA Calculator is here to help you navigate these rules
              and accurately calculate your tax exemption.
            </p>
          </section>

          {/* What is House Rent Allowance (HRA)? - Standard section style */}
          <section>
            <h2 className="main-heading mb-3">
              What is House Rent Allowance (HRA)?
            </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
            <p className="mb-4 p-content">
              <strong className="text-blue-500">House Rent Allowance (HRA)</strong> is a special allowance
              provided by employers to their employees to help cover the cost of
              rented accommodation. It is a part of a salaried individual's
              compensation package and is specifically designed to provide tax
              relief on the housing expenses incurred by the employee.
            </p>
            <p className="p-content">
              While HRA is a part of your salary, it is not fully taxable; a
              certain portion of it can be claimed as an exemption under{" "}
              <strong className="text-blue-500">Section 10(13A)</strong> of the Income Tax Act, 1961,
              provided certain conditions are met. This makes HRA a crucial
              component for effective tax planning for those living in rented
              homes.
            </p>
            </div>
             <div className="flex justify-center items-center  max-h-[350px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300">
                                            
                                              <img
                                                src={hralogo}
                                                alt="EPF - Retirement Savings and Security"
                                                className="w-full h-auto max-h-[350px] xl:max-h-[300px] object-contain"
                                              />
                                            </div>
                            </div>
          </section>

          {/* Key Benefits & Tax Exemption Rules of HRA - NOW MATCHING NPS CARD STYLE */}
          <section className="">
            {" "}
            {/* No direct background or border on the section */}
            <h2 className="main-heading  mb-3">
              Key Benefits & Tax Exemption Rules of HRA
            </h2>
            <p className="mb-5 p-content">
              The primary benefit of HRA is its potential for tax exemption,
              which directly reduces your taxable income. The amount of HRA that
              is exempt from tax is the{" "}
              <strong className="text-blue-500"> least of the following three amounts</strong>:
            </p>
            <div className="space-y-4">
              {" "}
              {/* Container for individual cards */}
              <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                <h3 className=" tracking-wide text-[16px] font-[380] text-blue-800">
                  Actual HRA Received:
                </h3>
                <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                  The full House Rent Allowance amount that your employer pays
                  to you.
                </p>
              </div>
              <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                <h3 className=" tracking-wide text-[16px] font-[380] text-blue-800">
                  Rent Paid Minus 10% of Basic Salary + DA:
                </h3>
                <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                  The actual rent you pay for your accommodation, reduced by 10%
                  of your Basic Salary plus Dearness Allowance (if it forms part
                  of your retirement benefits).
                </p>
              </div>
              <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                <h3 className=" tracking-wide text-[16px] font-[380] text-blue-800">
                  Percentage of Basic Salary + DA Based on City:
                </h3>
                <ul className="list-disc list-inside ml-4 mt-1 ">
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>50% of Basic Salary + DA</strong> if you live in a{" "}
                    <strong>metro city</strong> (Delhi, Mumbai, Kolkata,
                    Chennai).
                  </li>
                  <li className="text-gray-600 tracking-wide text-[14px] font-[380]">
                    <strong>40% of Basic Salary + DA</strong> if you live in any{" "}
                    <strong>non-metro city</strong>.
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-[16px] text-gray-700 font-[400]">
              <strong>Note:</strong> For HRA calculation purposes, 'salary'
              typically includes Basic Salary and Dearness Allowance (DA), only
              if DA is part of your retirement benefits. It generally excludes
              other allowances and perquisites.
            </p>
            <p className="mt-4 text-gray-600 tracking-wide text-[17px] font-[380]">
              <strong className="text-blue-500">Eligibility for HRA Exemption:</strong> You must be a
              salaried individual, actively paying rent for accommodation, and
              not own a house in the city for which the HRA is claimed.
            </p>
          </section>

          {/* How to Use the UniCX Free Online HRA Calculator - With a simpler list style, no grid with image */}
          <section className="">
            <h2 className="main-heading mb-3">
              How to Use the UniCX Free Online HRA Calculator
            </h2>
             <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                  <div className=""> <p className="mb-4 p-content">
              Our UniCX HRA Calculator makes determining your tax-exempt HRA
              simple and quick. Just follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li className="list-content">
                <strong>Basic Salary (Monthly ₹):</strong> Input your monthly
                basic salary as per your payslip.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Dearness Allowance (DA) (Monthly ₹):</strong> Enter your
                monthly Dearness Allowance if it is considered for retirement
                benefits. If not applicable, you can enter '0'.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>HRA Received (Monthly ₹):</strong> Provide the actual
                monthly House Rent Allowance you receive from your employer.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Actual Rent Paid (Monthly ₹):</strong> Fill in the
                actual monthly rent you pay for your accommodation.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>City Type:</strong> Select whether your residence is in
                a 'Metro City' (Delhi, Mumbai, Kolkata, Chennai) or a 'Non-Metro
                City'. This selection impacts the tax exemption calculation.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>View Your Results:</strong> The calculator will
                instantly display your "Exempt HRA Amount" and "Taxable HRA
                Amount."
              </li>
            </ol>
            </div>
            <div className="flex justify-center items-center   max-h-[399px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300  ">
                      <img
                        src={howuse}
                        alt="Abstract minimalist graphic representing interconnectedness of GST types"
                        className="w-full max-w-lg object-contain h-auto max-h-[400px] xl:max-h-[400px] "
                      />
                    </div>
                    </div>
           
          </section>

          {/* Understanding Your HRA Calculator Results - Standard section with example box */}
          <section className="">
            <h2 className="main-heading mb-3">
              Understanding Your HRA Calculator Results
            </h2>
            <p className="mb-4 p-content">
              Once you input your details, our calculator provides a clear
              breakdown of your HRA benefits:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Exempt HRA Amount:</strong> This is the portion of your
                HRA that is <strong>completely free from income tax</strong>.
                This amount will reduce your gross taxable income, leading to
                direct tax savings.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Taxable HRA Amount:</strong> This is the remaining
                portion of your HRA (Actual HRA Received - Exempt HRA Amount)
                that will be <strong>added to your taxable income</strong>. This
                portion will be taxed as per your applicable income tax slab.
              </li>
            </ul>

    <div className="container mx-auto p-4 max-w-[1024px] mt-5">
  <div className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-sm">
    <table className="min-w-full bg-white">
      <thead className="bg-[#B7D5FE]">
        <tr>
          <th className="py-3 px-4 text-left text-gray-700 tracking-wide text-[16px] font-[500] border border-blue-300">
            Example Calculation
          </th>
          <th className="py-3 px-4 text-center text-gray-700 tracking-wide text-[16px] font-[500] border border-blue-300">
            Details
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-200">
        <tr className="bg-white">
          <td className="py-3 px-4 p-content border border-blue-200">
            Basic Salary + DA
          </td>
          <td className="py-3 px-4 list-content text-center border border-blue-200">
            ₹50,000
          </td>
        </tr>
        <tr className="bg-blue-50">
          <td className="py-3 px-4 p-content border border-blue-200">
            HRA Received
          </td>
          <td className="py-3 px-4 list-content text-center border border-blue-200">
            ₹20,000
          </td>
        </tr>
        <tr className="bg-white">
          <td className="py-3 px-4 p-content border border-blue-200">
            Actual Rent Paid
          </td>
          <td className="py-3 px-4 list-content text-center border border-blue-200">
            ₹18,000
          </td>
        </tr>
        <tr className="bg-blue-50">
          <td className="py-3 px-4 p-content border border-blue-200">
            City Type
          </td>
          <td className="py-3 px-4 list-content text-center border border-blue-200">
            Metro
          </td>
        </tr>
        <tr className="bg-white">
          <td className="py-3 px-4 p-content border border-blue-300">
            Estimated Exempt HRA
          </td>
          <td className="py-3 px-4 list-content text-center border border-blue-300">
            ₹13,000 (approx.)
          </td>
        </tr>
        <tr className="bg-blue-50">
          <td className="py-3 px-4 p-contentborder border-blue-300">
            Estimated Taxable HRA
          </td>
          <td className="py-3 px-4 list-content text-center border border-blue-300">
            ₹7,000 (approx.)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


          </section>

          {/* Important HRA Rules & Considerations - Standard list style with varied headers */}
          <section className="">
            <h2 className="main-heading mb-3">
              Important HRA Rules & Considerations
            </h2>
            <p className="mb-4 p-content">
              To ensure you can successfully claim HRA exemption, keep the
              following rules and considerations in mind:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">Proof of Rent Payment:</strong> It
                is mandatory to keep proper rent receipts or bank statements
                showing rent transfers. Your employer will typically ask for
                these proofs.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">Rent Agreement:</strong> A valid
                rent agreement is crucial, especially for higher rent amounts,
                as it serves as primary proof of your rental obligation.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">Landlord's PAN Details:</strong> If
                your annual rent payment exceeds{" "}
                <strong>₹1,00,000 (Rupees One Lakh)</strong>, you must furnish
                the PAN of your landlord to your employer. A declaration is
                required if the landlord does not have a PAN.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">Living in Your Own House:</strong>{" "}
                You cannot claim HRA exemption if you live in a house that you
                own in the same city for which you are claiming HRA.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">Paying Rent to Parents:</strong> You
                can pay rent to your parents and claim HRA exemption, provided
                the transaction is genuine, and your parents declare the rental
                income in their tax returns.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">
                  No HRA in Salary (Section 80GG):
                </strong>{" "}
                If you are a salaried individual but do not receive HRA as part
                of your salary, or if you are a self-employed professional
                paying rent, you can still claim a deduction for rent paid under{" "}
                <strong>Section 80GG</strong> of the Income Tax Act.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong className="">Metro vs. Non-Metro Cities:</strong>{" "}
                For HRA purposes, metro cities generally include{" "}
                <strong>Delhi, Mumbai, Kolkata, and Chennai</strong>. All other
                cities fall under the <strong>'non-metro'</strong> category.
              </li>
            </ul>
          </section>

          {/* Advantages of Using the UniCX HRA Calculator - NOW MATCHING NPS CARD STYLE */}
          <section className="">
            {" "}
            {/* No direct background or border on the section */}
            <h2 className="main-heading mb-3">
              Advantages of Using the UniCX HRA Calculator
            </h2>
            <p className="mb-4 p-content">
              Leveraging our <strong>free online HRA calculator</strong> offers
              significant benefits for accurate tax planning:
            </p>
            <div className="space-y-4">
              {" "}
              {/* Container for individual cards */}
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className=" tracking-wide text-[16px] font-[380] text-blue-800">
                  Accurate Exemption Calculation:
                </h3>
                <p className="text-gray-600 tracking-wide text-[14px] font-[380]">
                  Instantly determine the precise tax-exempt portion of your
                  HRA, avoiding manual errors.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className=" tracking-wide text-[16px] font-[380] text-blue-800">
                  Simplify Complex Rules:
                </h3>
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  Our calculator handles the "least of three" rule, making
                  complex tax provisions easy to understand.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className=" tracking-wide text-[15px] font-[380] text-blue-800">
                  Efficient Tax Planning:
                </h3>
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  Get clear insights into how HRA impacts your taxable income,
                  aiding in better financial decisions.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="tracking-wide text-[16px] font-[380] text-blue-800">
                  Time-Saving:
                </h3>
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  Quickly get results without needing to manually apply
                  percentages and deductions.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="tracking-wide text-[16px] font-[380] text-blue-800">
                  User-Friendly Interface:
                </h3>
                <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
                  Designed for ease of use, even for individuals without
                  in-depth tax knowledge.
                </p>
              </div>
            </div>
          </section>

          {/* Tip box - Standard yellow theme */}
          <section className="">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
              <p className="tracking-wide text-[15px] font-[380] text-yellow-700">
                <strong>UniCX Tip:</strong> Always retain all your rent receipts
                and rent agreement copies. These are crucial documents for
                claiming HRA exemption and may be required by your employer or
                during income tax assessment. For rent paid in cash, ensure the
                receipts are duly signed by the landlord.
              </p>
            </div>
          </section>

          {/* UniCX Expert Support & Resources - Consistent styling */}
          <section id="contact" className="">
            <h2 className="main-heading mb-3">
              Beyond Calculations: UniCX - Your Partner in Tax & Financial
              Planning
            </h2>
            <p className="mb-4 p-content">
              At <strong className="text-blue-500">UniconsultX Solutions Private Limited (UniCX)</strong>,
              our commitment extends beyond providing a powerful HRA calculator.
              We understand that navigating the complexities of income tax and
              financial planning requires comprehensive support. That's why we
              offer <strong>comprehensive support and resources</strong> to help
              you optimize your finances.
            </p>
            <h3 className="text-gray-600 tracking-wide text-[17px] font-[400] mt-4 mb-2">
              Our Expert Financial Services Include:
            </h3>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Income Tax Filing Assistance:</strong> Expert help with
                accurate and timely filing of your income tax returns.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Tax Planning & Optimization:</strong> Personalized
                strategies to maximize your tax savings through various
                deductions and exemptions (including HRA, 80C, etc.).
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Investment Advisory:</strong> Guidance on suitable
                investment avenues to achieve your financial goals.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Financial Consulting:</strong> Holistic financial
                planning to grow and protect your wealth.
              </li>
              <li className="text-gray-600 tracking-wide text-[15px] font-[380]">
                <strong>Compliance & Advisory:</strong> Keeping you updated on
                the latest tax laws and regulations.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 tracking-wide text-[16px] font-[380]">
              <strong>Optimize Your Savings with UniCX:</strong> We are
              dedicated to being your reliable source for all things tax and
              financial planning. Explore our website for more in-depth
              articles, common FAQs, and the latest updates. Partner with UniCX
              for peace of mind in your financial journey.
            </p>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                Get Expert Tax Consultation
              </button>
            </div>
          </section>

          {/* FAQs - Interactive section, with consistent blue FAQ active background */}
          <section>
            <h2 className="main-heading mb-3">
              Frequently Asked Questions (FAQs) about HRA
            </h2>
            <div className="space-y-2">
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

          {/* Footer note - Consistent styling */}
          <footer className="pt-4 border-t mt-6">
            <p className="text-gray-600 tracking-wide text-[15px] font-[380]">
              This HRA calculator and information is developed and maintained by{" "}
              <strong>UniCX (UniconsultX Solutions Private Limited)</strong> to
              help users simplify House Rent Allowance computations as per
              current Indian income tax laws. For complex tax situations or
              personalized advice, always consult with a qualified tax
              professional or{" "}
              <a href="#contact" className="text-blue-600 hover:underline">
                contact UniCX directly
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
    </div>
    </section>
    </>
   
  );
};

export default HRACalculator;
