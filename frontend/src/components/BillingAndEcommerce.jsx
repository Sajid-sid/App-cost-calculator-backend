import React from "react";
import { motion } from "framer-motion";
import Subscription from "../assets/Subscription.png";
import Market from "../assets/Marketplace.png";
import Product from "../assets/Product.png";
import Shopping from "../assets/ShoppingCart.png";
import Payment from "../assets/Payment.png";

// Data for Billing & eCommerce
const Billings = [
  { name: "Subscription", price: 12000, image: Subscription },
  { name: "User Marketplace", price: 15000, image: Market },
  { name: "Product", price: 10000, image: Product },
  { name: "Shopping Cart", price: 10000, image: Shopping },
  { name: "Payment", price: 10000, image: Payment },
];

function BillingAndEcommerce({ selectedBilling, setSelectedBilling, selectedPlatforms }) {
  const toggleBilling = (bill) => {
    if (!selectedPlatforms || selectedPlatforms.length === 0) return; // prevent selection if no platform

    const exists = selectedBilling.some((b) => b.name === bill.name);
    if (exists) {
      setSelectedBilling(selectedBilling.filter((b) => b.name !== bill.name));
    } else {
      setSelectedBilling([...selectedBilling, bill]);
    }
  };

  const isDisabled = !selectedPlatforms || selectedPlatforms.length === 0;

  return (
    <div className="platform-section">
      <h2 className="sub">8. Billing & eCommerce</h2>
      <div className="platform-list">
        {Billings.map((bill,index) => {
          const isSelected = selectedBilling.some((b) => b.name === bill.name);

          return (
                              <motion.div
                                key={bill.name}
                                className={`platform-card ${isSelected ? "selected" : ""}`}
                                onClick={() => toggleBilling(bill)}
                                initial={{ opacity: 0, scale: 0.8, y: 30 }} //before animation
                                animate={{ opacity: 1, scale: 1, y: 0 }}    //after animattion
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <img src={bill.image} alt={bill.name} />
                                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                                  {bill.name}
                                </p>
                                {isSelected && <div className="tick-mark">✓</div>}
                              </motion.div>
                            );
        })}
      </div>
    </div>
  );
}

export default BillingAndEcommerce;
