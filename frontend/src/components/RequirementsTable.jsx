import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
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

  const getTotalPrice = (array) => {
    if (!array || array.length === 0) return 0;
    return array.reduce((acc, item) => acc + item.price, 0);
  };

    const formatTableDetails = () => {
  return requirements
    .map(req => `${req.name}: ${req.items.map(i => i.name).join(", ")}`)
    .join("\n");
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, phone } = formData;
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addStyledHeader = (pdf) => {
    return new Promise((resolve) => {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const headerHeight = 60;
      const logo = new Image();
      logo.src = "/AspireLogo.png";
      logo.onload = () => {
        pdf.setFillColor(0, 74, 173);
        pdf.rect(0, 0, pageWidth, headerHeight, "F");
        pdf.addImage(logo, "PNG", 20, 10, 40, 40);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);
        pdf.text("ASPIRE TEKHUB SOLUTIONS", pageWidth / 2, 30, { align: "center" });
        pdf.setFontSize(12);
        pdf.text(new Date().toLocaleDateString(), pageWidth - 70, 30);
        resolve();
      };
    });
  };

  const addStyledFooter = (pdf) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const footerHeight = 60;
    pdf.setFillColor(0, 74, 173);
    pdf.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(
      "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, Rasoolpura, Secunderabad - 500003",
      pageWidth / 2,
      pageHeight - 35,
      { align: "center" }
    );
    pdf.text(
      "040 4519 5642  |  info@aspireths.com  |  www.aspireths.com",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );
  };

  const generateStyledPdf = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    await addStyledHeader(pdf);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(0, 74, 173);
    pdf.text("REQUIREMENTS SUMMARY", pageWidth / 2, 110, { align: "center" });

    const startX = 40;
    let rowY = 150;
    const baseRowHeight = 25;

    // Fixed column widths
    const colWidths = {
      category: 150,
      items: 250,
      price: 100,
    };

    // Table Header
    pdf.setFillColor(0, 74, 173);
    pdf.rect(startX, rowY, colWidths.category + colWidths.items + colWidths.price, baseRowHeight, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Category", startX + 5, rowY + 17);
    pdf.text("Selected Items", startX + colWidths.category + 5, rowY + 17);
    pdf.text("Price (Rs.)", startX + colWidths.category + colWidths.items + 5, rowY + 17);
    rowY += baseRowHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);

    requirements.forEach((req) => {
      const items = req.items && req.items.length > 0 ? req.items : [{ name: "None selected", price: 0 }];
      const totalPrice = getTotalPrice(req.items);

      const splitText = pdf.splitTextToSize(items.map((item) => item.name).join("\n"), colWidths.items - 10);
      const cellHeight = baseRowHeight + (splitText.length - 1) * 14;
      const middleY = rowY + cellHeight / 2 + 5;

      // Category cell
      pdf.rect(startX, rowY, colWidths.category, cellHeight);
      pdf.text(req.name, startX + 5, rowY + 17);

      // Selected Items cell
      pdf.rect(startX + colWidths.category, rowY, colWidths.items, cellHeight);
      pdf.text(splitText, startX + colWidths.category + 5, rowY + 17);

      // Price cell (right-aligned)
      pdf.rect(startX + colWidths.category + colWidths.items, rowY, colWidths.price, cellHeight);
      const priceText = `Rs.${totalPrice.toLocaleString()}`;
      const priceX = startX + colWidths.category + colWidths.items + colWidths.price - 5 - pdf.getTextWidth(priceText);
      pdf.text(priceText, priceX, middleY);

      rowY += cellHeight;

      if (rowY + baseRowHeight > pageHeight - 100) {
        addStyledFooter(pdf);
        pdf.addPage();
        rowY = 40;
      }
    });

    // Grand Total
    const gTotal = requirements.reduce((acc, req) => acc + getTotalPrice(req.items), 0);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 74, 173);
    pdf.rect(startX, rowY, colWidths.category + colWidths.items + colWidths.price, baseRowHeight);
    pdf.text("Grand Total", startX + 5, rowY + 17);
    const gTotalText = `Rs.${gTotal.toLocaleString()}`;
    const gTotalX = startX + colWidths.category + colWidths.items + colWidths.price - 5 - pdf.getTextWidth(gTotalText);
    pdf.text(gTotalText, gTotalX, rowY + 17);

    rowY += baseRowHeight + 50;
    addStyledFooter(pdf);

    return pdf.output("blob");
  };

  const handleSendPdf = async () => {
    if (!validateForm()) {
      alert("⚠️ Please fix the errors before submitting!");
      return;
    }
    setLoading(true);
    try {
      const pdfBlob = await generateStyledPdf();
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("pdf", pdfBlob, "requirements-summary.pdf");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.message);
       formDataToSend.append("grandTotal", grandTotal);

    formDataToSend.append("tableDetails", formatTableDetails());

      console.log(formDataToSend);

      const res = await fetch("https://app.aspireths.com/send-app-email", {
        method: "POST",
        body: formDataToSend,
      });
      if (res.ok) alert("✅ Email sent successfully!");
      else alert("❌ Failed to send email.");
    } catch (err) {
      alert("❌ Error generating or sending PDF.");
    }
    setLoading(false);
  };

  return (
    <div className="requirements-container">
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
                <td>{req.name}</td>
                <td>
                  {req.items && req.items.length > 0
                    ? req.items.map((item) => item.name).join(", ")
                    : "None selected"}
                </td>
                <td>{getTotalPrice(req.items)}</td>
              </tr>
            ))}
            <tr className="grand-total-row">
              <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>
                Grand Total:
              </td>
              <td style={{ fontWeight: "bold" }}>
                ₹{requirements.reduce((acc, req) => acc + getTotalPrice(req.items), 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <form className="user-form" noValidate>
        <h3>Where should we send the detailed estimate?</h3>
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label>Your Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label>Your Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <label>Your Message (optional)</label>
        <textarea
          name="message"
          placeholder="Write your message"
          value={formData.message}
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleSendPdf} disabled={loading}>
          {loading ? "Sending..." : "Send PDF to Email"}
        </button>
      </form>
    </div>
  );
};

export default RequirementsTable;
