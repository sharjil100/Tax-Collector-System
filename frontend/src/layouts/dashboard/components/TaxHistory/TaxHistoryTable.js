import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";

function TaxHistoryTable() {
  const [taxHistory, setTaxHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/payments/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setTaxHistory(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Function to get color based on payment method
  const getPaymentMethodColor = (method) => {
    switch (method.toLowerCase()) {
      case "bkash":
        return "#e33371"; // pink for Bkash
      case "bank transfer":
        return "#1976d2"; // Blue for Bank Transfer
      case "nagad":
        return "#e66a00"; // Dark orange for Nagad
      default:
        return "#555"; // Default color if none match
    }
  };

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
      <MDTypography variant="h5" fontWeight="medium" style={{ color: "#333", marginBottom: "16px" }}>
        Tax History
      </MDTypography>
      <TableContainer component={Paper} style={{ borderRadius: "12px", overflow: "hidden" }}>
        <Table>
          <thead>
            <TableRow style={{ backgroundColor: "#e0e7eb" }}> {/* Light header background */}
              <DataTableHeadCell align="left" sorted="none" style={{ color: "#333", fontWeight: "bold" }}>
                Date
              </DataTableHeadCell>
              <DataTableHeadCell align="left" sorted="none" style={{ color: "#333", fontWeight: "bold" }}>
                Payment Method
              </DataTableHeadCell>
              <DataTableHeadCell align="center" sorted="none" style={{ color: "#333", fontWeight: "bold" }}>
                Amount
              </DataTableHeadCell>
              <DataTableHeadCell align="center" sorted="none" style={{ color: "#333", fontWeight: "bold" }}>
                Status
              </DataTableHeadCell>
            </TableRow>
          </thead>
          <TableBody>
            {taxHistory.map((row, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb", // Alternating row colors
                }}
              >
                <TableCell style={{ color: "#555" }}>{new Date(row.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell style={{ color: getPaymentMethodColor(row.paymentMethod), fontWeight: "500" }}>
                  {row.paymentMethod}
                </TableCell>
                <TableCell align="center" style={{ color: "#000" }}>৳{row.amountPaid}</TableCell>
                <TableCell align="center" style={{ color: row.paymentStatus === "Completed" ? "#f44336" : "#4caf50" }}>
                  {row.paymentStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MDBox>
  );
}

export default TaxHistoryTable;
