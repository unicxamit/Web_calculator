import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import gstlogo from "../assets/gstlogo.png";
import gsttype from "../assets/gsttypes.png";
// import critical from "../assets/criticalupdates.png";
import calculator from "../assets/BG IMAGES/how2.png";
import benifite from "../assets/BG IMAGES/2 png .png"
import "../css/Gst.css";
import Header from "../component/Header";
function GSTCalculator() {
  const [show, setShow] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [cost, setCost] = useState("100");
  const [gst, setGst] = useState(["0.00"]);
  const [error, setError] = useState("");
  const [supplyType, setSupplyType] = useState("Inter-state");
  const rates = [0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];
  const [gstAmount, setGstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [igstAmount, setIgstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // GST calculation logic
  const toggleShow = () => setShowAll(!showAll);
  useEffect(() => {
    const costNum = parseFloat(cost) || 0;
    const gstNum = parseFloat(gst) || 0;

    // GST Exclusive
    const gstAmt = (costNum * gstNum) / 100;
    const totalAmt = costNum + gstAmt;

    // GST Inclusive
    const basePrice = (costNum * 100) / (100 + gstNum);
    const gstInclusive = costNum - basePrice;

    const cgst = show ? gstAmt / 2 : gstInclusive / 2;
    const sgst = show ? gstAmt / 2 : gstInclusive / 2;
    const igst = show ? gstAmt : gstInclusive;

    if (show) {
      setGstAmount(gstAmt.toFixed(2));
      setTotalAmount(totalAmt.toFixed(2));
    } else {
      setGstAmount(gstInclusive.toFixed(2));
      setTotalAmount(basePrice.toFixed(2));
    }

    setCgstAmount(cgst.toFixed(2));
    setSgstAmount(sgst.toFixed(2));
    setIgstAmount(igst.toFixed(2));
    if (!gst && rates?.length > 0) {
      setGst(rates[0]);
    }
  }, [cost, gst, show, rates]);

  const handleCostChange = (e) => {
    const value = e.target.value;

    // Allow empty string (user clearing input)
    if (value === "") {
      setCost("");
      setError("");
      return;
    }

    // Ensure it's a number
    if (!/^\d+$/.test(value)) {
      setError("Only numbers are allowed");
      return;
    }

    // Check for 15 digit limit
    if (value > 1000000000) {
      setError("Value must be between 1 and 10000000000");
      return;
    }

    setCost(value);
    setError("");
  };

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (i) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const faqs = [
    {
      q: "What are the major GST changes effective July 2025?",
      a: "From July 1, 2025, GSTR-3B will be hard-locked based on auto-populated data from GSTR-1/1A/IFF, meaning manual edits for outward supply liability will no longer be allowed. A strict three-year time limit for filing all GST returns (GSTR-1, 3B, etc.) is also now in effect. The new E-Way Bill 2.0 portal has also been launched for improved stability and real-time synchronization.",
    },
    {
      q: "Why is GSTR-3B becoming non-editable from July 2025?",
      a: "This change aims to ensure greater consistency between GSTR-1 (sales data) and GSTR-3B (tax payment summary), reducing discrepancies, curbing fraudulent Input Tax Credit (ITC) claims, and moving towards a more digitally governed and accurate GST ecosystem.",
    },
    {
      q: "What is the new 3-year time limit for filing GST returns?",
      a: "Effective July 1, 2025, any GST return (including GSTR-1, GSTR-3B, GSTR-9) that is more than three years past its original due date will be permanently blocked from filing on the GST portal. Taxpayers with pending returns older than this limit were advised to clear them by June 30, 2025.",
    },
    {
      q: "Is the UniCX GST calculator updated for 2025 with the latest rules?",
      a: "Yes. UniCX is committed to keeping this calculator and all our resources fully updated in line with current Indian GST rules, latest notifications, and all applicable slab rates to ensure accuracy for 2025 and beyond.",
    },
    {
      q: "What are the current GST slab rates in India?",
      a: "The primary GST slab rates are 0%, 5%, 12%, 18%, and 28%. Specific goods and services fall under different slabs. It's important to note that discussions are ongoing regarding potential rationalization of these slabs, including the possible removal of the 12% bracket. Some essential items are exempt from GST.",
    },
    {
      q: "What is Input Tax Credit (ITC) under GST?",
      a: "<strong>Input Tax Credit (ITC)</strong> is a fundamental mechanism under GST that allows businesses to claim credit for the GST paid on purchases of goods or services used in the course or furtherance of business. This reduces the overall tax burden by avoiding the cascading effect of taxes.",
    },
  ];

  return (
    <>
      <Header />
      <section className="container-div mt-14 ">
        <div className="second-container ">
          <div className="">
            <section className=" mb-14 ">
              <h1 className="text-4xl font-medium text-textColor mb-5">
                GST Calculator
              </h1>
              {/* <p className="mb-12 text-base">
           The <strong>GST Calculator</strong> by <strong>UniCX</strong>, your
          trusted partner from <strong>UniconsultX Solutions Private Limited</strong>,
          allows you to calculate Goods and Services Tax (GST) accurately and
          instantly. Whether you're issuing invoices, checking product pricing,
          or needing to understand your tax breakdown, this
          <strong> free online tool</strong> simplifies your GST computations
          and ensures compliance with Indian tax laws.
        </p> */}
            </section>
            <div className="grid-layout  ">
              {/* Left section */}
              <div className="">
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">
                    Amount (₹)
                  </label>
                  <div
                    className={`flex items-center border rounded-xl  px-3 py-3  ${
                      error
                        ? "border-red-400 shadow-sm"
                        : " focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                    }`}
                  >
                    <FaRupeeSign className="text-gray-500 mr-2 " />
                    <input
                      type="number"
                      value={cost}
                      onChange={handleCostChange}
                      className="text-gray-900 font-[25rem] w-full outline-none bg-transparent "
                      placeholder="0.00"
                    />
                  </div>
                  {error && <p className="error-text">{error}</p>}
                </div>

                {/* Calculation Type */}
                <div className="my-8">
                  <label className=" block text-gray-600 font-medium mb-2">
                    Calculation Type
                  </label>
                  <div className="type-buttons w-full ">
                    <button
                      className={`type-button py-2 ${
                        show
                          ? "bg-primary text-white "
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setShow(true)}
                    >
                      Adding GST
                    </button>
                    <button
                      className={`type-button py-2 ${
                        !show
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setShow(false)}
                    >
                      Exclusive GST
                    </button>
                  </div>
                </div>

                {/* GST Rate Selection */}
                <div className="my-8">
                  <label className=" block text-gray-600 font-medium mb-2">
                    GST Rate (%)
                  </label>
                  <div className="rate-grid w-full">
                    {rates.map((rate, index) => {
                      const isVisible = showAll || index < 11;
                      const isActive = parseFloat(gst) === rate;
                      return (
                        isVisible && (
                          <button
                            key={index}
                            onClick={() => setGst(rate)}
                            className={`rate-button ${
                              isActive
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-800 hover:border-primary"
                            }`}
                          >
                            {rate}%
                          </button>
                        )
                      );
                    })}
                  </div>
                </div>

                {/* Supply Type */}
                <div className="mt-9 mb-6">
                  <label className=" block text-gray-600 font-medium mb-2">
                    Supply Type
                  </label>
                  <div className=" w-full">
                    <select
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium outline-none focus-within:border-primary focus-within:shadow-xl focus-within:shadow-blue-50"
                      value={supplyType}
                      onChange={(e) => setSupplyType(e.target.value)}
                    >
                      <option value="Inter-state">Inter-state</option>
                      <option value="Intra-state">Intra-state</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right - Results */}
              <div className="p-12 bg-white  w-full sm:p-6  rounded-tr-lg  rounded-br-lg rounded-bl-lg shadow-shadowsmall">
                <div className="mt-5 space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-900">Original Amount</span>
                    <span className="font-normal text-gray-900">
                      ₹ {parseFloat(cost).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-900">GST Amount</span>
                    <span className="font-normal text-gray-900">
                      ₹ {gstAmount}
                    </span>
                  </div>
                  <div className="pt-3 ">
                    <p className="text-sm text-gray-600 font-medium mb-3">
                      Breakdown
                    </p>
                    {supplyType === "Intra-state" ? (
                      <>
                        <div className="flex justify-between border-b border-gray-200 py-4">
                          <span className="text-gray-900">CGST (50%)</span>
                          <span className="font-normal text-gray-900">
                            ₹ {cgstAmount}
                          </span>
                        </div>
                        <div className="flex justify-between  border-b border-gray-200 py-4">
                          <span className="text-gray-900">SGST (50%)</span>
                          <span className="font-normal text-gray-900">
                            ₹ {sgstAmount}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-900">IGST (100%)</span>
                        <span className="font-normal text-gray-900">
                          ₹ {igstAmount}
                        </span>
                      </div>
                    )}
                    <div className=" flex justify-between py-2 border-b border-gray-200 mt-4">
                      <span className="text-gray-900">GST Rate</span>
                      <span className="font-normal text-gray-900">{gst}%</span>
                    </div>
                    <div className="flex text-primary text-xl font-normal justify-between items-center mt-20 py-3  border-t-2 border-t-primary  ">
                      <h2 className="">Total Amount</h2>
                      <p className="">₹ {totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24">
              <div className="space-y-14 text-gray-700 leading-relaxed">
                {/* Intro - Expanded */}
                <section className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md shadow-sm ">
                  <h2 className="text-[23px] font-semibold text-blue-700 mb-3 gap-2 flex items-center">
                    <AlertCircle
                      size={18}
                      className="mr-2 mt-1 flex-shrink-0"
                    />
                    Important GST Updates: What's New from July 2025!
                  </h2>
                  <p className="text-blue-600 text-[16px] font-[300]  mb-4">
                    The <strong>GST framework in India</strong> has undergone
                    significant procedural updates effective{" "}
                    <strong>July 1, 2025</strong>. It is crucial for all
                    taxpayers to understand and adapt to these changes to
                    maintain compliance and avoid penalties.
                  </p>
                  <ul className="list-inside space-y-6 text-blue-600">
                    <li>
                      <strong className="flex text-[18px] font-[400]  items-start mb-2">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        GSTR-3B Auto-Locking:
                      </strong>
                      <span className="block ml-6 -mt-1 text-base font-[300] ">
                        From the <strong>July 2025 tax period</strong> (to be
                        filed in August), your <strong>GSTR-3B</strong> will be{" "}
                        <strong>hard-locked</strong> based on auto-populated
                        data from <strong>GSTR-1, GSTR-1A, or IFF</strong>.
                        Manual editing of outward supply liability will no
                        longer be permitted. Ensure your{" "}
                        <strong>GSTR-1/IFF</strong> is accurate, and use{" "}
                        <strong>GSTR-1A</strong> for any corrections *before*
                        filing GSTR-3B.
                      </span>
                    </li>
                    <li>
                      <strong className="flex font-normal text-[18px] items-start mb-2">
                        <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
                        Strict 3-Year Time Limit for Returns:
                      </strong>
                      <span className="block ml-6 -mt-1 text-base font-[300]">
                        A <strong>strict three-year deadline</strong> is now
                        enforced for filing all GST returns (
                        <strong>GSTR-1, 3B, 4, 5, 5A, 6, 7, 8, 9</strong>) from
                        their original due dates. Returns older than this limit
                        were permanently blocked from{" "}
                        <strong>July 1, 2025</strong>. Ensure all past
                        compliance is up to date to avoid loss of Input Tax
                        Credit (ITC) or penalties.
                      </span>
                    </li>
                    <li>
                      <strong className="flex text-[18px] font-normal mb-2 items-start">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        New E-Way Bill Portal 2.0:
                      </strong>
                      <span className="block ml-6 -mt-1 text-base font-[300]">
                        The <strong>E-Way Bill 2.0 portal</strong> (accessible
                        at{" "}
                        <a
                          href="https://ewaybill2.gst.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          ewaybill2.gst.gov.in
                        </a>
                        ) has been launched for enhanced stability,
                        uninterrupted access, and real-time synchronization of
                        data with the existing portal. Your existing credentials
                        work on both.
                      </span>
                    </li>
                    <li>
                      <strong className="flex items-start text-[18px] font-normal mb-2">
                        <CheckCircle
                          size={18}
                          className="mr-2 mt-1 flex-shrink-0"
                        />
                        12% GST Slab Review:
                      </strong>
                      <span className="block ml-6 -mt-1 text-base">
                        The GST Council is actively discussing a major revamp,
                        potentially
                        <strong>removing the 12% GST slab</strong> and
                        redistributing items between the 5% and 18% brackets.
                        Stay tuned for official announcements, as this could
                        significantly impact various goods and services.
                      </span>
                    </li>
                  </ul>
                  <p className="text-blue-800 mt-4 font-semibold">
                    UniCX is here to help you navigate these changes! For
                    personalized guidance,{" "}
                    <a
                      href="#contact"
                      className="text-blue-700 hover:underline"
                    >
                      contact our GST experts
                    </a>
                    .
                  </p>
                </section>
                <section className="">
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4  ">
                    <div className=" ">
                      <h2 className="text-2xl text-textColor font-semibold mb-3">
                        What is Goods and Services Tax (GST) in India?
                      </h2>
                      <span className="space-y-3">
                        <p className="text-gray-600 tracking-wide text-[15px] font-[360] ">
                          <strong className="text-blue-600">GST (Goods and Services Tax)</strong> is a
                          landmark unified, indirect tax system introduced in
                          India on <strong>July 1, 2017</strong>. It marked a
                          significant reform, replacing a multitude of cascading
                          indirect taxes such as{" "}
                          <strong className="text-blue-600">Value Added Tax (VAT)</strong>,{" "}
                          <strong className="text-blue-600">Service Tax,Excise Duty</strong>,{" "}
                           and more. GST is levied
                          at each step of the supply chain on the "supply" of
                          goods and services and is ultimately borne by the
                          final consumer, creating a "One Nation, One Tax"
                          regime across India.
                        </p>
                        <p className="text-gray-700 tracking-wide text-base font-[360]">
                          As a{" "}
                          <strong className="text-blue-600">
                            comprehensive, multi-stage, destination-based tax
                          </strong>
                          , GST aims to streamline taxation, reduce complexity,
                          and foster economic growth by eliminating the
                          tax-on-tax effect through the robust{" "}
                          <strong className="text-blue-600">Input Tax Credit (ITC)</strong> mechanism.
                          Goods and services are primarily categorized into{" "}
                          <strong className="text-blue-600">five distinct GST slabs : </strong>
                          <strong className="text-blue-600">0%, 5%, 12%, 18%, and 28%</strong>, although
                          some products like petroleum, alcoholic drinks, and
                          electricity are not taxed under GST and fall under the
                          purview of individual state governments.
                        </p>
                      </span>
                    </div>
                    <div className="flex justify-center items-center   max-h-[399px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300 ">
                      <img
                        src={gstlogo}
                        alt="GST India Logo | Goods and Services Tax explained"
                        className=" w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
                      />
                    </div>
                  </div>
                </section>
                {/* Types of GST - Expanded */}
                <section className="">
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    Types of GST in India: CGST, SGST, IGST, UTGST Explained
                  </h2>
                  <p className="mb-4 text-gray-700 tracking-wide text-base font-[360]">
                    Understanding the <strong className="text-blue-600">four types of GST</strong> is
                    crucial for accurate tax computation and compliance, as they
                    apply depending on the nature and location of the supply:
                  </p>
                  {/* The "Abstract Interconnectedness" image you liked */}

                  <div className="grid lg:grid-cols-2 gap-4">
                    <div className="flex justify-center items-center   max-h-[399px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300  ">
                      <img
                        src={gsttype}
                        alt="Abstract minimalist graphic representing interconnectedness of GST types"
                        className="w-full max-w-lg object-contain h-auto max-h-[400px] xl:max-h-[400px] "
                      />
                    </div>
                    <div className="space-y-4 ">
                      <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                        <h3 className="font-[400] text-[#314259] text-lg mb-2">
                          CGST (Central GST)
                        </h3>
                        <p className=" text-gray-700 tracking-wide text-[14px] font-[300] ">
                          <strong>Central Goods and Services Tax</strong>.
                          Collected by the <strong>Central Government</strong>{" "}
                          for{" "}
                          <strong>
                            intra-state (within the same state/UT)
                          </strong>{" "}
                          supply of goods and services. Governed by the CGST Act
                          and is charged along with SGST (or UTGST).
                        </p>
                      </div>
                      <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                        <h3 className="font-[400] text-[#314259] text-lg mb-2">
                          SGST (State GST)
                        </h3>
                        <p className="text-gray-700 tracking-wide text-[14px] font-[300]">
                          <strong>State Goods and Services Tax</strong>.
                          Collected by the <strong>State Government</strong> for{" "}
                          <strong>
                            intra-state (within the same state/UT)
                          </strong>{" "}
                          supply of goods and services. Governed by the
                          respective SGST Act and is charged along with CGST.
                        </p>
                      </div>
                      <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                        <h3 className="font-[400] text-[#314259] text-lg mb-2">
                          IGST (Integrated GST)
                        </h3>
                        <p className="text-gray-700 tracking-wide text-[14px] font-[300]">
                          <strong>Integrated Goods and Services Tax</strong>.
                          Collected by the <strong>Central Government</strong>{" "}
                          on{" "}
                          <strong>
                            inter-state (between different states/UTs)
                          </strong>{" "}
                          supply of goods and services, as well as on{" "}
                          <strong>imports</strong>. The collected IGST is then
                          distributed among the respective states.
                        </p>
                      </div>
                      <div className="bg-[#ddebff] p-4 rounded-lg shadow-sm border-2 border-blue-300">
                        <h3 className="font-[400] text-[#314259] text-lg mb-2">
                          UTGST (Union Territory GST)
                        </h3>
                        <p className="text-gray-700 tracking-wide text-[14px] font-[300]">
                          <strong>
                            Union Territory Goods and Services Tax
                          </strong>
                          . Applicable on the supply of goods or services within
                          any of{" "}
                          <strong>India's eight Union Territories</strong>.
                          Collected along with CGST, similar to SGST.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* How to Use This Calculator - Expanded */}
                <section className="">
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    How to Use the UniCX Free Online GST Calculator
                  </h2>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                    <div className="">
                      <p className="text-gray-700 tracking-wide text-base font-[360]">
                        Our <strong className="text-blue-600">user-friendly GST calculator</strong>{" "}
                        simplifies complex tax computations. Follow these simple
                        steps to get <strong>accurate results instantly</strong>
                        :
                      </p>
                      <ol className="list-decimal list-inside space-y-4 mt-3">
                        <li className="text-gray-700 tracking-wide text-base font-[360]">
                          <strong className="">Enter the Price:</strong> Input the base price
                          of your goods or services in the designated "Amount"
                          field.
                        </li>
                        <li className="text-gray-700 tracking-wide text-base font-[360]">
                          <strong>Select Calculation Type:</strong> Choose
                          whether the price you entered is "Inclusive of Tax"
                          (to extract GST) or "Exclusive of Tax" (to add GST).
                        </li>
                        <li className="text-gray-700 tracking-wide text-base font-[360]">
                          <strong>Choose GST Rate:</strong> Select the
                          applicable GST rate (e.g., 5%, 12%, 18%, or 28%) from
                          the available options. This corresponds to the tax
                          slab for your specific product or service.
                        </li>
                        <li className="text-gray-700 tracking-wide text-base font-[360]">
                          <strong>Pick Supply Type (if applicable):</strong>{" "}
                          Indicate if the supply is Inter-state or Intra-state.
                          Our calculator intelligently determines the{" "}
                          <strong className="text-blue-600">CGST, SGST</strong>, or <strong className="text-blue-600">IGST</strong>{" "}
                          components.
                        </li>
                        <li className="text-gray-700 tracking-wide text-base font-[360]">
                          <strong>View Instant Breakdown:</strong> The
                          calculator will automatically display a clear
                          breakdown of the total amount, GST amount, and the net
                          amount, helping you understand your tax liabilities.
                        </li>
                      </ol>
                    </div>
                    <div className="flex justify-center items-center shadow rounded cursor-pointer hover:scale-105 transition-transform duration-300 ">
                      <img
                        src={calculator}
                        alt="GST India Logo | Goods and Services Tax explained"
                        className=" w-full h-auto max-h-[350px] xl:max-h-[290px] object-contain "
                      />
                    </div>
                  </div>
                </section>

                {/* Example Box - Expanded with Formulas */}
                <section className="">
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    GST Calculation Formulas & Practical Examples
                  </h2>
                  <p className="text-gray-700 tracking-wide text-base font-[360]">
                    While our <strong className="text-blue-600">UniCX GST Calculator</strong> automates
                    everything, understanding the underlying formulas can
                    provide deeper insights into your tax liabilities:
                  </p>
                  <h3 className="font-normal text-[18px] mt-4 mb-2">
                    1. When the Price is Exclusive of GST (Adding GST):
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 ">
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>GST Amount</strong> = (Value of Supply x GST%) /
                      100
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>Price to be Charged</strong> = Value of Supply +
                      GST Amount
                    </li>
                  </ul>

                  <h3 className="font-normal text-[18px] mt-4 mb-2">
                    2. When the Price is Inclusive of GST (Removing GST):
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 tracking-wide text-[15px] font-[300]">
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>GST Amount</strong> = Value of Supply – [Value of
                      Supply x{`{100 / (100 + GST%)}`}]
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>Original Price (Pre-GST)</strong> = Value of
                      Supply - GST Amount
                    </li>
                  </ul>

                  <div class="container mx-auto p-4 max-w-lg mt-8">
                    <div class="rounded-xl border-2 border-blue-300 overflow-hidden shadow-sm">
                      <table class="min-w-full bg-white">
                        <thead class="bg-[#B7D5FE]">
                          <tr>
                            <th class="py-3 px-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-700 border border-blue-300">
                              Particulars
                            </th>
                            <th class="py-3 px-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-700 border border-blue-300">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-blue-300">
                          <tr className="bg-[#F3F8FF]">
                            <td class="py-3 px-4 text-center text-gray-800 border font-normal border-blue-300">
                              Invoice value
                            </td>
                            <td class="py-3 px-4 text-center text-gray-900  border border-blue-300">
                              ₹100,000
                            </td>
                          </tr>
                          <tr>
                            <td class="py-3 px-4 text-center text-gray-800 border font-normal border-blue-300">
                              GST @12%
                            </td>
                            <td class="py-3 px-4 text-center text-gray-900  border border-blue-300">
                              ₹12,000
                            </td>
                          </tr>
                          <tr className="bg-[#F3F8FF]">
                            <td class="py-3 px-4 text-center text-gray-800 border font-normal border-blue-300">
                              Price to be charged on the Invoice
                            </td>
                            <td class="py-3 px-4 text-center text-gray-900  border border-blue-300">
                              ₹112,000
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-700 tracking-wide text-base font-[360]">
                    <strong className="">Impact of GST across the Supply Chain:</strong>{" "}
                    GST's <strong>Input Tax Credit (ITC) mechanism</strong>{" "}
                    significantly reduces the cascading effect of taxes (tax on
                    tax), benefiting{" "}
                    <strong>manufacturers, wholesalers, and retailers</strong>,
                    and ultimately leading to potentially lower prices for the{" "}
                    <strong>end consumer</strong>.
                  </p>
                </section>

                {/* Who Can Benefit from the UniCX GST Calculator? - Maintained */}
                <section className="">
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    Who Can Benefit from the UniCX GST Calculator?
                  </h2>
                  <p className="text-gray-700 tracking-wide text-base font-[360] mb-3">
                    Our <strong>GST calculator</strong> is a versatile tool
                    designed to assist a wide range of users in accurately
                    managing their GST-related calculations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ">
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300]">
                      <strong>Small business owners & startups:</strong> For
                      accurate invoicing and expense tracking.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300]">
                      <strong>Freelancers and service providers:</strong> To
                      easily determine service charges inclusive or exclusive of
                      GST.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300]">
                      <strong>Retailers and e-commerce sellers:</strong> For
                      precise product pricing and tax compliance.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300]">
                      <strong>Manufacturers and Wholesalers:</strong> To
                      calculate GST payable at each stage of the supply chain
                      and manage Input Tax Credit effectively.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300]">
                      <strong>Customers:</strong> To verify the final GST
                      charges on purchases.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300]">
                      <strong>Accountants & Tax Professionals:</strong> As a
                      quick verification tool for clients' GST computations.
                    </li>
                  </ul>
                   <div className="flex justify-center items-center   max-h-[399px]  rounded cursor-pointer hover:scale-101 transition-transform duration-300 ">
                      <img
                        src={benifite}
                        alt="GST India Logo | Goods and Services Tax explained"
                        className=" w-full h-auto max-h-[350px] xl:max-h-[400px] object-contain"
                      />
                    </div>
                </section>

                {/* Advantages of GST Calculator - NEW Section */}
                <section className="">
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    Advantages of Using the UniCX GST Calculator
                  </h2>
                  <p className="text-gray-700 tracking-wide text-base font-[360] mb-3">
                    Leveraging our <strong className="  ">free online GST calculator</strong>{" "}
                    offers significant benefits for individuals and businesses
                    alike:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-md">
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300] mb-3">
                      <strong>Accuracy Guaranteed:</strong> Automated
                      calculations eliminate the common errors associated with
                      manual tax computations, ensuring precise GST calculations
                      for invoicing, pricing, and tax filings.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300] mb-3">
                      <strong className="">Significant Time Savings:</strong> Get instant
                      results, freeing up valuable time that can be redirected
                      to core business activities and strategic planning.
                    </li>
                    <li className="text-gray-700 tracking-wide text-[15px] font-[300] mb-3">
                      <strong className="">Simplifies Complexity:</strong> Easily bifurcate
                      between CGST, SGST, and IGST components, providing clarity
                      in your tax breakdown.
                    </li>
                    <li>
                      <strong>Aids Budgeting & Pricing:</strong> Quickly
                      determine net or gross product prices based on GST rates,
                      which is essential for effective financial planning and
                      competitive pricing.
                    </li>
                    <li>
                      <strong>Ensures Compliance:</strong> Helps you stay on top
                      of your GST liabilities and prevents potential penalties
                      due to calculation errors.
                    </li>
                    <li>
                      <strong>User-Friendly Interface:</strong> Designed for
                      ease of use, even for individuals without extensive tax
                      knowledge, making GST accessible to everyone.
                    </li>
                  </ul>
                </section>

                {/* Tip box - Maintained */}
                <section className="">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-yellow-700 tracking-wide  font-[360]">
                      <strong>UniCX Tip:</strong> For B2B invoices, always
                      display both CGST and SGST (or IGST for inter-state
                      supplies) clearly. This helps your clients accurately
                      claim their <strong>Input Tax Credit (ITC)</strong>, which
                      is a cornerstone of the GST regime. Remember the new
                      GSTR-3B locking rules for July 2025!
                    </p>
                  </div>
                </section>

                {/* UniCX Expert Support & Resources - NEW Section */}
                <section id="contact" className="">
                  <h2 className="text-2xl text-textColor font-medium mb-3">
                    Beyond Calculations: UniCX - Your Partner in GST Compliance
                    & Growth
                  </h2>
                  <p className="text-gray-700 tracking-wide text-base font-[360]">
                    At{" "}
                    <strong>
                      UniconsultX Solutions Private Limited (UniCX)
                    </strong>
                    , our commitment extends beyond providing a powerful GST
                    calculator. We understand that{" "}
                    <strong>GST is a dynamic and evolving tax regime</strong>,
                    and navigating its complexities requires more than just
                    tools. That's why we offer{" "}
                    <strong>comprehensive support and resources</strong> to
                    ensure your business remains compliant and leverages GST for
                    sustainable growth.
                  </p>
                  <h3 className="font-normal text-xl mt-4 mb-2">
                    Our Expert GST Services Include:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-md">
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>GST Registration Guidance:</strong> Seamless
                      assistance with obtaining your{" "}
                      <strong>
                        Goods and Services Tax Identification Number (GSTIN)
                      </strong>
                      .
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>GST Return Filing Support:</strong> Expert help
                      with accurate and timely filing of various GST returns
                      (e.g., GSTR-1, GSTR-3B), keeping in mind the new 3-year
                      time limit and GSTR-3B auto-locking.
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>Input Tax Credit (ITC) Optimization:</strong>{" "}
                      Strategies to maximize your ITC claims, reducing your
                      overall tax liability and ensuring compliance with the
                      latest rules.
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>GST Advisory & Consulting:</strong> Personalized
                      advice on complex GST issues, ensuring your business
                      adheres to the latest regulations and avoids pitfalls,
                      including guidance on new e-way bill procedures.
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>GST Audit & Reconciliation:</strong> Support for
                      GST audits and reconciling your books with GST records.
                    </li>
                    <li className="text-gray-700 tracking-wide text-base font-[300]">
                      <strong>Educational Resources:</strong> Access to
                      informative articles, FAQs, and timely updates on GST laws
                      and amendments.
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-700 tracking-wide text-base font-[360]">
                    <strong>Stay Ahead with UniCX:</strong> We are dedicated to
                    being your reliable source for all things GST. Explore our
                    website for more in-depth articles, common FAQs, and the
                    latest updates from the GST Council. Partner with UniCX for
                    peace of mind in your GST journey.
                  </p>
                  <div className="mt-6 text-center">
                    <button className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                      Get Expert GST Consultation
                    </button>
                  </div>
                </section>

                {/* FAQs - Maintained with updated Q&A */}
                <section className=" px-4 ">
                  {" "}
                  {/* Added padding, rounded corners, and shadow */}
                  <h2 className="text-2xl text-textColor font-medium  mb-6">
                    Frequently Asked Questions (FAQs) about GST
                  </h2>
                  <div className="space-y-6">
                    {" "}
                    {/* Added space between FAQ items */}
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                          openFAQ === i
                            ? "shadow-md bg-blue-50"
                            : "hover:shadow-sm" // Highlight active FAQ
                        }`}
                      >
                        <div
                          className="flex justify-between items-center px-4 py-2 cursor-pointer bg-white" // Added background to header
                          onClick={() => toggleFAQ(i)}
                        >
                          <p className="text-gray-800 tracking-wide text-base font-[400]">
                            {faq.q}
                          </p>
                          {openFAQ === i ? (
                            <ChevronUp size={20} className="text-blue-600" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-500" />
                          )}
                        </div>

                        <p
                          className={`text-gray-700 text-base font-normal px-4  pt-2 transition-all duration-500 ease-in-out ${
                            openFAQ === i
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                          style={
                            {
                              // Optional: For even smoother height transition, you can calculate max-height dynamically
                              // For most cases, a generous max-height like 500px works well for typical FAQ answers.
                              // If answers are extremely long, you might need to adjust this.
                            }
                          }
                        >
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                {/* Footer note - Maintained */}
                <section className="pt-6 border-t mt-6 ">
                  <p className="text-gray-700 tracking-wide text-base font-[360]">
                    This GST calculator and information is developed and
                    maintained by{" "}
                    <strong>
                      UniCX (UniconsultX Solutions Private Limited)
                    </strong>{" "}
                    to help users simplify Goods and Services Tax computations
                    as per current Indian tax laws. For complex tax situations
                    or personalized advice, always consult with a qualified tax
                    professional or{" "}
                    <a
                      href="#contact"
                      className="text-blue-600 hover:underline"
                    >
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

export default GSTCalculator;
