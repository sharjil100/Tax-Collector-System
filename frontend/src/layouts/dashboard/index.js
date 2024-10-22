import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import NoticeBoard from "./NoticeBoard/NoticeBoard";
import UserInfo from "./components/UserInfo/UserInfo";
import TaxHistoryTable from "./components/TaxHistory/TaxHistoryTable";
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Add UserInfo Component */}
        <Grid item xs={12} md={6} lg={8}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <NoticeBoard /> 
        </Grid>       
        <MDBox>
          <Grid container spacing={3}>
            {/* History */}
            <Grid item xs={12} md={6} lg={8}>
              <TaxHistoryTable /> 
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
