import React from "react";
import { motion } from "framer-motion";
import small from "../assets/s.png";
import Large from "../assets/l.png";
import Medium from "../assets/m.png";

const sizes = [
  { name: "Small", price: 5000, image: small },
  { name: "Medium", price: 10000, image: Medium },
  { name: "Large", price: 15000, image: Large },
];

function SizeSelection({ selectedSizes, setSelectedSizes }) {
  const toggleSize = (size) => {
    const isSelected = selectedSizes.some((s) => s.name === size.name);
    if (isSelected) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes([size]);
    }
  };

  return (
    <div className="platform-section">
      <h2 className="sub">2. Choose Size</h2>
      <div className="platform-list">
        {sizes.map((size, index) => {
          const isSelected = selectedSizes.some((s) => s.name === size.name);
          return (
            <motion.div
              key={size.name}
              className={`platform-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleSize(size)}
              initial={{ opacity: 0, scale: 0.8, y: 30 }} //before animation
              animate={{ opacity: 1, scale: 1, y: 0 }}    //after animattion
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={size.image} alt={size.name} />
              <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                {size.name}
              </p>
              {isSelected && <div className="tick-mark">✓</div>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SizeSelection;
