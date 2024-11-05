import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Invoice from "layouts/billing/components/Invoice";
import InvoiceModal from "layouts/billing/components/InvoiceModal.js";
import PropTypes from "prop-types";

function Invoices({ isPaymentSuccessful }) {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State for the selected invoice
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const response = await fetch("http://localhost:5000/api/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) throw new Error("Failed to fetch invoices");
  
        const data = await response.json();
        setInvoices(data.invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
  
    fetchInvoices();
  }, [isPaymentSuccessful]); // Re-fetch invoices after payment is successful

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice); // Set the selected invoice
    setShowModal(true); // Open the modal
  };
  

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Invoices
          </MDTypography>
          <MDButton variant="outlined" color="info" size="small">
            view all
          </MDButton>
        </MDBox>
        <MDBox p={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <MDBox key={invoice.id} display="flex" justifyContent="space-between" alignItems="center">
                  <Invoice
                    date={invoice.date} // Format the date if needed
                    id={invoice.id}
                    price={`৳ ${invoice.amount}`} // Display amount
                  />
                  <MDButton
                    variant="text"
                    color="info"
                    onClick={() => handleViewInvoice(invoice)}
                  >
                    View
                  </MDButton>
                </MDBox>
              ))
            ) : (
              <MDTypography variant="caption" color="text">
                No invoices available.
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>

      {/* Modal for viewing invoice details */}
      {showModal && (
        <InvoiceModal
          open={showModal}
          onClose={() => setShowModal(false)}
          invoice={selectedInvoice}
        />
      )}
    </>
  );
}

Invoices.propTypes = {
  isPaymentSuccessful: PropTypes.bool.isRequired, // Ensure isPaymentSuccessful is a boolean
};

export default Invoices;
