import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import PayYourTax from "layouts/billing"; // Ensure component import is consistent with new name
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import TaxFiling from "layouts/taxFiling";
import TaxCalculator from "layouts/TaxCalculation";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Pay Your Tax", // Updated name
    key: "pay-your-tax", // Updated key
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/pay-your-tax", // Updated route
    component: <PayYourTax />, // Ensure component import matches updated name
  },
  {
    type: "collapse",
    name: "Tax Calculator",
    key: "calculate-tax",
    icon: <Icon fontSize="small">calculate</Icon>,
    route: "/calculate-tax",
    component: <TaxCalculator />,
  },
  {
    type: "collapse",
    name: "File your tax",
    key: "file-your-tax",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/file-your-tax",
    component: <TaxFiling />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
