import React from "react";
// import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import epfcalc from "../assets/epf2.png";
import gst from "../assets/All-Calculators-image/gst1.png";
import nps from "../assets/All-Calculators-image/nps4.png";
import hra from "../assets/All-Calculators-image/hra1.png";
import sip from "../assets/All-Calculators-image/sip1.png";
import gratuity from "../assets/All-Calculators-image/gratuti1.png";
import retirement from "../assets/All-Calculators-image/retir1.png";
import rd from "../assets/All-Calculators-image/rd2.png";
import simple from "../assets/All-Calculators-image/sim1.png";
import tds from "../assets/All-Calculators-image/tds1.png";
import ppf from "../assets/All-Calculators-image/ppf1.png";
import mutual from "../assets/All-Calculators-image/mf1.png";
import emi from "../assets/All-Calculators-image/emi2.png";
import fd from "../assets/All-Calculators-image/fd1.png";
import home from "../assets/All-Calculators-image/home-Emi1.png";
import lump from "../assets/All-Calculators-image/lum1.png";
import business from "../assets/All-Calculators-image/bui3.png";
import itr from "../assets/All-Calculators-image/itr2.png";
const AllCalculator = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Header /> */}
      <section className=" px-6  py-10 bg-white w-full">
        <div className=" max-w-screen-xl mx-auto pt-18 lg:px-10 3sm:px-4 pb-5">
         
            <section className="mb-14">
              <h1 className="3sm:text-6xl text-3xl font-semibold text-textColor ">
                Calculators
              </h1>
            </section>

            <div className="grid md:grid-cols-3 lg:gap-10 4sm:grid-cols-2 gap-3  ">
              {/* <div className="w-full cursor-pointer " onClick={() => navigate("/gst-calc")}> */}

              <div
                className=" border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2
                 w-full cursor-pointer border-[#D5E5FC]   hover:border-primary "
                // data-testid="calculator-card"
                // style={{
                //   backgroundImage: `url(${gst})`,
                //   backgroundSize: '45%',
                // }}
                onClick={() => navigate("/gst-calc")}
              >
                <p className="md:text-2xl text-xl  font-medium text-textColor  mb-3 ">
                  GST Calculator{" "}
                </p>
                <span className="font-normal text-gray-500 line-clamp-3 ">
                  GST (Goods and Services Tax) is a unified indirect tax system
                  implemented across India to replace multiple cascading taxes
                  previously levied by the central and state governments.
                  Introduced in July 2017, GST in India subsumed major taxes
                  like VAT, excise duty, and service tax under a single regime,
                  streamlining the country’s indirect tax structure.
                </span>

                <div>
                 
                  <img
                    src={gst}
                    alt="EPF - Retirement Savings and Security"
                    className="w-full h-40 mt-3  object-contain"
                  />
                </div>
              </div>

              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer    hover:border-primary "
                onClick={() => navigate("/income")}
              >
                <div>
                  <p className="md:text-2xl text-xl font-medium text-textColor  mb-3  ">
                    ITR Calculator
                  </p>
                  <span className=" font-normal text-gray-500 line-clamp-3 ">
                    A useful online tool for accurately computing income tax
                    liability, deductions, and refunds based on the latest tax
                    laws and regulations. It simplifies tax planning and
                    compliance
                  </span>
                  <div className=" ">
                  
                    <img
                      src={itr}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-40 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary "
                onClick={() => navigate("/epf-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    EPF Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3 ">
                    Estimate your Employees' Provident Fund (EPF) contribution,
                    interest, and balance effortlessly with the user-friendly
                    EPF Calculator.
                  </span>
                  <div >
                  
                    <img
                      src={epfcalc}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 md:mt-8 3sm:mt-3 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 h-72 border-[#D5E5FC] cursor-pointer  hover:border-primary "  
                onClick={() => navigate("/nps-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    NPS Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3">
                    The National Pension Scheme (NPS) Calculator helps users
                    calculate their retirement savings. Give it a try to see how
                    much you could save!
                  </span>
                  <div >
                   
                    <img
                      src={nps}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 mt-3 object-contain"
                    />
                  </div>
                </div>
              </section>
             
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer   hover:border-primary "
                onClick={() => navigate("/hra-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    HRA Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    HRA calculator is a tool that helps calculate House Rent
                    Allowance (HRA) based on salary, rent paid, and location for
                    income tax purposes.
                  </span>
                  <div className="">
                    
                    <img
                      src={hra}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 mt-3 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC]  hover:border-primary  cursor-pointer "
                onClick={() => navigate("/sip-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor mb-3 ">
                    SIP Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3 ">
                    SIP Calculator calculates the estimated returns on
                    investments made through Systematic Investment Plans (SIPs)
                    based on different parameters.
                  </span>
                  <div className=" ">
                    
                    <img
                      src={sip}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 mt-3 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary  "
                onClick={() => navigate("/gratuity-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Gratuity Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Gratuity calculator helps determine the gratuity amount an
                    employee is eligible for based on their years of service.
                  </span>
                  <div >
                    
                    <img
                      src={gratuity}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-28 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] h-72 hover:border-primary  cursor-pointer"
                onClick={() => navigate("/retirement-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Retirement Calculator 
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Discover how much you need to save for retirement and start
                    planning for your future with our easy-to-use Retirement
                    Calculator.
                  </span>
                  {/* <div className=""> */}
                  
                    <img
                      src={retirement}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-20 lg:mt-4 object-contain"
                    />
                  </div>
                {/* </div> */}
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary  "
                onClick={() => navigate("/rd-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    RD Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3 ">
                    Get a quick estimate of your recurring deposit earnings and
                    plan for your financial future with our RD calculator now!
                  </span>
                  <div >
                   
                    <img
                      src={rd}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary   h-72 "
                onClick={() => navigate("/simple-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Simple Interest Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Easily predict your money's future, compound interest
                    calculator for your financial adventure.
                  </span>
                  <div >
                  
                    <img
                      src={simple}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC]  hover:border-primary  cursor-pointer  "
                onClick={() => navigate("/tds-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    TDS Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Stay tax-savvy with TDS calculator, predict your
                    withholdings accurately. Don't let the taxman give you a
                    headache, calculate with ease and be ahead.
                  </span>
                  <div >
                 
                    <img
                      src={tds}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 mt-7 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC]  hover:border-primary  cursor-pointer h-72 "
                onClick={() => navigate("/business")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Business Setup Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-2  ">
                    Starting a business? Don't fret! Use the business setup
                    calculator to estimate expenses, avoid surprises, and plan
                    your budget for success.
                  </span>
                  <div >
                   
                    <img
                      src={business}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-28 mt-2 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary   "
                onClick={() => navigate("/ppf-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    PPF Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    PPF Calculator estimates maturity amount based on initial
                    deposit, annual contributions, and prevailing interest
                    rates. It aids in planning for long-term financial goals.
                  </span>
                  <div >
                   
                    <img
                      src={ppf}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-28 mt-3 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer   hover:border-primary "
                onClick={() => navigate("/mutual-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Mutual Fund Returns Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3 ">
                    Mutual Fund Returns Calculator forecasts potential returns
                    based on investment amount, tenure, and expected returns. It
                    assists in evaluating mutual fund investment strategies.
                  </span>
                  <div>
              
                    <img
                      src={mutual}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary  "
                onClick={() => navigate("/emi-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Online EMI Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Calculate your monthly EMI with our online tool. Get precise
                    plans for loans. Enter the loan amount, interest rate, &
                    tenure to get results
                  </span>
                  <div >
                    
                    <img
                      src={emi}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-36 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2  border-[#D5E5FC] cursor-pointer  hover:border-primary  "
                onClick={() => navigate("/fd-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor mb-3 ">
                    Online Fixed Deposit(FD) Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3 ">
                    Determine your FD returns with our Online Fixed Deposit
                    Calculator. Enter your investment amount, tenure, and
                    interest rate for results
                  </span>
                  <div >
                
                    <img
                      src={fd}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary "
                onClick={() => navigate("/homeEmi-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Online Home EMI Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Calculate your Home Loan EMI effortlessly with our online
                    tool. Enter the loan amount, interest rate, and tenure to
                    get the EMI outcomes.
                  </span>
                  <div >
                   
                    <img
                      src={home}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-2 border-[#D5E5FC] cursor-pointer  hover:border-primary "
                onClick={() => navigate("/lumsum-calc")}
              >
                <div>
                  <p className="text-2xl font-medium text-textColor  mb-3 ">
                    Lump Sum Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3  ">
                    Determine the future value of a lump sum investment with
                    ease. Enter the principal amount, interest rate, & tenure
                    for accurate results
                  </span>
                  <div >
                 
                    <img
                      src={lump}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 object-contain"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        
      </section>
    </>
  );
};

export default AllCalculator;
