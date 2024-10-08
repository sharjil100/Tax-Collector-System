import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [taxDues, setTaxDues] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate(); // Initialize the navigate hook
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      // Redirect to login page if no token found
      navigate("/login");
      return; // Prevent further execution
    }

    // Fetch user data, tax dues, payment history, and notifications
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userRes = await axios.get("http://localhost:5000/api/user", config);
        setUserData(userRes.data);

        const duesRes = await axios.get("http://localhost:5000/api/tax/dues", config);
        setTaxDues(duesRes.data);

        const paymentsRes = await axios.get("http://localhost:5000/api/tax/payments", config);
        setPaymentHistory(paymentsRes.data);

        const notificationsRes = await axios.get("http://localhost:5000/api/notifications", config);
        setNotifications(notificationsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, [token, navigate]); // Add navigate to dependencies

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>

      {/* User Information */}
      {userData && (
        <div className="card">
          <h2>User Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      )}

      {/* Tax Dues */}
      <div className="card">
        <h2>Tax Dues</h2>
        {taxDues.length > 0 ? (
          <ul>
            {taxDues.map((due, index) => (
              <li key={index}>{due.description}: ${due.amount}</li>
            ))}
          </ul>
        ) : (
          <p>No pending tax dues.</p>
        )}
      </div>

      {/* Payment History */}
      <div className="card">
        <h2>Payment History</h2>
        {paymentHistory.length > 0 ? (
          <ul>
            {paymentHistory.map((payment, index) => (
              <li key={index}>
                Payment of ${payment.amount} on {new Date(payment.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No payment history available.</p>
        )}
      </div>

      {/* Notifications */}
      <div className="card">
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        ) : (
          <p>No new notifications.</p>
        )}
      </div>

      <div className="actions">
        <Link to="/file-tax" className="button">File Your Tax</Link>
        <Link to="/payment" className="button">Make a Payment</Link>
        <Link to="/tax-history" className="button">View Tax History</Link>
        <Link to="/logout" className="button">Logout<i className="fa fa-sign-out" aria-hidden="true"></i></Link>
      </div>
    </div>
  );
};

export default Dashboard;
