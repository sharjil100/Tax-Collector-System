const express = require("express");
const path = require('path'); // For handling static paths

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment.routes");
const notificationRoutes = require("./routes/notification.routes");
const taxRoutes = require("./routes/taxfilling.routes");
const documentRoutes = require("./routes/document.routes");
const testRoutes = require("./routes/test.routes"); 
const invoiceRoutes = require("./routes/invoice.routes");
const { authenticate } = require("./middleware/auth.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/taxfilling", taxRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api", testRoutes);
app.use("/api/invoices", authenticate, invoiceRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
