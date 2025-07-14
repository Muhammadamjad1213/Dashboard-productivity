import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react"; // Using Lucide React for icons

// Main App component
const FocusTimer = () => {
  // State for the current time in seconds
  const [time, setTime] = useState(25 * 60); // Default to 25 minutes
  // State to control if the timer is running
  const [isRunning, setIsRunning] = useState(false);
  // State for the timer's initial limit in minutes
  const [timerLimit, setTimerLimit] = useState(25);
  // State for the status message (e.g., "Running", "Paused", "Stopped")
  const [status, setStatus] = useState("Stopped");

  // Ref to hold the interval ID, allowing us to clear it
  const intervalRef = useRef(null);

  // useEffect hook to manage the timer's countdown
  useEffect(() => {
    // If the timer is running and time is greater than 0
    if (isRunning && time > 0) {
      // Set up a new interval
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Decrement time by 1 second
      }, 1000);
      setStatus("Running"); // Update status to Running
    } else if (time === 0) {
      // If time runs out, stop the timer
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setStatus("Time's up!"); // Update status - Fixed: changed to double quotes to handle apostrophe
    } else {
      // If not running or time is 0, clear any existing interval
      clearInterval(intervalRef.current);
      if (!isRunning && time > 0) {
        setStatus("Paused"); // If not running but time remains, it's paused
      } else if (time === timerLimit * 60 && !isRunning) {
        setStatus("Stopped"); // Initial state or after reset
      }
    }

    // Cleanup function: clear the interval when the component unmounts
    // or when isRunning/time changes and a new interval might be set
    return () => clearInterval(intervalRef.current);
  }, [isRunning, time, timerLimit]); // Dependencies for this effect

  // Function to toggle play/pause
  const handlePlayPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  // Function to reset the timer
  const handleReset = () => {
    clearInterval(intervalRef.current); // Clear any active interval
    setIsRunning(false); // Stop the timer
    setTime(timerLimit * 60); // Reset time to the current limit
    setStatus("Stopped"); // Set status to stopped
  };

  // Function to increase the timer limit
  const handleIncreaseLimit = () => {
    setTimerLimit((prevLimit) => prevLimit + 1);
    // If the timer is stopped, update the time immediately
    if (!isRunning && time === timerLimit * 60) {
      setTime((timerLimit + 1) * 60);
    }
  };

  // Function to decrease the timer limit
  const handleDecreaseLimit = () => {
    setTimerLimit((prevLimit) => Math.max(1, prevLimit - 1)); // Ensure limit doesn't go below 1
    // If the timer is stopped, update the time immediately
    if (!isRunning && time === timerLimit * 60) {
      setTime(Math.max(1, timerLimit - 1) * 60);
    }
  };

  // Function to format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate percentage for the concentric circles (visual progress)
  const progressPercentage = (time / (timerLimit * 60)) * 100;

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-green-100 font-inter'>
      {/* Main title */}
      <h1 className='text-4xl font-bold text-gray-800 mb-12'>Digital Timer</h1>

      <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-4xl'>
        {/* Timer Display Section */}
        <div className='relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80'>
          {/* Concentric rings for visual effect */}
          <div className='absolute w-full h-full rounded-full bg-gradient-to-br from-teal-300 to-green-400 opacity-30 blur-xl'></div>
          <div className='absolute w-5/6 h-5/6 rounded-full bg-gradient-to-br from-teal-400 to-green-500 opacity-40 blur-lg'></div>
          <div className='absolute w-4/6 h-4/6 rounded-full bg-gradient-to-br from-teal-500 to-green-600 opacity-50 blur-md'></div>

          {/* Inner white circle for time display */}
          <div className='relative flex flex-col items-center justify-center w-3/5 h-3/5 bg-white rounded-full shadow-lg p-4'>
            <span className='text-5xl font-extrabold text-gray-900 mb-2'>
              {formatTime(time)}
            </span>
            <span className='text-lg text-gray-600'>{status}</span>
          </div>
        </div>

        {/* Controls and Timer Limit Section */}
        <div className='flex flex-col items-center md:items-start gap-8'>
          {/* Pause/Reset Buttons */}
          <div className='flex gap-6'>
            <button
              onClick={handlePlayPause}
              className='flex items-center px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300'
            >
              {isRunning ? (
                <Pause className='mr-2' />
              ) : (
                <Play className='mr-2' />
              )}
              {isRunning ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleReset}
              className='flex items-center px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300'
            >
              <RotateCcw className='mr-2' />
              Reset
            </button>
          </div>

          {/* Set Timer Limit */}
          <div className='flex flex-col items-center md:items-start mt-6'>
            <span className='text-lg text-gray-700 mb-3'>Set Timer limit</span>
            <div className='flex items-center bg-white rounded-full shadow-md p-2'>
              <button
                onClick={handleDecreaseLimit}
                className='px-4 py-2 text-2xl font-bold text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
              >
                -
              </button>
              <span className='px-6 py-2 text-2xl font-bold text-green-600 bg-green-100 rounded-full mx-2'>
                {timerLimit}
              </span>
              <button
                onClick={handleIncreaseLimit}
                className='px-4 py-2 text-2xl font-bold text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
