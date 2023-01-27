import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import AthleteDetailsModal from "./AthleteDetailsModal";
import { getBloodType } from "./../../Common/commonFuncs";
import SportHistoryModal from "./SportHistoryModal";
import AssignedPlansModal from "./AssignedPlansModal";
import WeightHistoryModal from "./WeightHistoryModal";

export default function AssignedSub() {
  const [athleteName, setAthleteName] = useState("");
  const [athleteDetails, setAthleteDetails] = useState({});
  const [showAthleteDetails, SetShowAthleteDetails] = useState(false);
  const [ahleteSportHIstory, setAhleteSportHIstory] = useState([]);
  const [showSportHistory, SetShowSportHistory] = useState(false);
  const [ahleteWeightHistory, setAhleteWeightHistory] = useState([]);
  const [showWeightHistory, SetShowWeightHistory] = useState(false);
  const [subId, setSubId] = useState();
  const [isActiveSub, setIsActiveSub] = useState();
  const [subPlan, setSubPlan] = useState([]);
  const [showSubPlans, SetShowSubPlans] = useState(false);
  const [rows, setRows] = useState([]);
  const [filterdRows, setFilterdRows] = useState([]);
  const [showExpireBtn, setShowExpireBtn] = useState(true);
  useEffect(() => {
    async function onMount() {
      try {
        const { data } = await httpService.get(
          "/coach/assigned_subs/100/1",
          authHeader
        );
        console.log(data);
        setRows(data);
        const filterd = data.filter((row) => row.remaning_days);
        setFilterdRows(filterd);
      } catch (error) {
        if (error.response) alert(error.response.data);
        else alert(error.message);
      }
    }
    onMount();
  }, []);
  async function getSportHistory(athleteId) {
    try {
      const { data } = await httpService.get(
        `/coach/athlete_sport_history/${athleteId}/100/1`,
        authHeader
      );
      console.log(data);
      setAhleteSportHIstory(data);
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  async function getWeightHistory(athleteId) {
    try {
      const { data } = await httpService.get(
        `/coach/athlete_weight/${athleteId}/100/1`,
        authHeader
      );
      setAhleteWeightHistory(data);
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  async function getAssignedPlan(subId) {
    try {
      const { data } = await httpService.get(
        `/coach/sub_plan/${subId}/100/1`,
        authHeader
      );

      setSubPlan(data);
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div className="container">
      <h2>assigned subs</h2>
      <AthleteDetailsModal
        title={athleteName}
        bodyObj={athleteDetails}
        show={showAthleteDetails}
        setShow={SetShowAthleteDetails}
      />
      <SportHistoryModal
        title={athleteName}
        show={showSportHistory}
        setShow={SetShowSportHistory}
        rows={ahleteSportHIstory}
      />
      <WeightHistoryModal
        title={athleteName}
        show={showWeightHistory}
        setShow={SetShowWeightHistory}
        rows={ahleteWeightHistory}
      />
      <AssignedPlansModal
        show={showSubPlans}
        setShow={SetShowSubPlans}
        rows={subPlan}
        title={athleteName}
        subId={subId}
        isActiveSub={isActiveSub}
      />
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>first name</th>
              <th>last name</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filterdRows.map((row, index) => {
              const rowClass = !row.remaning_days ? "table-warning" : "";
              return (
                <tr className={rowClass} key={index}>
                  <td>{index + 1}</td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td
                    onClick={() => {
                      SetShowAthleteDetails(!showAthleteDetails);
                      setAthleteDetails({
                        bloodType: getBloodType(row.blood_type_id),
                        phoneNumber: row.phone_number,
                        height: row.height,
                      });
                      setAthleteName(row.first_name + " " + row.last_name);
                    }}
                    className="hyperlink"
                  >
                    view athlete details
                  </td>
                  <td
                    onClick={() => {
                      async function onClick() {
                        await getSportHistory(row.athlete_id);
                        SetShowSportHistory(!showSportHistory);
                        setAthleteName(row.first_name + " " + row.last_name);
                      }
                      onClick();
                    }}
                    className="hyperlink"
                  >
                    view sport history
                  </td>
                  <td
                    onClick={() => {
                      async function onClick() {
                        await getWeightHistory(row.athlete_id);
                        SetShowWeightHistory(!showWeightHistory);
                        setAthleteName(row.first_name + " " + row.last_name);
                      }
                      onClick();
                    }}
                    className="hyperlink"
                  >
                    view weight history
                  </td>
                  <td
                    onClick={() => {
                      async function onClick() {
                        await getAssignedPlan(row.sub_id);
                        SetShowSubPlans(!showSubPlans);
                        setAthleteName(row.first_name + " " + row.last_name);
                        row.remaning_days
                          ? setIsActiveSub(true)
                          : setIsActiveSub(false);

                        setSubId(row.sub_id);
                      }
                      onClick();
                    }}
                    className="hyperlink"
                  >
                    view assigned plans
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {showExpireBtn && (
          <Button
            onClick={() => {
              setShowExpireBtn(false);
              setFilterdRows(rows);
            }}
          >
            show expired subs
          </Button>
        )}
      </div>
    </div>
  );
}
