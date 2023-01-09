import React from "react";
import { Routes, Route } from "react-router-dom";
import AthleteDashboard from "./AthleteDashboard";
import AthleteProfile from "./AthleteProfile";
import SportHistory from "./SportHistory";
import SportHistoryForm from "./SportHistoryForm";
import WeightHistory from "./WeightHistory";
import Sub from "./Sub";
import SubForm from "./SubForm";
import SubPlan from "./SubPlan";

export default function AthleteRouter({ athlete }) {
  return (
    <Routes>
      <Route path="/" element={<AthleteDashboard />}>
        <Route path="/profile" element={<AthleteProfile athlete={athlete} />} />
        <Route path="/sport_history" element={<SportHistory />} />
        <Route path="/sport_history/:id" element={<SportHistoryForm />} />
        <Route path="/weight_history" element={<WeightHistory />} />
        <Route path="/sub" element={<Sub />} />
        <Route path="/sub/new" element={<SubForm />} />
        <Route path="/sub/sub_plan/:sub_id" element={<SubPlan />} />
      </Route>
    </Routes>
  );
}
