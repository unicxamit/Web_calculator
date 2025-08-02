import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react'; // Using lucide-react for the icon
import Header from '../component/Header';

// The main App component for the Coming Soon page
const BusinessCalculator = () => {
  // Define the target date for the countdown.
  // This is set to one week from the current date.
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  // State to hold the countdown values (days, hours, minutes, seconds)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State for the email input field and notification message
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Calculates the time remaining until the target date.
   * @returns {object} An object containing the remaining days, hours, minutes, and seconds.
   */
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    // If the countdown is finished, return zeros
    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate the time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // useEffect hook to set up and clean up the countdown timer
  useEffect(() => {
    // Update the countdown initially
    setCountdown(calculateTimeRemaining());

    // Set up an interval to update the countdown every second
    const interval = setInterval(() => {
      setCountdown(calculateTimeRemaining());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Handle email submission
  const handleNotifyMe = () => {
    if (email.trim() === '') {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    // Simulate a successful API call or server interaction
    setTimeout(() => {
      setMessage(`Thanks for your interest, we'll notify you at ${email}!`);
      setEmail('');
      setIsLoading(false);
    }, 1500);
  };

  // A helper component to render each countdown digit with its label
  const CountdownItem = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm p-4  rounded-lg shadow-lg w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 xl:w-24 xl:h-24 2xl:w-32">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono ">{value}</span>
      <span className="mt-2 text-sm sm:text-base ">{label}</span>
    </div>
  );

  return (
    <>
    {/* <Header/> */}
    <section className='container-div mt-14 '>
      <section className='second-container '>
      <section className=" mb-14 ">
              <h1 className="md:text-4xl text-3xl font-medium text-textColor mb-5">
                Business Calculator
              </h1>
              </section>
    
 
      <div className="grid xl:grid-cols-2  grid-col-1">
        <div className='text-left'>
        <h1 className="md:text-4xl text-3xl font-medium text-textColor  mb-4 ">
          Coming Soon
        </h1>
        <p className="p-content mb-8 max-w-xl">
          We're working hard to launch our new <strong className='text-blue-500'>Business Calculator</strong>. Follow us for updates and get notified when we go live!
        </p>

        {/* Countdown Timer */}
       

        {/* Notify Me section */}
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/50">
          <h2 className="p-content mb-4 text-white">Stay Notified</h2>
          <p className="text-gray-400 mb-4">
            Enter your email to receive an alert when we launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              />
            </div>
            <button
              onClick={handleNotifyMe}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform active:scale-95 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {/* bg-cyan-600 */}
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Notify Me"
              )}
            </button>
          </div>
          {message && (
            <p className={`mt-4 text-center transition-opacity duration-500 ${message.includes('Thanks') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Social media links (placeholder) */}
        <div className="mt-8">
          <p className="p-content">Follow us on social media</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
        </div>
         <div className="flex gap-4 mb-12 flex-wrap justify-center  ">
          <CountdownItem value={countdown.days} label="Days" />
          <CountdownItem value={countdown.hours} label="Hours" />
          <CountdownItem value={countdown.minutes} label="Minutes" />
          <CountdownItem value={countdown.seconds} label="Seconds" />
        </div>
      </div>
    </section>
    </section>
    </>
  );
};

export default BusinessCalculator;