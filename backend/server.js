const express = require("express");
const path = require("path"); // For handling static paths
const fetch = require("node-fetch"); // For Hugging Face API requests
require("dotenv").config();

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

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/taxfilling", taxRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api", testRoutes);
app.use("/api/invoices", authenticate, invoiceRoutes);

// Chatbot API Route
app.post("/api/chat", async (req, res) => {
  const { input } = req.body;

  // Log the user input
  console.log("User Input:", input);

  if (!input) {
    return res.status(400).json({ message: "Input is required." });
  }

  // Define a structured prompt to guide the AI's response
  const promptTemplate = `
You are a helpful assistant specializing in tax-related queries. Your task is to provide clear and concise answers.

User Question: "${input}"

Your Answer:
`;


  try {
    // Log the API key (masked for security)
    console.log(
      "Using Hugging Face API Key:",
      process.env.HUGGINGFACE_API_KEY?.slice(0, 10) + "********"
    );

    const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: promptTemplate, // Use the structured prompt
          parameters: {
            max_new_tokens: 300, // Adjust token limits for balanced response length
            temperature: 0.7, // Balance between creativity and deterministic responses
            top_p: 0.9, // Focus on the most likely responses
          },
        }),
      }
    );

    // Log the response status and headers
    console.log("API Response Status:", response.status);
    console.log("API Response Headers:", response.headers);

    if (!response.ok) {
      throw new Error("Failed to fetch response from Hugging Face API.");
    }

    const data = await response.json();

    // Log the full API response body
    console.log("API Response Body:", data);

    // Extract the generated_text from the first object in the array
    const output =
      data[0]?.generated_text || "Sorry, no valid response was generated.";

    // Log the final extracted response
    console.log("Generated Response:", output);

    // Send the response back to the frontend
    res.json({ message: output });
  } catch (error) {
    // Log detailed errors for debugging
    console.error("Error Message:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
