import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleLogout } from "../../Common/commonFuncs";
export default function OwnerNav() {
  return (
    <div className="dashboard__nav dashboard__nav--green ">
      <ul>
        <li className="dashboard__link">
          <Button onClick={() => handleLogout(true)} variant="danger">
            log out
          </Button>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/profile"}>my profile</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/staff"}>staff</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/payment"}>payments</Link>
        </li>
      </ul>
    </div>
  );
}
