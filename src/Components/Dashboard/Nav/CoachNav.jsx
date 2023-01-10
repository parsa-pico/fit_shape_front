import React from "react";
import { Link } from "react-router-dom";

export default function CoachNav() {
  return (
    <div className="dashboard__nav dashboard__nav--green">
      <ul>
        <li className="dashboard__link">
          <Link to={"/dashboard/profile"}>my profile</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/coach_plan"}>my plans</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/assigned_sub"}>assigned subs</Link>
        </li>
      </ul>
    </div>
  );
}
