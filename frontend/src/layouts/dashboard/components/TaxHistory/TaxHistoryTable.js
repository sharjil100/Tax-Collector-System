// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";

function TaxHistoryTable() {
  // Sample data for the table rows
  const taxHistory = [
    {
      date: "15 OCT 2024",
      type: "Payment",
      amount: "$1500",
      status: "Completed",
    },
    {
      date: "10 OCT 2024",
      type: "Notice",
      amount: "N/A",
      status: "Late Filing",
    },
    {
      date: "5 OCT 2024",
      type: "Refund",
      amount: "$300",
      status: "Processed",
    },
    {
      date: "1 OCT 2024",
      type: "Payment",
      amount: "$2000",
      status: "Pending",
    },
  ];

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
            <DataTableHeadCell align="left" sorted="none">
              Date
            </DataTableHeadCell>
            <DataTableHeadCell align="left" sorted="none">
              Type
            </DataTableHeadCell>
            <DataTableHeadCell align="center" sorted="none">
              Amount
            </DataTableHeadCell>
            <DataTableHeadCell align="center" sorted="none">
              Status
            </DataTableHeadCell>
          </TableRow>
        </thead>
        <TableBody>
          {taxHistory.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaxHistoryTable;
