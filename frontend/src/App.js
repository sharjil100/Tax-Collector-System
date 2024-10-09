import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Ensure to import Dashboard
import TaxFilingForm from "./pages/TaxFilingForm";
import Logout from "./pages/Logout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root to /login by default */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Define routes for login, signup, and dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Close the Dashboard Route properly */}
          <Route path="/file-tax" element={<TaxFilingForm />} />
          <Route path="/logout" element={<Logout />} />

          {/* Optionally, add a route to handle undefined paths */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
