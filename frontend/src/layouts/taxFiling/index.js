import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

function TaxFilingForm() {
  const [taxData, setTaxData] = useState({
    fullName: "",
    ssn: "",
    dob: "",
    address: "",
    taxYear: "",
    wages: "",
    selfEmploymentIncome: "",
    investmentIncome: "",
    deductions: "",
    federalTaxPaid: "",
    bankAccount: "",
    bankRouting: "",
  });

  const [file, setFile] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTaxData({
      ...taxData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taxData.taxYear || isNaN(taxData.taxYear)) {
      alert("Please enter a valid Tax Year");
      return;
    }
    if (!taxData.wages || isNaN(taxData.wages)) {
      alert("Please enter a valid Wages");
      return;
    }
    if (isNaN(taxData.deductions)) {
      alert("Please enter valid Deductions");
      return;
    }

    const formData = new FormData();

    formData.append("fullName", taxData.fullName);
    formData.append("ssn", taxData.ssn);
    formData.append("dob", taxData.dob);
    formData.append("address", taxData.address);
    formData.append("taxYear", taxData.taxYear);
    formData.append("wages", taxData.wages);
    formData.append("selfEmploymentIncome", taxData.selfEmploymentIncome);
    formData.append("investmentIncome", taxData.investmentIncome);
    formData.append("deductions", taxData.deductions);
    formData.append("federalTaxPaid", taxData.federalTaxPaid);
    formData.append("bankAccount", taxData.bankAccount);
    formData.append("bankRouting", taxData.bankRouting);

    if (file) {
      formData.append("file", file);
      formData.append("documentName", file.name);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/taxfilling", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessPopup(true);
        console.log("Form submitted successfully:", data);
      } else {
        console.error("Error submitting form:", data);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  const handleNavigate = (path) => {
    setSuccessPopup(false);
    navigate(path);
  };

  return (
    <MDBox p={3} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                File Your Tax Return
              </MDTypography>
              <form onSubmit={handleSubmit}>
                <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                  Personal Information
                </MDTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={taxData.fullName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Social Security Number"
                      name="ssn"
                      value={taxData.ssn}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={taxData.dob}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={taxData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tax Year"
                      name="taxYear"
                      type="number"
                      placeholder="Enter Tax Year"
                      value={taxData.taxYear}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <MDTypography variant="h6" fontWeight="medium" mt={3} gutterBottom>
                  Income Information
                </MDTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Wages"
                      name="wages"
                      type="number"
                      value={taxData.wages}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Self Employment Income"
                      name="selfEmploymentIncome"
                      type="number"
                      value={taxData.selfEmploymentIncome}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Investment Income"
                      name="investmentIncome"
                      type="number"
                      value={taxData.investmentIncome}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <MDTypography variant="h6" fontWeight="medium" mt={3} gutterBottom>
                  Deductions
                </MDTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Deductions"
                      name="deductions"
                      type="number"
                      value={taxData.deductions}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <MDTypography variant="h6" fontWeight="medium" mt={3} gutterBottom>
                  Tax Payments
                </MDTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Federal Tax Paid"
                      name="federalTaxPaid"
                      type="number"
                      value={taxData.federalTaxPaid}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <MDTypography variant="h6" fontWeight="medium" mt={3} gutterBottom>
                  Bank Information
                </MDTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bank Account Number"
                      name="bankAccount"
                      value={taxData.bankAccount}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bank Routing Number"
                      name="bankRouting"
                      value={taxData.bankRouting}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <MDBox my={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Upload Supporting Documents
                  </MDTypography>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileChange}
                  />
                </MDBox>

                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Submit Tax Filing
                </MDButton>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      {/* Success Dialog */}
      <Dialog open={successPopup} onClose={() => setSuccessPopup(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>Your tax filing was successful.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleNavigate("/calculate-tax")}
          >
            Proceed to Tax Calculation
          </MDButton>
          <MDButton
            variant="outlined"
            color="secondary"
            onClick={() => handleNavigate("/dashboard")}
          >
            Dashboard
          </MDButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default TaxFilingForm;
