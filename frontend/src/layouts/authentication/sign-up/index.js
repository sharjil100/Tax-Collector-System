import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [name, setName] = useState("");  // Single input for name which will also act as username
  const [email, setEmail] = useState(""); // Separate state for email
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("individual"); // Default to individual
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,  // Use name as the username
          password,
          name,           // Use name for both username and name
          email,
          userType,       // User type: individual or business
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User registered successfully!");
        setTimeout(() => {
          navigate("/authentication/sign-in"); // Redirect to sign-in page
        }, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <CoverLayout image={bgImage} showNavbar={false}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Tax Collector System
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name" // Single name input used for both name and username
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)} // This will be used for both name and username
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"       // Separate email input
                variant="standard"
                fullWidth
                value={email}       // Set email value
                onChange={(e) => setEmail(e.target.value)}     // Handle email change
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            {/* User Type Selection */}
            <MDBox mb={2}>
              <MDTypography variant="h6">Select User Type:</MDTypography>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {error && (
              <MDTypography color="error" variant="caption" display="block">
                {error}
              </MDTypography>
            )}
            {success && (
              <MDTypography color="success" variant="caption" display="block">
                {success}
              </MDTypography>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Register
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
