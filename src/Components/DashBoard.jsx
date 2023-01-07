// import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AthleteDashboard from "./Dashboard/Athlete/AthleteDashboard";
import AthleteProfile from "./Dashboard/Athlete/AthleteProfile";
import CoachDashboard from "./Dashboard/Coach/CoachDashboard";
import SportHistory from "./Dashboard/Athlete/SportHistory";
import SportHistoryForm from "./Dashboard/Athlete/SportHistoryForm";

export default function DashBoard() {
  const user = jwtDecode(localStorage.getItem("token"));
  if (user.athlete_id)
    return (
      <Routes>
        <Route path="/" element={<AthleteDashboard />}>
          <Route path="/profile" element={<AthleteProfile athlete={user} />} />
          <Route
            path="/sport_history"
            element={<SportHistory athlete={user} />}
          />
          <Route path="/sport_history/:id" element={<SportHistoryForm />} />
        </Route>
      </Routes>
    );
  else if (user.job_position_id == 2) return <CoachDashboard />;
  // .... add other dashboards
}
