import React from "react";
import { Outlet } from "react-router-dom";
import AthleteNav from "../Nav/AthleteNav";

export default function AthleteDashboard() {
  return (
    <div id="athlete-dashboard" className="dashboard">
      <AthleteNav />
      <Outlet />
    </div>
  );
}
