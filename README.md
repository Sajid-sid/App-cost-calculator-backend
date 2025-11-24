## Demo Link: https://project-cost-calculator-olive.vercel.app
# 💰 Project Cost Calculator

A web-based tool to help users estimate software project costs based on selected requirements.  
It dynamically generates a **Requirements Summary PDF** and sends it via email — powered by **React**, **Node.js**, and **Nodemailer**.
---
## 🚀 Features	

✅ Interactive requirements selection (platform, size, UI, API, security, etc.)  
✅ Real-time total cost calculation  
✅ Generates a styled **PDF summary** using `jsPDF` and `html2canvas`  
✅ Sends the PDF directly to the user’s email via **Node + Nodemailer**  
✅ Client-side validation (name, email, phone)  
✅ Responsive and modern UI built with **React**  

---

## 🧱 Tech Stack

### **Frontend**
- React.js  
- jsPDF & html2canvas (for PDF generation)  
- CSS for styling  
- Fetch API for backend communication  

### **Backend**
- Node.js + Express  
- Nodemailer (for email service)  
- Multer (to handle PDF uploads in memory)  
- dotenv (for environment variables)  
- CORS (for frontend-backend communication)

---

### **Screenshots**
 
### Requirements 1
![Requirements1](https://private-user-images.githubusercontent.com/102479243/513221155-08195966-926e-4197-a795-2acb69bb374a.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDA3MTcsIm5iZiI6MTc2Mjk0MDQxNywicGF0aCI6Ii8xMDI0NzkyNDMvNTEzMjIxMTU1LTA4MTk1OTY2LTkyNmUtNDE5Ny1hNzk1LTJhY2I2OWJiMzc0YS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQwOTQwMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iNDJiNDU0ZmIwNmRiODVkMTRjYzgyMTVjNjM4MDhiMzU4NWNmMzNhZDU1YmY1ZTc1NGZkOTRjNDg1NGIwYWE1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.RZg-Fzlo0BOyME77KyRXRWed017WzyObstOIiK9VUUw)
### Requirements 2
![Requirements2](https://private-user-images.githubusercontent.com/102479243/513221111-729fa352-2a56-4b5d-8ccf-2232f3d3e3dc.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDA3MTcsIm5iZiI6MTc2Mjk0MDQxNywicGF0aCI6Ii8xMDI0NzkyNDMvNTEzMjIxMTExLTcyOWZhMzUyLTJhNTYtNGI1ZC04Y2NmLTIyMzJmM2QzZTNkYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQwOTQwMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zMDc5NGZlZTM0NzdjZjRiMjRhM2Y1YjE4NmVjMzllY2RmZjgxMzNiOTdiNGZkZWI2ZTZkYTExYjNkNjk3MTU0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.8tSdmeQtyzcv6BF3KnMAtAiaXypIft2RhbXW96m0QuI)
### Requirements 3
![Requirements3](https://private-user-images.githubusercontent.com/102479243/513221060-0b7398c5-76cd-47f8-a395-1fb2a621685c.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDA3MTcsIm5iZiI6MTc2Mjk0MDQxNywicGF0aCI6Ii8xMDI0NzkyNDMvNTEzMjIxMDYwLTBiNzM5OGM1LTc2Y2QtNDdmOC1hMzk1LTFmYjJhNjIxNjg1Yy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQwOTQwMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iZGYyMDhmYzM2Yzg2ZmUwNmJiMzEwNjI2Zjg2OTQxOTY2M2VhNGIyZjFhODEyODQ3ODk2NmU3YzNiZDU4MzllJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.pOM1Jgd0b3FMaEua2aXN40eBi9OFFa4Od1WxPFVpkJk)
### Requirements Table 1
![RequirementsTable1](https://private-user-images.githubusercontent.com/102479243/513220998-677e44ac-1dfd-468b-95d6-ef81ecfd9782.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDA3MTcsIm5iZiI6MTc2Mjk0MDQxNywicGF0aCI6Ii8xMDI0NzkyNDMvNTEzMjIwOTk4LTY3N2U0NGFjLTFkZmQtNDY4Yi05NWQ2LWVmODFlY2ZkOTc4Mi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQwOTQwMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03MGNmYTc0MjQ1ZGY4N2FkNmMyODcwOTJlYzY3MTBhNDIzNDQwY2ZhYjA3MzgyNjBmYzMyODU2MTUzNDI4NmI4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.c7zPMVvwvsWOjg4eGqfl8A1FGWJE2CMLNDx1r1ANSmE)
### Requirements Table 2
![RequirementsTable2]([https://private-user-images.githubusercontent.com/102479243/513220962-413c163a-f15e-4b4d-adde-3a13dfae498e.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDA3MTcsIm5iZiI6MTc2Mjk0MDQxNywicGF0aCI6Ii8xMDI0NzkyNDMvNTEzMjIwOTYyLTQxM2MxNjNhLWYxNWUtNGI0ZC1hZGRlLTNhMTNkZmFlNDk4ZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQwOTQwMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02ODg2M2VjODJlYTk5NDY0M2ZjMzEzMjhkZjViNzMwYzljMGQ3Y2Q4YjRjNTk5MTQxMzNhOWEyYjZhMWZiNjQyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.DJFHEmhY2Cus4dT4hTT1Pv-qdzTnsV-LDca_Pzkvwzg](https://private-user-images.githubusercontent.com/218208731/513260983-8d3b96e1-f095-4457-80a0-f17e29d11cea.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDQ5NDIsIm5iZiI6MTc2Mjk0NDY0MiwicGF0aCI6Ii8yMTgyMDg3MzEvNTEzMjYwOTgzLThkM2I5NmUxLWYwOTUtNDQ1Ny04MGEwLWYxN2UyOWQxMWNlYS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQxMDUwNDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mNzhhMjdhMTQyYjlhNDg5NWY3YThlNmU0OGVjYzFkNTZmYzFlYTk0M2FhYTdiZGMwNGVlZWM3NmM4ODAzNTVkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.dtAJMe901aD5XgXg4DCjW0MM2gPBTE3nmsYby_4X3MU))
### User Details Form
![UserDetailsForm]([https://private-user-images.githubusercontent.com/102479243/513220962-413c163a-f15e-4b4d-adde-3a13dfae498e.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDA3MTcsIm5iZiI6MTc2Mjk0MDQxNywicGF0aCI6Ii8xMDI0NzkyNDMvNTEzMjIwOTYyLTQxM2MxNjNhLWYxNWUtNGI0ZC1hZGRlLTNhMTNkZmFlNDk4ZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQwOTQwMTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02ODg2M2VjODJlYTk5NDY0M2ZjMzEzMjhkZjViNzMwYzljMGQ3Y2Q4YjRjNTk5MTQxMzNhOWEyYjZhMWZiNjQyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.DJFHEmhY2Cus4dT4hTT1Pv-qdzTnsV-LDca_Pzkvwzg](https://private-user-images.githubusercontent.com/218208731/513260983-8d3b96e1-f095-4457-80a0-f17e29d11cea.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI5NDQ5NDIsIm5iZiI6MTc2Mjk0NDY0MiwicGF0aCI6Ii8yMTgyMDg3MzEvNTEzMjYwOTgzLThkM2I5NmUxLWYwOTUtNDQ1Ny04MGEwLWYxN2UyOWQxMWNlYS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMlQxMDUwNDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mNzhhMjdhMTQyYjlhNDg5NWY3YThlNmU0OGVjYzFkNTZmYzFlYTk0M2FhYTdiZGMwNGVlZWM3NmM4ODAzNTVkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.dtAJMe901aD5XgXg4DCjW0MM2gPBTE3nmsYby_4X3MU))

 
 
 
 
 
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sajid-sid/App-cost-calculator-backend.git
cd App-cost-calculator-backend
```

### 2️⃣ Setup the frontend
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Setup the backend
```bash
cd backend
npm install
```

### 4️⃣ Create a `.env` file in your backend folder:
```
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=info@aspireths.com
EMAIL_PASS=XXXXXXXX
PORT=5000
```

### 5️⃣ Run the backend
```bash
node index.js
```

---

## 📧 Email Functionality

- When users select their project requirements and submit the form,  
  the app automatically:
  1. Generates a PDF summary from the selection table  
  2. Sends it to the entered email address via Nodemailer  
- Works with **Hostinger SMTP** (can also be configured for Gmail for testing)

---

## 📄 Example Output

The generated PDF includes:
- Company header (logo, name, date)
- User’s project selections
- Price breakdown and grand total
- Footer with Aspire TekHub contact details

---

## 🧠 Folder Structure

```
project-cost-calculator/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RequirementsTable.jsx
│   │   ├── styles/
│   │   │   └── RequirementsTable.css
│   │   └── App.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🧪 Local Testing

- Open your frontend (usually at `http://localhost:5173`)  
- Start the backend (`http://localhost:5000`)  
- Select requirements, enter valid details, and click **Send PDF to Email**

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## ✨ Author
 
💼 Aspire TekHub Solutions  
📧 [info@aspireths.com](mailto:info@aspireths.com)  
🌐 [www.aspireths.com](https://www.aspireths.com)

---

> “Turning project ideas into actionable cost insights.”


