import React from "react";
import { motion } from "framer-motion";
import calender from "../assets/calender.png";
import Booking from "../assets/Booking.png";
import CustomMap from "../assets/custom map.png";
import Map from "../assets/map.png";

// Data for dates
const Dates = [
  { name: "calender", price: 12000, image: calender },
  { name: "Booking", price: 15000, image: Booking },
  { name: "CustomMap", price: 10000, image: CustomMap },
  { name: "Map", price: 10000, image: Map },
];

function DatesAndLocation({ selectedDates, setSelectedDates, selectedPlatforms }) {
  const toggleDate = (date) => {
    if (!selectedPlatforms || selectedPlatforms.length === 0) return; // prevent selection if no platform

    const exists = selectedDates.some((d) => d.name === date.name);
    if (exists) {
      setSelectedDates(selectedDates.filter((d) => d.name !== date.name));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className="platform-section">
      <h2 className="sub">6. Dates & Locations</h2>
      <div className="platform-list">
        
        {Dates.map((date,index) => {
          const isSelected = selectedDates.some((d) => d.name === date.name);
          const isDisabled = !selectedPlatforms || selectedPlatforms.length === 0;

         return (
                      <motion.div
                        key={date.name}
                        className={`platform-card ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleDate(date)}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={date.image} alt={date.name} />
                        <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                          {date.name}
                        </p>
                        {isSelected && <div className="tick-mark">✓</div>}
                      </motion.div>
                    );
        })}
      </div>
    </div>
  );
}

export default DatesAndLocation;
