// import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import React from "react";
import AthleteRouter from "./Dashboard/Athlete/AthleteRouter";
import CoachRouter from "./Dashboard/Coach/CoachRouter";

export default function DashBoardRouter() {
  const user = jwtDecode(localStorage.getItem("token"));
  if (user.athlete_id) return <AthleteRouter athlete={user} />;
  else if (user.job_position_id == 2) return <CoachRouter />;
  // .... add other dashboards
}
