import React from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { useNavigate } from "react-router-dom"; // Hook to navigate

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the JWT cookie
        Cookies.remove("token");
        alert("Logged out successfully");
        navigate("/login"); // Redirect to the login page
    };

    return (
        <div>
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
