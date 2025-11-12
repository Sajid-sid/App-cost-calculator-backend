import React from "react";
import { motion } from "framer-motion";
import android from "../assets/Android.png";
import ios from "../assets/ios.png";
// import web from "../assets/web.png";

const platforms = [
  { name: "Android", price: 25000, image: android },
  { name: "iOS", price: 25000, image: ios },
  // { name: "Web", price: 25000, image: web },
];

function PlatformSelection({ selectedPlatforms, setSelectedPlatforms }) {
  const togglePlatform = (platform) => {
    const exists = selectedPlatforms.some((p) => p.name === platform.name);

    if (exists) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p.name !== platform.name));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="platform-section">
      <h2 className="title">1. Choose Platform</h2>

      <div className="user">
        {platforms.map((platform, index) => {
          const isSelected = selectedPlatforms.some((p) => p.name === platform.name);

          return (
            <motion.div
              key={platform.name}
              className={`platform-card ${isSelected ? "selected" : ""}`}
              onClick={() => togglePlatform(platform)}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={platform.image} alt={platform.name} />
              <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                {platform.name}
              </p>
              {isSelected && <div className="tick-mark">✓</div>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PlatformSelection;
