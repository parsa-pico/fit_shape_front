import React from "react";
import { Outlet } from "react-router-dom";
import OwnerNav from "./../Nav/OwnerNav";

export default function OwnerDashBoard() {
  return (
    <div className="dashboard">
      <OwnerNav />
      <Outlet />
    </div>
  );
}
