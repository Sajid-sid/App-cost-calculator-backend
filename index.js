// -----------------------------------------
// Imports
// -----------------------------------------
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// -----------------------------------------
// Fix __dirname in ES modules
// -----------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------
// Middleware
// -----------------------------------------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// -----------------------------------------
// MySQL Connection
// -----------------------------------------
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("❌ MySQL Connection Failed:", err);
  else console.log("✅ MySQL Connected");
});

// -----------------------------------------
// File Upload (PDF)
// -----------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "uploads");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF allowed"), false);
  },
});

// -----------------------------------------
// Test Route
// -----------------------------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend Running Successfully");
});

// -----------------------------------------
// Nodemailer transporter
// -----------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =====================================================================
// 1️⃣ WEBSITE EMAIL → SAVE + SEND
// =====================================================================
app.post("/send-email", upload.single("pdf"), (req, res) => {
  const { name, email, phone, message, tableDetails, grandTotal } = req.body;
  const pdfFile = req.file;

  if (!name || !email || !phone || !pdfFile) {
    return res.status(400).json({ message: "Name, Email, Phone, PDF required" });
  }

  const totalAmount = parseFloat(grandTotal) || 0;

  // Save to 'quotations' table
  db.query(
    `INSERT INTO quotations 
     (customer_name, customer_email, customer_phone, message, table_details, grand_total)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, message || "", tableDetails || "{}", totalAmount],
    async (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ message: "DB Insert Error", error: err });
      }

      try {
        // Email to Admin
        await transporter.sendMail({
          from: `"Aspire TekHub" <${process.env.EMAIL_USER}>`,
          to: "info@aspireths.com",
          subject: `New Website Quotation from ${name}`,
          html: `
            <h3>New Website Quotation Submitted</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Grand Total:</b> ₹${totalAmount}</p>
            <p><b>Message:</b> ${message || "No message"}</p>
            <pre>${tableDetails || ""}</pre>
          `,
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
        });

        // Email to Client
        await transporter.sendMail({
          from: `"Aspire TekHub" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Your Website Quotation - ${name}`,
          text: `Hello ${name || "there"},\n\nThank you for using Aspire TekHub's Website Cost Calculator. Your quotation is attached.\n\nRegards,\nAspire TekHub`,
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
        });

        // Delete uploaded file
        fs.unlinkSync(pdfFile.path);

        res.json({ message: "Website quotation saved + emails sent to admin and client!" });
      } catch (emailError) {
        console.error("❌ Email Error:", emailError);
        res.status(500).json({ message: "Email sending failed", error: emailError.message });
      }
    }
  );
});


// =====================================================================
// 2️⃣ FETCH WEBSITE QUOTATIONS
// =====================================================================
app.get("/api/quotations", (req, res) => {
  db.query("SELECT * FROM quotations ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ message: "Fetch Error", error: err.message });
    res.json(rows);
  });
});

// App Quotations
app.get("/api/app-quotations", (req, res) => {
  db.query("SELECT * FROM app_cost_requests ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ message: "Fetch Error", error: err.message });
    res.json(rows);
  });
});
// =====================================================================
// 3️⃣ APP EMAIL → SAVE + SEND
// =====================================================================
app.post("/send-app-email", upload.single("pdf"), (req, res) => {
  const { name, email, phone, message, tableDetails, grandTotal } = req.body;
  const pdfFile = req.file;

  if (!name || !email || !phone || !pdfFile) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const totalAmount = parseFloat(grandTotal) || 0;

  // Save to App Table
  db.query(
    `INSERT INTO app_cost_requests (customer_name, customer_email, customer_phone, message, table_details, grand_total)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, message || "", tableDetails || "", totalAmount],
    async (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ message: "DB Insert Error", error: err });
      }

      try {
        // Email to Admin
        await transporter.sendMail({
          from: `"Aspire TekHub" <${process.env.EMAIL_USER}>`,
          to: "info@aspireths.com",
          subject: `New App Quotation from ${name}`,
          html: `
            <h3>New App Quotation Submitted</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Grand Total:</b> ₹${totalAmount}</p>
            <p><b>Message:</b> ${message || "No message"}</p>
            <pre>${tableDetails || ""}</pre>
          `,
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
        });

        // Email to Client
        await transporter.sendMail({
          from: `"Aspire TekHub" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Your App Quotation - ${name}`,
          text: `Hello ${name || "there"},\n\nThank you for using Aspire TekHub's App Cost Calculator. Your quotation is attached.\n\nRegards,\nAspire TekHub`,
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
        });

        fs.unlinkSync(pdfFile.path);

        res.json({ message: "App quotation saved + emails sent to admin and client!" });
      } catch (emailError) {
        console.error("❌ Email Error:", emailError);
        res.status(500).json({ message: "Email sending failed", error: emailError.message });
      }
    }
  );
});

// =====================================================================
// 4️⃣ FETCH APP QUOTATIONS
// =====================================================================
// app.get("/api/quotations", (req, res) => {
//   db.query("SELECT * FROM quotations ORDER BY id DESC", (err, rows) => {
//     if (err) return res.status(500).json({ message: "Fetch Error", error: err.message });
//     res.json(rows);
//   });
// });
// app.get("/api/app-quotations", (req, res) => {
//   db.query("SELECT * FROM app_cost_requests ORDER BY id DESC", (err, rows) => {
//     if (err) return res.status(500).json({ message: "Fetch Error", error: err.message });
//     res.json(rows);
//   });
// });
app.post("/send-app-email", upload.single("pdf"), async (req, res) => {
  const { name, email, phone, message, tableDetails, grandTotal } = req.body;
  const pdfFile = req.file;

  // Validate fields
  if (!name || !email || !phone || !pdfFile) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const totalAmount = parseFloat(grandTotal) || 0;

  // Save to MySQL
  db.query(
    `INSERT INTO app_cost_requests 
      (customer_name, customer_email, customer_phone, message, table_details, grand_total, pdf) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone,
      message || "",
      tableDetails || "",
      totalAmount,
      pdfFile.buffer, // <-- Save PDF as BLOB
    ],
    async (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ message: "DB Insert Error", error: err });
      }

      // ==== EMAIL SEND ====
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your App Development Cost Estimate",
          html: `
            <h2>Hi ${name},</h2>
            <p>Thank you for using our App Cost Calculator.</p>
            <p><strong>Total Estimate: ₹${totalAmount}</strong></p>
            <p>Please find your detailed PDF attached.</p>
          `,
          attachments: [
            {
              filename: "App-Quotation.pdf",
              content: pdfFile.buffer,
            },
          ],
        });

        res.json({
          message: "Email sent successfully!",
          id: result.insertId,
        });
      } catch (emailErr) {
        console.error("❌ Email Error:", emailErr);
        res.status(500).json({ message: "Email Send Error", error: emailErr });
      }
    }
  );
});

// =====================================================================
// 5️⃣ LOGIN
// =====================================================================
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    `SELECT * FROM quotationadmin WHERE username = ? AND password = ?`,
    [username, password],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err.message });
      if (rows.length === 0) return res.status(401).json({ message: "Invalid Credentials" });

      const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.json({ message: "Login Successful", token });
    }
  );
});

// -----------------------------------------
// Start Server
// -----------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
