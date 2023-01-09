import React from "react";
import { Outlet } from "react-router-dom";
import CoachNav from "./../Nav/CoachNav";

export default function CoachDashboard() {
  return (
    <div className="dashboard">
      <CoachNav />
      <Outlet />
    </div>
  );
}
