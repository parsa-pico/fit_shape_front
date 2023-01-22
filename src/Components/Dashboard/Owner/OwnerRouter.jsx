import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffProfile from "../Staff/StaffProfile";
import OwnerDashBoard from "./OwnerDashBoard";
import OwnerPayment from "./OwnerPayment";
import OwnerStaff from "./OwnerStaff";
import OwnerSubTypes from "./OwnerSubTypes";
export default function OwnerRouter({ staff }) {
  return (
    <Routes>
      <Route path="/" element={<OwnerDashBoard />}>
        <Route path="profile" element={<StaffProfile staff={staff} />} />
        <Route path="staff" element={<OwnerStaff />} />
        <Route path="payment" element={<OwnerPayment />} />
        <Route path="sub_types" element={<OwnerSubTypes />} />
      </Route>
    </Routes>
  );
}
