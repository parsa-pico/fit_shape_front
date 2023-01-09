import React from "react";
import { Route, Routes } from "react-router-dom";
import CoachDashboard from "./CoachDashboard";

export default function CoachRouter() {
  return (
    <Routes>
      <Route path="/" element={<CoachDashboard />}></Route>
    </Routes>
  );
}
