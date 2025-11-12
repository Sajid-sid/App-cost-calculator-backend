import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./RequirementsTable.css";

const RequirementsTable = ({
  selectedPlatforms,
  selectedSizes,
  selectedUis,
  selectedUsers,
  selectedGenerators,
  selectedDates,
  selectedEngagement,
  selectedBilling,
  selectedAdmins,
  selectedApis,
  selectedSecurity,
}) => {
  const tableRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // ✅ Helper to calculate total price
  const getTotalPrice = (array) => {
    if (!array || array.length === 0) return 0;
    return array.reduce((acc, item) => acc + item.price, 0);
  };

  const requirements = [
    { id: 1, name: "Platform", items: selectedPlatforms },
    { id: 2, name: "Size", items: selectedSizes },
    { id: 3, name: "User Interface", items: selectedUis },
    { id: 4, name: "Social Login", items: selectedUsers },
    { id: 5, name: "User Content", items: selectedGenerators },
    { id: 6, name: "Locations", items: selectedDates },
    { id: 7, name: "Engagement", items: selectedEngagement },
    { id: 8, name: "Billing", items: selectedBilling },
    { id: 9, name: "Feedback", items: selectedAdmins },
    { id: 10, name: "External API", items: selectedApis },
    { id: 11, name: "Security", items: selectedSecurity },
  ];

  // ✅ Handle input changes & clear errors
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Validate all fields
  const validateForm = () => {
    const { name, email, phone } = formData;
    const newErrors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!name.trim()) newErrors.name = "Name is required.";
    else if (!nameRegex.test(name))
      newErrors.name = "Only letters and spaces are allowed.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email (e.g., akhila@gmail.com).";

    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(phone))
      newErrors.phone = "Enter a valid 10-digit number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ return true only if valid
  };

  // ✅ Send PDF (only after passing validation)
  const handleSendPdf = async () => {
    const isValid = validateForm();
    if (!isValid) {
      setStatusMessage("⚠️ Please fix the errors above before submitting.");
      return; // ⛔ STOP: Do not hit backend
    }

    setLoading(true);
    setStatusMessage("📤 Sending email... Please wait.");

    try {
      // generate PDF
      const input = tableRef.current;
      const canvas = await html2canvas(input, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      await addStyledHeader(pdf);
      const pageWidth = pdf.internal.pageSize.getWidth();
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("REQUIREMENTS SUMMARY", pageWidth / 2, 110, { align: "center" });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 60;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 30, 130, pdfWidth, pdfHeight);
      addStyledFooter(pdf, 130 + pdfHeight);

      // prepare data
      const pdfBlob = pdf.output("blob");
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("pdf", pdfBlob, "requirements-summary.pdf");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.message);

      // send backend request
      const res = await fetch("https://app.aspireths.com/send-pdf", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage("✅ Email sent successfully!");
      } else {
        setStatusMessage("❌ Failed to send email: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("❌ Error generating or sending PDF.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Styled header
  const addStyledHeader = (pdf) => {
    return new Promise((resolve) => {
      const logoUrl = "/AspireLogo.png";
      const logoImg = new Image();
      logoImg.crossOrigin = "Anonymous";
      logoImg.src = logoUrl;
      logoImg.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        pdf.setFillColor(59, 130, 246);
        pdf.rect(0, 0, pageWidth, 70, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.addImage(logoImg, "PNG", 40, 10, 40, 40);
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text("ASPIRE TEKHUB SOLUTIONS", 90, 35);
        pdf.setFontSize(10);
        const currentDate = new Date().toLocaleDateString();
        pdf.text(`Date: ${currentDate}`, pageWidth - 120, 35);
        pdf.setTextColor(0, 0, 0);
        resolve();
      };
    });
  };

  // ✅ Styled footer
  const addStyledFooter = (pdf, tableBottomY) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const footerY = Math.min(pageHeight - 70, tableBottomY + 20);
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, footerY, pageWidth, 60, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text(
      "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, RasoolPura, Secunderabad - 500003",
      pageWidth / 2,
      footerY + 25,
      { align: "center" }
    );
    pdf.text(
      "040 4519 5642 | info@aspireths.com | www.aspireths.com",
      pageWidth / 2,
      footerY + 42,
      { align: "center" }
    );
  };

  return (
    <div className="requirements-container">
      {/* ✅ Requirements Summary Table */}
      <div className="requirements-table" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>Requirement Questions</th>
              <th>Selected Specifications</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((req) => (
              <tr key={req.id}>
                <td data-label="Requirement Questions">{req.name}</td>
                <td data-label="Selected Specifications">
                  {req.items && req.items.length > 0
                    ? req.items.map((item) => item.name).join(", ")
                    : "None selected"}
                </td>
                <td data-label="Total Price">{getTotalPrice(req.items)}</td>
              </tr>
            ))}
          </tbody>
       
        <tr className="grand-total-row">
          <td  style={{ textAlign: "right", fontWeight: "bold" }}>
            Grand Total:
          </td>
          <td style={{ fontWeight: "bold" }}>
            ₹
            {requirements.reduce(
              (acc, req) => acc + getTotalPrice(req.items),
              0
            )}
          </td>
        </tr>
         </table>
      </div>

      {/* ✅ User Info Form */}
      <form className="user-form" noValidate>
        <h3>Where should we send you the detailed estimate?</h3>

        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label htmlFor="email">Your Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email (e.g. akhila@gmail.com)"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label htmlFor="phone">Your Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Enter your 10-digit number"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <label htmlFor="message">Your Message (optional)</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message"
          value={formData.message}
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleSendPdf} disabled={loading}>
          {loading ? "Sending..." : "Send PDF to Email"}
        </button>

        {statusMessage && (
          <p
            className={`status-message ${statusMessage.startsWith("⚠️") || statusMessage.startsWith("❌")
                ? "error-text"
                : "success-text"
              }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default RequirementsTable;
