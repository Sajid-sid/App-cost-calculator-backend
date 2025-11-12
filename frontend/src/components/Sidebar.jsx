import React, { useState } from "react";
import "./Sidebar.css"; // make sure your CSS is updated

function Sidebar({
  selectedPlatforms = [],
  selectedSizes = [],
  selectedUis = [],
  selectedUsers = [],
  selectedGenerators = [],
  selectedDates = [],
  selectedEngagement=[],
  selectedBilling=[],
  selectedAdmins=[],
  selectedApis=[],
  selectedSecurity=[],
}) {
  const [isOpen, setIsOpen] = useState(false);

  const total =
    selectedPlatforms.reduce((acc, p) => acc + p.price, 0) +
    selectedSizes.reduce((acc, s) => acc + s.price, 0) +
    selectedUis.reduce((acc, u) => acc + u.price, 0) +
    selectedUsers.reduce((acc, us) => acc + us.price, 0) +
    selectedGenerators.reduce((acc, g) => acc + g.price, 0) +
    selectedDates.reduce((acc, d) => acc + d.price, 0)+
    selectedEngagement.reduce((acc,s)=>acc+s.price,0)+
    selectedBilling.reduce((acc,b)=>acc+b.price,0)+
    selectedAdmins.reduce((acc,a)=>acc+a.price,0)+
    selectedApis.reduce((acc,ap)=>acc+ap.price,0)+
    selectedSecurity.reduce((acc,s)=>acc+s.price,0);

  return (
    <>
      {/* Menu button for mobile */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3>Check your App estimation</h3>

        {[
          { items: selectedPlatforms, label: "Platforms" },
          { items: selectedSizes, label: "Sizes" },
          { items: selectedUis, label: "UI" },
          { items: selectedUsers, label: "Users" },
          { items: selectedGenerators, label: "Generators" },
          { items: selectedDates, label: "Dates" },
          { items: selectedEngagement, label: "Engagement" },
          { items: selectedBilling, label: "Billing" },
          { items: selectedAdmins, label: "Admins" },
          { items: selectedApis, label: "APIs" },
          { items: selectedSecurity, label: "Security" },
        ].map((group, index) => (
          <ul key={index}>
            {group.items.map((item) => (
              <li key={item.name}>{item.name} : ₹{item.price}</li>
            ))}
          </ul>
        ))}

        <h4>Total Cost: ₹{total}</h4>
      </div>
    </>
  );
}

export default Sidebar;
