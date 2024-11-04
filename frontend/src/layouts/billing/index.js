import { useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
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
  const taxFilingId = state?.taxFilingId;  // Retrieve taxFilingId from state
  const initialPayableDue = Number(state?.payableDue) || 0;
  
  const [payableDue, setPayableDue] = useState(initialPayableDue);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          taxFilingId,
          amountPaid: payableDue,
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Payment successful: Payment ID ${data.payment._id}`);
        
        // Update states to reflect payment success
        setPayableDue(0); // Use state setter to update payableDue
        setIsPaymentSuccessful(true);
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    } catch (error) {
      alert(`Payment failed: ${error.message}`);
    }
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
                    value={`৳ ${(payableDue || 0).toFixed(2)}`} // Shows 0 after payment is successful
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
                          variant={paymentMethod === "Bank Transfer" ? "contained" : "outlined"}
                          color="info"
                          onClick={() => setPaymentMethod("Bank Transfer")}
                        >
                          Bank Transfer
                        </MDButton>
                      </Grid>
                      <Grid item>
                        <MDButton
                          variant={paymentMethod === "BKASH" ? "contained" : "outlined"}
                          color="info"
                          onClick={() => setPaymentMethod("BKASH")}
                        >
                          BKASH
                        </MDButton>
                      </Grid>
                      <Grid item>
                        <MDButton
                          variant={paymentMethod === "NAGAD" ? "contained" : "outlined"}
                          color="info"
                          onClick={() => setPaymentMethod("NAGAD")}
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
                      {isPaymentSuccessful ? "Payment Completed" : `Pay Now - ৳ ${payableDue}`}
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
