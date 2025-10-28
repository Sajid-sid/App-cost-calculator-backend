// index.js
const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "https://project-cost-calculator-olive.vercel.app", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Multer config to accept PDF in memory
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

// ✅ POST endpoint to send PDF via email
app.post("/send-pdf", upload.single("pdf"), async (req, res) => {
  const { name, email, phone, message } = req.body;
  const pdfFile = req.file;

  if (!email || !pdfFile) {
    return res.status(400).json({ error: "Email and PDF are required" });
  }

  try {
    // ✅ Hostinger SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.hostinger.com",
      port: process.env.EMAIL_PORT || 465,
      secure: true, // true = SSL (port 465)
      auth: {
        user: process.env.EMAIL_USER || "info@aspireths.com",
        pass: process.env.EMAIL_PASS, // ⚠️ Store this in .env
      },
      tls: {
        rejectUnauthorized: false, // ✅ Prevent self-signed certificate issues
      },
    });

    // ✅ Verify SMTP connection before sending
    await transporter.verify();
    console.log("✅ Hostinger SMTP connected successfully!");

    // ✅ Define mail options
    const mailOptions = {
      from: `"Aspire TekHub" <info@aspireths.com>`,
      to: email,
      subject: `Your Project Requirements Summary${name ? ` - ${name}` : ""}`,
      text: `
Hello ${name || "there"},

Thank you for using Aspire TekHub's Project Cost Calculator.

Here are your submitted details:
---------------------------------
Name: ${name || "N/A"}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message || "No message provided."}

Your project requirements summary PDF is attached below.

Best regards,
Aspire TekHub Solutions
      `,
      attachments: [
        {
          filename: pdfFile.originalname,
          content: pdfFile.buffer,
        },
      ],
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.json({ message: "✅ Email sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    res.status(500).json({ error: "Error sending email", details: err.message });
  }
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// // index.js
// const express = require("express");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // ✅ Enable CORS for frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// // ✅ Parse JSON and URL-encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Multer config to accept PDF in memory
// const upload = multer({
//   storage: multer.memoryStorage(),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") cb(null, true);
//     else cb(new Error("Only PDF files are allowed"));
//   },
// });

// // ✅ POST endpoint to send PDF via email
// // ✅ POST endpoint to send PDF via email
// app.post("/send-pdf", upload.single("pdf"), async (req, res) => {
//   const { name, email, phone, message } = req.body;
//   const pdfFile = req.file;

//   if (!email || !pdfFile) {
//     return res.status(400).json({ error: "Email and PDF are required" });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "akhila.thada@gmail.com",
//         pass: "ywnoafzgcbgfkffc",
//       },
//     });

//     const mailOptions = {
//       from: '"Aspire TekHub" <akhila.thada@gmail.com>',
//       to: email,
//       subject: `Your Project Requirements Summary${name ? ` - ${name}` : ""}`,
//       text: `
// Hello ${name || "there"},

// Thank you for using Aspire TekHub's Project Cost Calculator.

// Here are your submitted details:
// ---------------------------------
// Name: ${name || "N/A"}
// Email: ${email}
// Phone: ${phone || "N/A"}
// Message: ${message || "No message provided."}

// Your project requirements summary PDF is attached below.

// Best regards,
// Aspire TekHub Solutions
//       `,
//       attachments: [
//         {
//           filename: pdfFile.originalname,
//           content: pdfFile.buffer,
//         },
//       ],
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: "✅ Email sent successfully!" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     res.status(500).json({ error: "Error sending email" });
//   }
// });


// // ✅ Health check route
// app.get("/", (req, res) => {
//   res.send("Server is running.");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
