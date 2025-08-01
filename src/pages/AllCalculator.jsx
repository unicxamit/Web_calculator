import React from "react";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import epfcalc from "../assets/epf2.png";
import gst from "../assets/images/calculators_img/All-Calculators-image/gst1.png";
import nps from "../assets/images/calculators_img/All-Calculators-image/nps4.png";
import hra from "../assets/images/calculators_img/All-Calculators-image/hra1.png";
import sip from "../assets/images/calculators_img/All-Calculators-image/sip1.png";
import gratuity from "../assets/images/calculators_img/All-Calculators-image/gratuti1.png";
import retirement from "../assets/images/calculators_img/All-Calculators-image/retir1.png";
import rd from "../assets/images/calculators_img/All-Calculators-image/rd2.png";
import simple from "../assets/images/calculators_img/All-Calculators-image/sim1.png";
import tds from "../assets/images/calculators_img/All-Calculators-image/tds1.png";
import ppf from "../assets/images/calculators_img/All-Calculators-image/ppf1.png";
import mutual from "../assets/images/calculators_img/All-Calculators-image/mf1.png";
import emi from "../assets/images/calculators_img/All-Calculators-image/emi2.png";
import fd from "../assets/images/calculators_img/All-Calculators-image/fd1.png";
import home from "../assets/images/calculators_img/All-Calculators-image/home-Emi1.png";
import lump from "../assets/images/calculators_img/All-Calculators-image/lum1.png";
import business from "../assets/images/calculators_img/All-Calculators-image/bui3.png";
import itr from "../assets/images/calculators_img/All-Calculators-image/itr2.png";
const AllCalculator = () => {
  const navigate = useNavigate();
  return (
    <>
     
      <section className=" 2sm:px-6  py-5 bg-white w-full">
        <div className=" max-w-screen-xl mx-auto pt-18 2sm:px-10 px-5  pb-5">
         
            <section className="mb-14">
              <h1 className="lg:text-6xl text-4xl font-semibold text-textColor ">
                Calculators
              </h1>
            </section>

            <div className="grid lg:grid-cols-3 gap-y-8 2sm:gap-10 4sm:grid-cols-2  ">
              {/* <div className="w-full cursor-pointer " onClick={() => navigate("/gst-calc")}> */}

              <div
                className=" border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4  h-[318px]
                 w-full cursor-pointer border-[#D5E5FC]   hover:border-primary "
                // data-testid="calculator-card"
                // style={{
                //   backgroundImage: `url(${gst})`,
                //   backgroundSize: '45%',
                // }}
                onClick={() => navigate("/gst-calc")}
              >
                <p className="xl:text-2xl text-xl  font-medium text-textColor  mb-3 ">
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
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer  h-[318px]   hover:border-primary "
                onClick={() => navigate("/itr-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3  ">
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
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer  hover:border-primary  h-[318px]"
                onClick={() => navigate("/epf-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-24 mt-8  object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 h-[318px] border-[#D5E5FC] cursor-pointer  hover:border-primary "  
                onClick={() => navigate("/nps-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-24 mt-10 object-contain"
                    />
                  </div>
                </div>
              </section>
             
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer h-[318px]  hover:border-primary "
                onClick={() => navigate("/hra-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-24 mt-10 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] h-[318px]  hover:border-primary  cursor-pointer "
                onClick={() => navigate("/sip-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor mb-3 ">
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
                      className="w-full h-32 mt-6 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer h-[318px] hover:border-primary  "
                onClick={() => navigate("/gratuity-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-28 mt-8 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] h-[318px]  hover:border-primary  cursor-pointer"
                onClick={() => navigate("/retirement-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-20 lg:mt-6 xl:mt-10 3lg:mt-10 md:mt-10 5md:mt-5 mt-8 object-contain"
                    />
                  </div>
                {/* </div> */}
              </section>
              <section
                className="border rounded-xl pt-7  lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] h-[318px] cursor-pointer  hover:border-primary  "
                onClick={() => navigate("/rd-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-36 mt-4 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer  hover:border-primary   h-[318px]"
                onClick={() => navigate("/simple-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
                    Simple Interest Calculator
                  </p>
                  <span className="font-normal text-gray-500 xl:line-clamp-2 line-clamp-3  ">
                    Easily predict your money's future, compound interest
                    calculator for your financial adventure.
                  </span>
                  <div >
                  
                    <img
                      src={simple}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 xl:mt-8 lg:mt-5 md:mt-8 5md:mt-5 mt-10 4md:mt-14 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] h-[318px] hover:border-primary  cursor-pointer  "
                onClick={() => navigate("/tds-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-24 mt-9  object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] h-[318px] hover:border-primary  cursor-pointer "
                onClick={() => navigate("/business")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
                    Business Setup Calculator
                  </p>
                  <span className="font-normal text-gray-500 xl:line-clamp-2 line-clamp-3 ">
                    Starting a business? Don't fret! Use the business setup
                    calculator to estimate expenses, avoid surprises, and plan
                    your budget for success.
                  </span>
                  <div >
                   
                    <img
                      src={business}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-28 xl:mt-6 lg:mt-3 md:mt-8 mt-5 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer  hover:border-primary  h-[318px] "
                onClick={() => navigate("/ppf-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full h-[120px] mt-5 xl:mt-2 3lg:mt-1 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer  h-[318px] hover:border-primary "
                onClick={() => navigate("/mutual-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
                    Mutual Fund  Calculator
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
                      className="w-full h-[120px] lg:mt-1  xl:mt-5 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer h-[318px] hover:border-primary  "
                onClick={() => navigate("/emi-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  mb-3 ">
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
                      className="w-full xl:h-36 h-[140px] lg:mt-0.5 xl:mt-2 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 h-[318px] border-[#D5E5FC] cursor-pointer  hover:border-primary  "
                onClick={() => navigate("/fd-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor mb-3  ">
                    Online FD Calculator
                  </p>
                  <span className="font-normal text-gray-500  line-clamp-3 ">
                    Determine your FD returns with our Online Fixed Deposit
                    Calculator. Enter your investment amount, tenure, and
                    interest rate for results
                  </span>
                  <div >
                
                    <img
                      src={fd}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 xl:mt-9 lg:mt-6 2lg:mt-8 mt-6 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer h-[318px] hover:border-primary "
                onClick={() => navigate("/homeEmi-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor 2lg:mb-1 3lg:mb-3 lg:mb-3 mb-3">
                     Home EMI Calculator
                  </p>
                  <span className="font-normal text-gray-500 line-clamp-3   ">
                    Calculate your Home Loan EMI effortlessly with our online
                    tool. Enter the loan amount, interest rate, and tenure to
                    get the EMI outcomes.
                  </span>
                  <div >
                   
                    <img
                      src={home}
                      alt="EPF - Retirement Savings and Security"
                      className="w-full h-24 3lg:mt-9  lg:mt-6 mt-5 object-contain"
                    />
                  </div>
                </div>
              </section>
              <section
                className="border rounded-xl pt-7 lg:pl-6 lg:pr-[54px] px-4 border-[#D5E5FC] cursor-pointer h-[318px] hover:border-primary "
                onClick={() => navigate("/lumsum-calc")}
              >
                <div>
                  <p className="xl:text-2xl text-xl font-medium text-textColor  xl:mb-3 ">
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
                      className="w-full h-28 mt-5 lg:mt-4 xl:mt-4 2lg:mt-3 3lg:mt-4 object-contain"
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
