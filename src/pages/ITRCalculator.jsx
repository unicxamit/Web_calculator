import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react'; // A popular icon library
import Header from '../component/Header';

// Main App component
export default function ITRCalculator() {
  // Set the target date for the countdown
  // You can easily change this to your desired launch date.
  const targetDate = new Date('2026-01-01T00:00:00Z');

  // State to hold the countdown values
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Effect hook to handle the countdown timer
  useEffect(() => {
    // Function to calculate the time left
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      // Check if the countdown has finished
      if (difference < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      // Calculate time left in days, hours, minutes, and seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);

  // Check if the countdown has ended
  const isCountdownFinished = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <>   
    {/* <Header/> */}
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full text-center border border-slate-700">
        <Clock className="w-16 h-16 md:w-20 md:h-20 mx-auto text-lime-400 mb-6 animate-pulse" />
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-lime-400">
          Coming Soon
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          We are hard at work creating an amazing experience for you. We'll be launching very soon!
        </p>
        
        {isCountdownFinished ? (
          <div className="text-3xl md:text-4xl font-bold text-lime-400 mt-10">
            We're Live! Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8">
            {/* Days */}
            <div className="flex flex-col items-center justify-center bg-slate-700 rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105 transform">
              <span className="text-5xl md:text-7xl font-bold text-lime-400">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-lg text-slate-400 font-semibold mt-2">Days</span>
            </div>
            
            {/* Hours */}
            <div className="flex flex-col items-center justify-center bg-slate-700 rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105 transform">
              <span className="text-5xl md:text-7xl font-bold text-lime-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-lg text-slate-400 font-semibold mt-2">Hours</span>
            </div>
            
            {/* Minutes */}
            <div className="flex flex-col items-center justify-center bg-slate-700 rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105 transform">
              <span className="text-5xl md:text-7xl font-bold text-lime-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-lg text-slate-400 font-semibold mt-2">Minutes</span>
            </div>
            
            {/* Seconds */}
            <div className="flex flex-col items-center justify-center bg-slate-700 rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105 transform">
              <span className="text-5xl md:text-7xl font-bold text-lime-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-lg text-slate-400 font-semibold mt-2">Seconds</span>
            </div>
          </div>
        )}
      </div>
    </div></>
 
  );
}