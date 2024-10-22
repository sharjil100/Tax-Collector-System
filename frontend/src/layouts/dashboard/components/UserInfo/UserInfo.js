import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox"; // Assuming you use this component for layout
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CircularProgress from "@mui/material/CircularProgress"; // For loading indicator

function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from localStorage

        // Fetch the user data from backend
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });

        setUser(response.data); // Set the user data in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []);

  if (loading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress color="info" />
      </MDBox>
    );
  }

  if (error) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
        <div style={{ color: "red", fontSize: "18px" }}>{error}</div>
      </MDBox>
    );
  }

  if (!user) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
        <div>No user data available</div>
      </MDBox>
    );
  }

  const { name, email, userType } = user;

  return (
    <MDBox
      p={3}
      mt={4}
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={3}>
        {/* Merged info into a single card */}
        <Grid item xs={12}>
          <DefaultInfoCard
            color="info"
            icon="person"
            title="User Overview"
            description={`Name: ${name}`}
            value={`Email: ${email} | User Type: ${userType}`}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default UserInfo;
