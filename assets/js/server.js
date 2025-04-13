require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ POST route to send email
app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email, // user's email from form
    to: process.env.EMAIL_USER, // your own email where you want to receive the message
    subject: `New Message from ${name}: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).send("Error sending email.");
  }
});

// ✅ Server start
app.listen(5000, () => console.log("✅ Server running on port 5000"));
