const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Contact form route
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("Form Data Received:", req.body);

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cc0257195@gmail.com",
      pass: "ytbqjgjqctfclokp",
    },
  });

  const mailOptions = {
    from: email,
    to: "cc0257195@gmail.com", // your email to receive messages
    subject: `New Contact Message: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to send message" });
    }
    res.json({ message: "Message sent successfully!" });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
