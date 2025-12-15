import React, { useRef, useState, useMemo } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./RequirementsTable.css";

const RequirementsTable = ({
  selectedPlatforms = [],
  selectedSizes = [],
  selectedUis = [],
  selectedUsers = [],
  selectedGenerators = [],
  selectedDates = [],
  selectedEngagement = [],
  selectedBilling = [],
  selectedAdmins = [],
  selectedApis = [],
  selectedSecurity = [],
}) => {
  const tableRef = useRef(null);

  // -------------------- STATE --------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // -------------------- HELPERS --------------------
  const getTotalPrice = (items = []) =>
    items.reduce((sum, item) => sum + (item?.price || 0), 0);

  const requirements = useMemo(
    () => [
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
    ],
    [
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
    ]
  );

  const grandTotal = useMemo(
    () => requirements.reduce((sum, r) => sum + getTotalPrice(r.items), 0),
    [requirements]
  );

  // -------------------- FORM --------------------
  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const { name, email, phone } = formData;
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(name)) newErrors.name = "Enter a valid name";
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Enter a 10-digit phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------- PDF --------------------
  const addHeader = async (pdf) => {
    const logo = new Image();
    logo.src = "/AspireLogo.png";
    await new Promise((res) => (logo.onload = res));

    const w = pdf.internal.pageSize.getWidth();
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, w, 70, "F");
    pdf.addImage(logo, "PNG", 40, 10, 40, 40);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(255);
    pdf.text("ASPIRE TEKHUB SOLUTIONS", 90, 35);
    pdf.setFontSize(10);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, w - 120, 35);
    pdf.setTextColor(0);
  };

  const addFooter = (pdf, y) => {
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    const footerY = Math.min(h - 60, y + 20);

    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, footerY, w, 60, "F");
    pdf.setTextColor(255);
    pdf.setFontSize(10);
    pdf.text(
      "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, Secunderabad - 500003",
      w / 2,
      footerY + 25,
      { align: "center" }
    );
    pdf.text(
      "040 4519 5642 | info@aspireths.com | www.aspireths.com",
      w / 2,
      footerY + 42,
      { align: "center" }
    );
  };

  // -------------------- SUBMIT --------------------
  const handleSendPdf = async () => {
    if (!validateForm()) {
      setStatusMessage("⚠️ Please fix the errors above.");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("📤 Sending email...");

      const canvas = await html2canvas(tableRef.current, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", "a4");
      await addHeader(pdf);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(
        "REQUIREMENTS SUMMARY",
        pdf.internal.pageSize.getWidth() / 2,
        110,
        { align: "center" }
      );

      const pdfWidth = pdf.internal.pageSize.getWidth() - 60;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 30, 130, pdfWidth, pdfHeight);
      addFooter(pdf, 130 + pdfHeight);

      const pdfBlob = pdf.output("blob");

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("message", formData.message);
      payload.append("file", pdfBlob, "requirements-summary.pdf");
      payload.append(
        "tableDetails",
        JSON.stringify(
          requirements.map((r) => ({
            name: r.name,
            selected: r.items.map((i) => ({
              name: i.name,
              price: i.price,
            })),
            totalPrice: getTotalPrice(r.items),
          }))
        )
      );
      payload.append("grandTotal", grandTotal);

      const res = await fetch(
        "https://app.aspireths.com/send-app-email",
        { method: "POST", body: payload }
      );
      const data = await res.json();

      setStatusMessage(
        res.ok
          ? "✅ Email sent successfully!"
          : `❌ Failed to send email: ${data.message || "Error"}`
      );
    } catch (err) {
      console.error(err);
      setStatusMessage("❌ Error generating or sending PDF.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="requirements-container">
      <div className="requirements-table" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>Requirement</th>
              <th>Selected</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>
                  {r.items.length
                    ? r.items.map((i) => i.name).join(", ")
                    : "None"}
                </td>
                <td>₹{getTotalPrice(r.items)}</td>
              </tr>
            ))}
            <tr className="grand-total-row">
              <td colSpan={2} align="right">
                Grand Total
              </td>
              <td>₹{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <form className="user-form" noValidate>
        <h3>Where should we send the estimate?</h3>

        {["name", "email", "phone"].map((f) => (
          <div key={f}>
            <input
              name={f}
              placeholder={`Your ${f}`}
              value={formData[f]}
              onChange={handleInputChange}
            />
            {errors[f] && <p className="error-text">{errors[f]}</p>}
          </div>
        ))}

        <textarea
          name="message"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleSendPdf} disabled={loading}>
          {loading ? "Sending..." : "Send PDF to Email"}
        </button>

        {statusMessage && <p>{statusMessage}</p>}
      </form>
    </div>
  );
};

export default RequirementsTable;
