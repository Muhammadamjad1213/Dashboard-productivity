import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./index.css"; // Import the main Tailwind CSS file

// A simple component that uses the theme
function MyContent() {
  const { theme } = useTheme(); // Access the current theme

  return (
    // Tailwind classes for card styling
    // bg-white for light mode, dark:bg-gray-700 for dark mode
    // text-gray-800 for light, dark:text-gray-100 for dark
    // p-6, mt-8, rounded-lg, shadow-md are consistent
    <div className='bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-6 mt-8 rounded-lg shadow-md transition-colors duration-300'>
      <h2 className='text-2xl font-bold mb-2'>Welcome to My Themed App!</h2>
      <p className='text-lg'>
        This content dynamically changes based on the {theme} theme.
      </p>
      <p className='mt-2 text-md'>
        Enjoy the {theme === "light" ? "bright" : "calm"} colors!
      </p>
    </div>
  );
}

// The component responsible for the theme toggle button
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  return (
    // Tailwind classes for button styling
    // bg-blue-500 for light mode, dark:bg-purple-400 for dark mode
    // text-white for light, dark:text-gray-800 for dark
    // px-4, py-2, rounded-md, font-semibold are consistent
    <button
      className='bg-blue-500 hover:bg-blue-600 dark:bg-purple-400 dark:hover:bg-purple-500 text-white dark:text-gray-800 px-4 py-2 rounded-md font-semibold transition-colors duration-300 flex items-center'
      onClick={toggleTheme}
    >
      {/* Icon and text in a flex container */}
      {theme === "light" ? (
        <>
          <span role='img' aria-label='Moon' className='mr-2 text-xl'>
            🌙
          </span>{" "}
          Dark Mode
        </>
      ) : (
        <>
          <span role='img' aria-label='Sun' className='mr-2 text-xl'>
            ☀️
          </span>{" "}
          Light Mode
        </>
      )}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300 p-4'>
        <h1 className='text-4xl font-extrabold mb-8'>Theme Switcher</h1>
        <ThemeToggleButton />
        <MyContent />
      </div>
    </ThemeProvider>
  );
}

export default App;
