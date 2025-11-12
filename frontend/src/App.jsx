import React, { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import PlatformSelection from "./components/PlatformSelection";
import UiSelection from "./components/UiSelection";
import SizeSelection from "./components/SizeSelection";
import UserSelection from "./components/UserSelection";
import UsersAndGenerated from "./components/UsersAndGenreated";
import DatesAndLocation from "./components/DatesAndLocation";
import SocialAndEngagement from "./components/SocialAndEngagement";
import BillingAndEcommerce from "./components/BillingAndEcommerce";
import AdminFeedback from "./components/AdminFeedback";
import ExternalApis from "./components/ExternalApi";
import Security from "./components/Security";
import RequirementsTable from "./components/RequirementsTable";

function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedUis, setSelectedUis] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGenerators, setSelectedGenerators] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedEngagement, setSelectedEngagement] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectedApis, setSelectedApis] = useState([]);
  const [selectedSecurity, setSelectedSecurity] = useState([]);

  return (
    <div className="container">
      <h1 className="heading">HOW MUCH COST TO MAKE AN APP</h1>

      <div className="screen">
        {/* All your selection components */}
        <PlatformSelection
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />

        <SizeSelection
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />

        <UiSelection
          selectedUis={selectedUis}
          setSelectedUis={setSelectedUis}
        />

        <UserSelection
         selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          />

        <UsersAndGenerated
          selectedGenerators={selectedGenerators}
          setSelectedGenerators={setSelectedGenerators}
        />

        <DatesAndLocation
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          selectedPlatforms={selectedPlatforms}
        />

        <SocialAndEngagement
          selectedEngagement={selectedEngagement}
          setSelectedEngagement={setSelectedEngagement}
          selectedPlatforms={selectedPlatforms}
        />

        <BillingAndEcommerce
          selectedBilling={selectedBilling}
          setSelectedBilling={setSelectedBilling}
          selectedPlatforms={selectedPlatforms}
        />

        <AdminFeedback
          selectedAdmins={selectedAdmins}
          setSelectedAdmins={setSelectedAdmins}
          selectedPlatforms={selectedPlatforms}
        />

        <ExternalApis
          selectedApis={selectedApis}
          setSelectedApis={setSelectedApis}
          selectedPlatforms={selectedPlatforms}
        />

        <Security
          selectedSecurity={selectedSecurity}
          setSelectedSecurity={setSelectedSecurity}
          selectedPlatforms={selectedPlatforms}
        />

        {/* Requirements Table - Add this at the end */}
        <RequirementsTable
          selectedPlatforms={selectedPlatforms}
          selectedSizes={selectedSizes}
          selectedUis={selectedUis}
          selectedUsers={selectedUsers}
          selectedGenerators={selectedGenerators}
          selectedDates={selectedDates}
          selectedEngagement={selectedEngagement}
          selectedBilling={selectedBilling}
          selectedAdmins={selectedAdmins}
          selectedApis={selectedApis}
          selectedSecurity={selectedSecurity}
        />
      </div>

      <Sidebar
        selectedPlatforms={selectedPlatforms}
        selectedSizes={selectedSizes}
        selectedUis={selectedUis}
        selectedUsers={selectedUsers}
        selectedGenerators={selectedGenerators}
        selectedDates={selectedDates}
        selectedEngagement={selectedEngagement}
        selectedBilling={selectedBilling}
        selectedAdmins={selectedAdmins}
        selectedApis={selectedApis}
        selectedSecurity={selectedSecurity}
      />


      {/* Sidebar */}

    </div>
  );
}

export default App;