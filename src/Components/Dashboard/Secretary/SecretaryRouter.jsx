import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffProfile from "../Staff/StaffProfile";
import SecretaryAthlete from "./SecretaryAthlete";
import SecretaryDashBoard from "./SecretaryDashBoard";
import SecretarySubmitEntrance from "./SecretarySubmitEntrance";

export default function SecretaryRouter({ staff }) {
  return (
    <Routes>
      <Route path="/" element={<SecretaryDashBoard />}>
        <Route path="profile" element={<StaffProfile staff={staff} />} />
        <Route path="submit_entrance" element={<SecretarySubmitEntrance />} />
        <Route path="athlete" element={<SecretaryAthlete />} />
      </Route>
    </Routes>
  );
}
