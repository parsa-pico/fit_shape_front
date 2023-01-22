import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleLogout } from "../../Common/commonFuncs";
export default function SecretaryNav() {
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
          <Link to={"/dashboard/athlete"}>athletes</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/entrance"}>view entrances</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/submit_entrance"}>submit entrance</Link>
        </li>
        <li className="dashboard__link">
          <Link to={"/dashboard/notify"}>notify</Link>
        </li>
      </ul>
    </div>
  );
}
