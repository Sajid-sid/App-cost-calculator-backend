import React from "react";
import { motion } from "framer-motion";
import facebook from "../assets/facebook.jpg";
import email from "../assets/email.png";
import gmail from "../assets/gmail.png";
import linkedin from "../assets/linkdin.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import google from "../assets/google.png";
// import account from "../assets/accounts.jpg";
// Data for "Users & Accounts" options
const users = [
  { name: "Facebook Login", price: 7000, image: facebook },
  { name: "Email Sign Up", price: 7000, image: email },
  { name: "LinkedInSign Up", price: 7000, image: linkedin },
  { name: "User Invitation Emails", price: 7000, image: gmail },
  { name: "Twitter Sign Up", price: 7000, image: twitter },
  { name: "Instagram Sign Up", price: 7000, image: instagram },
  { name: "google Sign Up", price: 7000, image:google },
  // { name: "Multi-tenant Accounts", price: 7000, image:account },
];

function UserSelection({ selectedUsers, setSelectedUsers }) {
  const toggleUser = (user) => {
    const exists = selectedUsers.some((us) => us.name === user.name);

    if (exists) {
      // Remove from selection
      setSelectedUsers(selectedUsers.filter((us) => us.name !== user.name));
    } else {
      // Add to selection
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <div className="platform-section">
      <h2 className="sub">4. Choose Users & Accounts</h2>
      <div className="platform-list">
        {users.map((user,index) => {
          const isSelected = selectedUsers.some((us) => us.name === user.name);
            return (
                      <motion.div
                        key={user.name}
                        className={`platform-card ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleUser(user)}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={user.image} alt={user.name} />
                        <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                          {user.name}
                        </p>
                        {isSelected && <div className="tick-mark">✓</div>}
                      </motion.div>
                    );
        })}
      </div>
    </div>
  );
}

export default UserSelection;
