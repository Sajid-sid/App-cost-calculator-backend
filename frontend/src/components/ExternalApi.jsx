import React from "react";
import { motion } from "framer-motion";
import Sms from "../assets/SMS.jpg";
import Phone from "../assets/Phone.png";
import Api from "../assets/API.png";
import Connection from "../assets/Connect.png";

// Data for social & engagement options
const Apis = [
  { name: "SMS Messaging", price: 10000, image: Sms },
  { name: "Phone Number Masking", price: 10000, image: Phone },
  { name: "API Integration", price: 10000, image: Api },
  { name: "Connect More Services", price: 10000, image: Connection },
];

function ExternalApis({ selectedApis, setSelectedApis, selectedPlatforms }) {
  const isDisabled = !selectedPlatforms || selectedPlatforms.length === 0;

  const toggleApis = (api) => {
    if (isDisabled) return;

    const exists = selectedApis.some((a) => a.name === api.name);
    if (exists) {
      setSelectedApis(selectedApis.filter((a) => a.name !== api.name));
    } else {
      setSelectedApis([...selectedApis, api]);
    }
  };

  return (
    <div className="platform-section">
      <h2 className="sub">10. External APIs and Integrations</h2>
      <div
        className="platform-list"
        style={{
          pointerEvents: isDisabled ? "none" : "auto",
          opacity: isDisabled ? 1 : 1,
          filter: isDisabled ? "grayscale(70%)" : "none",
        }}
      >
        {Apis.map((api, index) => {
          const isSelected = selectedApis.some((a) => a.name === api.name);

          return (
            <motion.div
              key={api.name}
              className={`platform-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleApis(api)}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={api.image} alt={api.name} />
              <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                {api.name}
              </p>
              {isSelected && <div className="tick-mark">✓</div>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ExternalApis;
