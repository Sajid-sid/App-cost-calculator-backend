import React from "react";
import { motion } from "framer-motion";
import Mvp from "../assets/mvp.png";
import Basic from "../assets/basic.png";
import Polish from "../assets/polish.png";

const uiOptions = [
  { name: "Mvp", price: 8000, image: Mvp },
  { name: "Basic", price: 10000, image: Basic },
  { name: "Polished", price: 12000, image: Polish },
];

function UiSelection({ selectedUis, setSelectedUis }) {
  const toggleUi = (ui) => {
    const exists = selectedUis.some((u) => u.name === ui.name);

    if (exists) {
      // Unselect if the same one is clicked again
      setSelectedUis([]);
    } else {
      // Replace with the new single selection
      setSelectedUis([ui]);
    }
  };

  return (
    <div className="platform-section">
      <h2 className="sub">3. Choose UI</h2>
      <div className="platform-list">
        {uiOptions.map((ui,index) => {
          const isSelected = selectedUis.some((u) => u.name === ui.name);
           return (
                      <motion.div
                        key={ui.name}
                        className={`platform-card ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleUi(ui)}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={ui.image} alt={ui.name} />
                        <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                          {ui.name}
                        </p>
                        {isSelected && <div className="tick-mark">✓</div>}
                      </motion.div>
                    );
        })}
      </div>
    </div>
  );
}

export default UiSelection;
