import React from "react";
import Sidebar from "../common/Sidebar";

function LawyerMain() {
  return (
    <div>
      <Sidebar
        dashboardNav={[
          { href: "/explore", name: "request" },
          { href: "/explore", name: "session" },
          { href: "/explore", name: "profile" },
        ]}
      />
      <h1>I am Lawyer</h1>
    </div>
  );
}

export default LawyerMain;
