import React from "react";
import { Outlet } from "react-router-dom";

import SecretaryNav from "./../Nav/SecretaryNav";

export default function SecretaryDashBoard() {
  return (
    <div className="dashboard">
      <SecretaryNav />
      <Outlet />
    </div>
  );
}
