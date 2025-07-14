// src/index.js (or main.jsx)
import React from "react";
import ReactDOM from "react-dom/client"; // or 'react-dom'
import { BrowserRouter } from "react-router-dom"; // <--- Look for this import
import App from "./App";
import "./index.css"; // Or your global CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* <--- If you see BrowserRouter here... */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
