import React from "react";
import { Link } from "react-router-dom";

export default function AthleteNav() {
  return (
    <div className="dashboard__nav ">
      <ul>
        <li className="dashboard__link">
          <Link to={"/dashboard/profile"}>my profile</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/sport_history"}>sport histories</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/weight_history"}>weight history</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/sub"}>subscriptions</Link>
        </li>
      </ul>
    </div>
  );
}
