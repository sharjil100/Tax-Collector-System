import { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "info" });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched notifications:", response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const openSnackbar = (color, message) => {
    console.log("Opening Snackbar:", { color, message });
    setSnackbar({ open: true, message, color });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Click on each notification to view details.
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  {notifications.map((notification, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                      <MDButton
                        variant="gradient"
                        color={
                          notification.notificationType.includes("Success")
                            ? "success"
                            : notification.notificationType.includes("Failure")
                            ? "error"
                            : "info"
                        }
                        onClick={() =>
                          openSnackbar(
                            notification.notificationType.includes("Success")
                              ? "success"
                              : notification.notificationType.includes("Failure")
                              ? "error"
                              : "info",
                            notification.message
                          )
                        }
                        fullWidth
                      >
                        {notification.message}
                      </MDButton>
                      <MDTypography variant="caption" color="text" align="center">
                        {new Date(notification.sentAt).toLocaleString()}
                      </MDTypography>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDSnackbar
        color={snackbar.color}
        icon={snackbar.color === "success" ? "check" : snackbar.color === "error" ? "warning" : "notifications"}
        title={snackbar.color === "success" ? "Success" : snackbar.color === "error" ? "Error" : "Info"}
        content={snackbar.message}
        open={snackbar.open}
        onClose={closeSnackbar}
        close={closeSnackbar}
        bgWhite
      />

      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
