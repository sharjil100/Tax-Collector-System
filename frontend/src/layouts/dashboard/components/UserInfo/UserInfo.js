import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";

function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };
    fetchUserData();
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
      mb={4}
      style={{
        backgroundImage: `linear-gradient(to right, #e0f7fa, #e3f2fd)`,
        color: "#333",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
        User Information
      </h3>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(8px)",
              color: "#333",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <IconButton onClick={() => navigate("/profile")}> {/* Redirect on click */}
                <PersonIcon fontSize="large" style={{ color: "#00796b", marginBottom: "8px" }} />
              </IconButton>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>Name</Typography>
              <Typography variant="body1">{name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(8px)",
              color: "#333",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <EmailIcon fontSize="large" style={{ color: "#00796b", marginBottom: "8px" }} />
              <Typography variant="h6" style={{ fontWeight: "bold" }}>Email</Typography>
              <Typography variant="body1">{email}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(8px)",
              color: "#333",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <BadgeIcon fontSize="large" style={{ color: "#00796b", marginBottom: "8px" }} />
              <Typography variant="h6" style={{ fontWeight: "bold" }}>User Type</Typography>
              <Typography variant="body1">{userType}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default UserInfo;
