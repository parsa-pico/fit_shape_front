import React from "react";
import { Link } from "react-router-dom";

export default function OwnerNav() {
  return (
    <div className="dashboard__nav dashboard__nav--green">
      <ul>
        <li className="dashboard__link">
          <Link to={"/dashboard/profile"}>my profile</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/staff"}>staff</Link>
        </li>
      </ul>
    </div>
  );
}
