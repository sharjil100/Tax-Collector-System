import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system"; // For custom styling with MUI
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import jsPDF from "jspdf";

// Custom styled component for the modal content
const StyledModalContent = styled(MDBox)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "8px",
  maxWidth: "500px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  outline: "none",
}));

function InvoiceModal({ open, onClose, invoice }) {
  if (!invoice) return null;

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice Details", 10, 10);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 10, 20);
    doc.text(`Amount Paid: ৳${invoice.amount}`, 10, 30);
    doc.text(`Status: ${invoice.status}`, 10, 40);
    doc.text(`Description: ${invoice.description}`, 10, 50);
    doc.save(`Invoice_${invoice.id}.pdf`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.8)" }, // Fully dark overlay
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledModalContent>
        <MDTypography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Invoice Details
        </MDTypography>

        <MDBox mb={1.5}>
          <MDTypography variant="subtitle2" color="textSecondary">
            Date:
          </MDTypography>
          <MDTypography variant="body1">
            {new Date(invoice.date).toLocaleDateString()}
          </MDTypography>
        </MDBox>

        <MDBox mb={1.5}>
          <MDTypography variant="subtitle2" color="textSecondary">
            Amount Paid:
          </MDTypography>
          <MDTypography variant="body1">
            ৳{invoice.amount.toFixed(2)}
          </MDTypography>
        </MDBox>

        <MDBox mb={1.5}>
          <MDTypography variant="subtitle2" color="textSecondary">
            Status:
          </MDTypography>
          <MDTypography variant="body1">
            {invoice.status}
          </MDTypography>
        </MDBox>

        <MDBox mb={1.5}>
          <MDTypography variant="subtitle2" color="textSecondary">
            Description:
          </MDTypography>
          <MDTypography variant="body1">
            {invoice.description}
          </MDTypography>
        </MDBox>

        <MDBox mt={3} display="flex" justifyContent="space-between">
          <MDButton variant="contained" color="error" onClick={onClose}>
            Close
          </MDButton>
          <MDButton variant="contained" color="primary" onClick={handleDownloadPDF}>
            Download PDF
          </MDButton>
        </MDBox>
      </StyledModalContent>
    </Modal>
  );
}

// Define prop types
InvoiceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.shape({
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default InvoiceModal;
