import React from "react";
import { Link } from "react-router-dom";

export default function CoachNav() {
  return (
    <div className="dashboard__nav">
      <ul>
        <li className="dashboard__link">
          <Link to={"/dashboard/profile"}>my profile</Link>
        </li>
      </ul>
    </div>
  );
}
