const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "loanss3279@gmail.com",
        pass: "lxgz mxfl uzoi ckzo" 
      }
    });

    await transporter.sendMail({
      from: "loanss3279@gmail.com",
      to,
      subject,
      text
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
