import React from "react";
import Sidebar from "../common/Sidebar";

function UserMain() {
  return (
    <div>
      <Sidebar
        dashboardNav={[
          { href: "/explore", name: "explore" },
          { href: "/explore", name: "session" },
          { href: "/explore", name: "profile" },
        ]}
      />
      <h1>I am User</h1>
    </div>
  );
}

export default UserMain;
