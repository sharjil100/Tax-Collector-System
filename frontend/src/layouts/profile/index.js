import React, { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress"; // Loading indicator

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import documentPlaceholder from "assets/images/documents-files-records-file.jpg";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Social Media Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Placeholder for user profile image
import profilePlaceholder from "assets/images/default-avatar.png"; // Path to placeholder image

function Overview() {
  // State for holding user data and documents
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and documents when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from localStorage

        // Fetch the user data from the backend
        const userResponse = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });

        setUser(userResponse.data); // Set the user data in state

        // Fetch the uploaded documents for the user
        const documentsResponse = await axios.get("http://localhost:5000/api/documents", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });

        setDocuments(documentsResponse.data); // Set documents data in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData(); // Call the function to fetch user data and documents
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

  const { name, email, userType, location, mobile, profilePicture } = user || {}; // Destructure user data

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* Pass user data to Header */}
      <Header user={user}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              {/* ProfileInfoCard updated to show user's picture */}
              <ProfileInfoCard
                title="profile information"
                description="User profile information"
                info={{
                  fullName: name || "N/A",
                  mobile: mobile || "N/A",
                  email: email || "N/A",
                  location: location || "Unknown",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
                // Add profile picture
                profilePicture={profilePicture ? `http://localhost:5000/${profilePicture}` : profilePlaceholder}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>

        {/* Documents Section */}
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Uploaded Documents
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Below are the documents you have uploaded:
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <Grid item xs={12} md={6} xl={3} key={doc._id}>
                  <DefaultProjectCard
                    image={documentPlaceholder} // Placeholder image for documents
                    label={doc.documentName}
                    title="Uploaded Document"
                    description={`Uploaded on: ${new Date(doc.uploadedAt).toLocaleDateString()}`}
                    action={{
                      type: "external",
                      route: doc.documentUrl.startsWith("/uploads/")
                        ? `http://localhost:5000${doc.documentUrl}`
                        : `http://localhost:5000/uploads/${doc.documentUrl}`, // Path to download or view the document
                      color: "info",
                      label: "View Document",
                    }}
                    authors={[
                      { image: profilePicture || profilePlaceholder, name: user.name }, // Display user image and name
                    ]}
                  />
                </Grid>
              ))
            ) : (
              <MDTypography variant="body2" color="text">
                No documents found.
              </MDTypography>
            )}
          </Grid>
        </MDBox>
      </Header>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
