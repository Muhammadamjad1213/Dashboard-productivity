import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // For icons
import "./App.css";
import { Routes, Route, Link } from "react-router-dom"; // Keep Routes, Route, Link

// Your productivity components
import DailyTasks from "./component/DailyTasks/DailyTasks";
import CalenderView from "./component/CalenderView/CalenderView";
import Notes from "./component/Notes/Notes";
import FocusTimer from "./component/FocusTimer/FocusTimer";

// ThemeToggle Component (remains unchanged)
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
      aria-label='Toggle theme'
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// Navbar Component (Updated for centered links and theme toggle)
const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav
      className={`shadow-md p-4 flex flex-col md:flex-row md:justify-between items-center transition-colors duration-200 w-full ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className='text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0'>
        My Productivity App
      </div>

      {/* Navigation links and Theme Toggle - Centered horizontally */}
      <div className='flex flex-wrap justify-center items-center gap-6'>
        {" "}
        {/* Used gap for spacing and flex-wrap for responsiveness */}
        <Link
          to='/'
          className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap'
        >
          Daily Tasks
        </Link>
        <Link
          to='/calendar'
          className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap'
        >
          Calendar View
        </Link>
        <Link
          to='/notes'
          className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap'
        >
          Notes
        </Link>
        <Link
          to='/focus-timer'
          className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap'
        >
          Focus Timer
        </Link>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // This effect correctly applies/removes the 'dark' class to the <html> element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PageWrapper component to consistently style and theme the routed content
  const PageWrapper = ({ title, children }) => (
    <div
      className={`w-full max-w-2xl p-4 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 text-white dark:text-gray-100 font-sans transition-colors duration-200 flex flex-col items-center'>
      {/* Navbar component, always visible at the top */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main content area where routed components will appear */}
      <div className='flex-1 w-full p-6 flex justify-center items-start'>
        <Routes>
          <Route
            path='/'
            element={
              <PageWrapper title='Daily Tasks'>
                <DailyTasks />
              </PageWrapper>
            }
          />
          <Route
            path='/calendar'
            element={
              <PageWrapper title='Calendar View'>
                <CalenderView />
              </PageWrapper>
            }
          />
          <Route
            path='/notes'
            element={
              <PageWrapper title='Notes'>
                <Notes />
              </PageWrapper>
            }
          />
          <Route
            path='/focus-timer'
            element={
              <PageWrapper title='Focus Timer'>
                <FocusTimer />
              </PageWrapper>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
