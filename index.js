import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// -----------------------------------------
// Fix __dirname in ES modules
// -----------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------
// Ensure folders exist
// -----------------------------------------
const uploadDir = path.join(__dirname, "uploads");
const filesDir = path.join(__dirname, "files");
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(filesDir, { recursive: true });

// -----------------------------------------
// Multer Setup (PDF + DOCX)
// -----------------------------------------
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// -----------------------------------------
// Middleware
// -----------------------------------------
app.use(cors({ origin: ["https://frontend.app.aspireths.com", "http://localhost:5173"], methods: ["GET", "POST"], allowedHeaders: ["Content-Type", "Authorization"] }));
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

// -----------------------------------------
// Test Route
// -----------------------------------------
app.get("/", (req, res) => res.send("🚀 Backend Running Successfully"));

// -----------------------------------------
// DOCX → PDF Conversion
// -----------------------------------------
app.post("/convertFile", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const inputPath = req.file.path;
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const outputPdf = path.join(filesDir, `${baseName}.pdf`);

  const libreOfficePath = "soffice";

  const command = `${libreOfficePath} --headless --convert-to pdf --outdir "${filesDir}" "${inputPath}"`;

  exec(command, { maxBuffer: 1024 * 5000 }, (err) => {
    if (err || !fs.existsSync(outputPdf)) {
      console.error("❌ Conversion failed", err);
      return res.status(500).json({ message: "PDF conversion failed" });
    }

    res.download(outputPdf, () => {
      try { fs.unlinkSync(inputPath); } catch {}
      try { fs.unlinkSync(outputPdf); } catch {}
    });
  });
});

// -----------------------------------------
// WEBSITE EMAIL → SAVE + SEND
// -----------------------------------------
app.post("/send-email", upload.single("file"), async (req, res) => {
  const { name, email, phone, message, tableDetails, grandTotal } = req.body;
  const pdfFile = req.file;

  if (!name || !email || !phone || !pdfFile)
    return res.status(400).json({ message: "Name, Email, Phone, and PDF/DOCX required" });

  const totalAmount = parseFloat(grandTotal) || 0;
//save the website qotation details
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
          from: `"Aspire TekHub solutions" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Your Website Quotation - ${name}`,
           text: `Hello ${name || "there"},\nGreetings from Aspire! \n\nRegards,\nWeb Development Team\nAspire Tekhub solutions`,
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
        });

        fs.unlinkSync(pdfFile.path);

        res.json({ message: "Website quotation saved + emails sent!" });
      } catch (emailError) {
        console.error("❌ Email Error:", emailError);
        res.status(500).json({ message: "Email sending failed", error: emailError.message });
      }
    }
  );
});

// -----------------------------------------
// APP EMAIL → SAVE + SEND
// -----------------------------------------
app.post("/send-app-email", upload.single("file"), async (req, res) => {
  const { name, email, phone, message, tableDetails, grandTotal } = req.body;
  const pdfFile = req.file;

  if (!name || !email || !phone || !pdfFile)
    return res.status(400).json({ message: "Missing fields" });

  const totalAmount = parseFloat(grandTotal) || 0;
//save the app_cost_calculator quotation details
  db.query(
    `INSERT INTO app_cost_requests 
      (customer_name, customer_email, customer_phone, message, table_details, grand_total)
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
          from: `"Aspire TekHub solutions" <${process.env.EMAIL_USER}>`,
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
          from: `"Aspire TekHub solutions" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Your App Quotation - ${name}`,
         text: `Hello ${name || "there"},\nGreetings from Aspire! \n\nRegards,\nMobile App Development Team \nAspire Tekhub solutions`,
          attachments: [{ filename: pdfFile.originalname, path: pdfFile.path }],
        });

        fs.unlinkSync(pdfFile.path);

        res.json({ message: "App quotation saved + emails sent!" });
      } catch (emailError) {
        console.error("❌ Email Error:", emailError);
        res.status(500).json({ message: "Email sending failed", error: emailError.message });
      }
    }
  );
});

// -----------------------------------------
// FETCH WEBSITE QUOTATIONS
// -----------------------------------------
app.get("/api/quotations", (req, res) => {
  db.query("SELECT * FROM quotations ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ message: "Fetch Error", error: err.message });
    res.json(rows);
  });
});

// -----------------------------------------
// FETCH APP QUOTATIONS
// -----------------------------------------
app.get("/api/app-quotations", (req, res) => {
  db.query("SELECT * FROM app_cost_requests ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ message: "Fetch Error", error: err.message });
    res.json(rows);
  });
});

// -----------------------------------------
// LOGIN
// -----------------------------------------
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required" });
  //save login details in database

  db.query(
    `SELECT * FROM quotationadmin WHERE username = ? AND password = ?`,
    [username, password],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err.message });
      if (rows.length === 0) return res.status(401).json({ message: "Invalid Credentials" });

      const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "1d" });
      res.json({ message: "Login Successful", token });
    }
  );
});

// -----------------------------------------
// Start Server
// -----------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
