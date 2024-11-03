// This is PayYourTax -> index.js
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { useState } from "react";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Pay Your Tax page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

function PayYourTax() {
  const { state } = useLocation();
  const payableDue = state?.payableDue || 0; // Get tax due value from calculator page
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handlePayment = () => {
    // Payment processing logic can be added here
    alert(`Payment of ৳ ${payableDue} initiated using ${paymentMethod}.`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            {/* Left section containing the MasterCard and Payment Details */}
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {/* MasterCard Display */}
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="Jack Peterson" expires="11/22" />
                </Grid>

                {/* Total Tax Due Section */}
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance_wallet"
                    title="Total Tax Due"
                    description="Your current tax amount"
                    value={`৳ ${payableDue}`}
                  />
                </Grid>

                {/* Payment Options Section */}
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="payments"
                    title="Payment Options"
                    description="Select payment method"
                    value="Bank / BKASH / NAGAD"
                  />
                </Grid>

                {/* Payment Method Selection */}
                <Grid item xs={12}>
                  <PaymentMethod />
                  <MDBox mt={2}>
                    <Grid container spacing={2}>
                      {/* Payment Options */}
                      <Grid item>
                        <MDButton
                          variant={paymentMethod === "bank" ? "contained" : "outlined"}
                          color="info"
                          onClick={() => setPaymentMethod("bank")}
                        >
                          Bank
                        </MDButton>
                      </Grid>
                      <Grid item>
                        <MDButton
                          variant={paymentMethod === "bkash" ? "contained" : "outlined"}
                          color="info"
                          onClick={() => setPaymentMethod("bkash")}
                        >
                          BKASH
                        </MDButton>
                      </Grid>
                      <Grid item>
                        <MDButton
                          variant={paymentMethod === "nagad" ? "contained" : "outlined"}
                          color="info"
                          onClick={() => setPaymentMethod("nagad")}
                        >
                          NAGAD
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>

                  {/* Pay Now Button */}
                  <MDBox mt={3}>
                    <MDButton
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={handlePayment}
                    >
                      Pay Now - ৳ {payableDue}
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>

            {/* Right section containing Invoices */}
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>

        {/* Billing Information and Transactions */}
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PayYourTax;
