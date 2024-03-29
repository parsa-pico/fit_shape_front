import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffProfile from "../Staff/StaffProfile";
import SecretaryAthlete from "./SecretaryAthlete";
import SecretaryDashBoard from "./SecretaryDashBoard";
import SecretaryEntrance from "./SecretaryEntrance";
import SecretaryNotify from "./SecretaryNotify";
import SecretarySubmitEntrance from "./SecretarySubmitEntrance";

export default function SecretaryRouter({ staff }) {
  return (
    <Routes>
      <Route path="/" element={<SecretaryDashBoard />}>
        <Route path="profile" element={<StaffProfile staff={staff} />} />
        <Route path="submit_entrance" element={<SecretarySubmitEntrance />} />
        <Route path="entrance" element={<SecretaryEntrance />} />
        <Route path="athlete" element={<SecretaryAthlete />} />
        <Route path="notify" element={<SecretaryNotify />} />
      </Route>
    </Routes>
  );
}
