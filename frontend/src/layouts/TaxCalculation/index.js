import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function TaxInfoDisplay() {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" fontWeight="medium" gutterBottom>
          Bangladesh Residents Income Tax Tables in 2024
        </MDTypography>
        <MDTypography variant="subtitle1" color="textSecondary" gutterBottom>
          Personal Income Tax Rates and Thresholds (Annual)
        </MDTypography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow style={{ backgroundColor: "#e0f2f1" }}>
                <TableCell variant="head" align="left">
                  <b>Tax Rate</b>
                </TableCell>
                <TableCell variant="head" align="left">
                  <b>Taxable Income Threshold</b>
                </TableCell>
              </TableRow>

              {/* Tax Brackets for Residents */}
              {[
                { rate: "0%", range: "৳ 0.00 to ৳ 350,000.00" },
                { rate: "5%", range: "৳ 350,000.01 to ৳ 450,000.00" },
                { rate: "10%", range: "৳ 450,000.01 to ৳ 750,000.00" },
                { rate: "15%", range: "৳ 750,000.01 to ৳ 1,150,000.00" },
                { rate: "20%", range: "৳ 1,150,000.01 to ৳ 1,650,000.00" },
                { rate: "25%", range: "৳ 1,650,000.01 and above" },
              ].map((row, index) => (
                <TableRow
                  key={index}
                  style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}
                >
                  <TableCell align="left">{row.rate}</TableCell>
                  <TableCell align="left">{row.range}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <MDBox mt={4}>
          <MDTypography variant="h5" fontWeight="medium" gutterBottom>
            Bangladesh Non-residents Income Tax Tables in 2024
          </MDTypography>
          <MDTypography variant="subtitle1" color="textSecondary" gutterBottom>
            Personal Income Tax Rates and Thresholds (Annual)
          </MDTypography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow style={{ backgroundColor: "#e0f2f1" }}>
                  <TableCell variant="head" align="left">
                    <b>Tax Rate</b>
                  </TableCell>
                  <TableCell variant="head" align="left">
                    <b>Taxable Income Threshold</b>
                  </TableCell>
                </TableRow>

                {/* Flat Tax Rate for Non-residents */}
                <TableRow style={{ backgroundColor: "#f9f9f9" }}>
                  <TableCell align="left">30%</TableCell>
                  <TableCell align="left">Flat rate on all taxable income</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MDBox>
      </MDBox>
    </Card>
  );
}

function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [residency, setResidency] = useState("resident");
  const [taxDetails, setTaxDetails] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Tax brackets for residents
  const residentBrackets = [
    { rate: 0, threshold: 350000 },
    { rate: 0.05, threshold: 450000 },
    { rate: 0.1, threshold: 750000 },
    { rate: 0.15, threshold: 1150000 },
    { rate: 0.2, threshold: 1650000 },
    { rate: 0.25, threshold: Infinity },
  ];

  // Flat tax rate for non-residents
  const nonResidentRate = 0.3;

  // Calculate tax based on residency status
  const handleCalculate = () => {
    const parsedIncome = parseFloat(income);

    if (isNaN(parsedIncome) || parsedIncome <= 0) {
      setTaxDetails("Please enter a valid income.");
      return;
    }

    let calculatedTax;
    if (residency === "resident") {
      calculatedTax = calculateResidentTax(parsedIncome);
    } else {
      calculatedTax = parsedIncome * nonResidentRate;
    }

    setTaxDetails({
      tax: calculatedTax.toFixed(2),
      income: parsedIncome,
      residency,
    });
  };

  // Progressive tax calculation for residents
  const calculateResidentTax = (income) => {
    let tax = 0;
    let remainingIncome = income;

    for (let i = 0; i < residentBrackets.length; i++) {
      const { rate, threshold } = residentBrackets[i];
      const previousThreshold = i === 0 ? 0 : residentBrackets[i - 1].threshold;

      if (remainingIncome > previousThreshold) {
        const taxableAmount = Math.min(
          remainingIncome - previousThreshold,
          threshold - previousThreshold
        );
        tax += taxableAmount * rate;
      }
    }
    return tax;
  };

  const handlePayNow = () => {
    navigate("/pay-your-tax"); // Redirect to "Pay Your Tax" page
  };

  return (
    <MDBox p={3} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <TaxInfoDisplay />
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                Bangladesh Tax Calculator 2024
              </MDTypography>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Employment Income (৳)"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Residency Status</InputLabel>
                      <Select
                        value={residency}
                        onChange={(e) => setResidency(e.target.value)}
                        label="Residency Status"
                        fullWidth
                      >
                        <MenuItem value="resident">Resident</MenuItem>
                        <MenuItem value="non-resident">Non-Resident</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={handleCalculate}
                  sx={{ mt: 3 }}
                >
                  Calculate Tax
                </MDButton>
                {taxDetails && (
                  <MDBox mt={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Tax Calculation Results
                    </MDTypography>
                    <MDTypography variant="body1">
                      <strong>Income:</strong> ৳ {taxDetails.income.toFixed(2)}
                    </MDTypography>
                    <MDTypography variant="body1">
                      <strong>Residency Status:</strong>{" "}
                      {taxDetails.residency === "resident" ? "Resident" : "Non-Resident"}
                    </MDTypography>
                    <MDTypography variant="body1">
                      <strong>Calculated Tax:</strong> ৳ {taxDetails.tax}
                    </MDTypography>
                    <MDBox mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1976d2", // Blue background color
                          color: "#ffffff", // White text color
                          "&:hover": {
                            backgroundColor: "#1565c0", // Darker blue on hover
                          },
                        }}
                        onClick={handlePayNow}
                      >
                        Pay Now
                      </Button>
                      <Button variant="outlined" color="secondary">
                        Pay Later
                      </Button>
                    </MDBox>
                  </MDBox>
                )}
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default TaxCalculator;
