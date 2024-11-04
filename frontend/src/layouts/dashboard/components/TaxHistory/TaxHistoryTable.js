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
    axios.get("http://localhost:5000/api/payments/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } 
    })
      .then((response) => setTaxHistory(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <MDBox p={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Tax History
        </MDTypography>
      </MDBox>
      <Table>
        <thead>
          <TableRow>
            <DataTableHeadCell align="left" sorted="none">Date</DataTableHeadCell>
            <DataTableHeadCell align="left" sorted="none">Payment Method</DataTableHeadCell>
            <DataTableHeadCell align="center" sorted="none">Amount</DataTableHeadCell>
            <DataTableHeadCell align="center" sorted="none">Status</DataTableHeadCell>
          </TableRow>
        </thead>
        <TableBody>
          {taxHistory.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(row.paymentDate).toLocaleDateString()}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="center">${row.amountPaid}</TableCell>
              <TableCell align="center">{row.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaxHistoryTable;
