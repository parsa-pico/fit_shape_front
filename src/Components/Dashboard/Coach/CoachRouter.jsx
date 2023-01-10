import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffProfile from "../Staff/StaffProfile";
import AssignedSub from "./AssignedSub";
import CoachDashboard from "./CoachDashboard";
import CoachPlan from "./CoachPlan";
import CoachPlanForm from "./CoachPlanForm";

export default function CoachRouter({ staff }) {
  return (
    <Routes>
      <Route path="/" element={<CoachDashboard />}>
        <Route path="/profile" element={<StaffProfile staff={staff} />} />
        <Route path="/coach_plan" element={<CoachPlan />} />
        <Route path="/coach_plan/new" element={<CoachPlanForm />} />
        <Route path="/assigned_sub" element={<AssignedSub />} />
      </Route>
    </Routes>
  );
}
