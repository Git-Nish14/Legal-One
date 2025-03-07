import React from "react";
import Sidebar from "../common/Sidebar";

function AdminMain() {
  return (
    <div>
      <Sidebar dashboardNav={[{ href: "/explore", name: "Lawyers" }]} />
      <h1>I am Admin</h1>
    </div>
  );
}

export default AdminMain;
