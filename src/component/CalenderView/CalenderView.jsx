import React, { useState, useEffect } from "react";

// Main App component
export default function App() {
  // State to hold the current date, which will now be manually adjustable
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to get the full month name
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  // Function to get the full day of the week name
  const getDayOfWeek = (date) => {
    return date.toLocaleString("default", { weekday: "long" });
  };

  // Handlers to change the date
  const handleYearChange = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + offset);
      return newDate;
    });
  };

  const handleMonthChange = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      // Ensure the day remains valid for the new month
      // This logic attempts to keep the same day of the month if possible,
      // otherwise it adjusts to the last day of the new month.
      const prevDay = prevDate.getDate();
      const newMonthDays = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      ).getDate();
      newDate.setDate(Math.min(prevDay, newMonthDays));
      return newDate;
    });
  };

  const handleDayChange = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  // Extract date components for display
  const year = currentDate.getFullYear();
  const monthName = getMonthName(currentDate);
  const dayOfWeek = getDayOfWeek(currentDate);
  const dayOfMonth = currentDate.getDate(); // Numeric day of the month

  return (
    // Main container for centering the card
    <div className='  h-1/2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-14 font-inter'>
      {/* Calendar Card Container */}
      <div className='bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full min-h-[450px] flex flex-col justify-between transform transition-all duration-300 hover:scale-105'>
        {/* Header for the card */}
        <div className='text-center mb-6'>
          <p className='text-lg text-gray-500 mt-1'> Adjustable Date</p>
        </div>

        {/* Year Section with Controls */}
        <div className='bg-blue-100 text-blue-800 py-3 px-6 rounded-2xl mb-4 text-center flex items-center justify-between min-h-[40px]'>
          <button
            onClick={() => handleYearChange(-1)}
            className='p-2 rounded-full bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            aria-label='Previous Year'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              ></path>
            </svg>
          </button>
          <div className='flex-grow flex flex-col items-center justify-center'>
            <p className='text-sm font-semibold opacity-80'>Year</p>
            <p className='text-3xl font-bold'>{year}</p>
          </div>
          <button
            onClick={() => handleYearChange(1)}
            className='p-2 rounded-full bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            aria-label='Next Year'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              ></path>
            </svg>
          </button>
        </div>

        {/* Month Section with Controls */}
        <div className='bg-purple-100 text-purple-800 py-3 px-6 rounded-2xl mb-4 text-center flex items-center justify-between min-h-[80px]'>
          <button
            onClick={() => handleMonthChange(-1)}
            className='p-2 rounded-full bg-purple-200 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
            aria-label='Previous Month'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              ></path>
            </svg>
          </button>
          <div className='flex-grow flex flex-col items-center justify-center'>
            <p className='text-sm font-semibold opacity-80'>Month</p>
            <p className='text-3xl font-bold'>{monthName}</p>
          </div>
          <button
            onClick={() => handleMonthChange(1)}
            className='p-2 rounded-full bg-purple-200 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
            aria-label='Next Month'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              ></path>
            </svg>
          </button>
        </div>

        {/* Day of Week & Day of Month Section with Controls */}
        <div className='bg-green-100 text-green-800 py-3 px-6 rounded-2xl text-center flex items-center justify-between min-h-[80px]'>
          <button
            onClick={() => handleDayChange(-1)}
            className='p-2 rounded-full bg-green-200 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400'
            aria-label='Previous Day'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              ></path>
            </svg>
          </button>
          <div className='flex-grow flex flex-col items-center justify-center'>
            <p className='text-sm font-semibold opacity-80'>Day</p>
            <p className='text-3xl font-bold'>
              {dayOfWeek}, {dayOfMonth}
            </p>
          </div>
          <button
            onClick={() => handleDayChange(1)}
            className='p-2 rounded-full bg-green-200 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400'
            aria-label='Next Day'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              ></path>
            </svg>
          </button>
        </div>

        {/* Button to reset to current date */}
        <div className='mt-6 text-center'>
          <button
            onClick={() => setCurrentDate(new Date())}
            className='bg-gray-700 text-white py-2 px-5 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200'
          >
            Reset to Today
          </button>
        </div>
      </div>
    </div>
  );
}
