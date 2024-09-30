import React from "react";
import Cookies from "js-cookie"; // Import js-cookie
import Logout from "./Logout"; // Import the Logout component

const Dashboard = () => {
    // Get the JWT from the cookie
    const token = Cookies.get("token");

    // Check if the user is logged in
    if (!token) {
        return <h2>You are not logged in. Please log in.</h2>;
    }

    return (
        <div>
            <h2>Welcome to your Dashboard!</h2>
            <p>Your JWT token is: {token}</p>
            {/* Render the Logout button */}
            <Logout />
        </div>
    );
};

export default Dashboard;
