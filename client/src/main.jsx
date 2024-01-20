import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// This code sets up your React application, renders the App component within the BrowserRouter for routing, and utilizes React.StrictMode

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the entire application in 'React.StrictMode' for additional checks
  <React.StrictMode>
    {/* Using 'BrowserRouter' to enable routing capabilities */}
    <BrowserRouter>
      {/* Rendering the main 'App' component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
