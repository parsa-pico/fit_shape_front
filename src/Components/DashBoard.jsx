import jwt from "jsonwebtoken";
import React from "react";
import AthleteDashboard from "./Dashboard/AthleteDashboard";
import CoachDashboard from "./Dashboard/CoachDashboard";

export default function DashBoard() {
  const user = jwt.decode(localStorage.getItem("token"));
  if (user.athlete_id) return <AthleteDashboard />;
  else if (job_position_id == 2) return <CoachDashboard />;
  // .... add other dashboards
}
