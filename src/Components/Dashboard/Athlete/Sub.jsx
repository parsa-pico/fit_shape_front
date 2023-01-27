import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import AssignedPlansModal from "../Coach/AssignedPlansModal";

export default function Sub() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [subPlan, setSubPlan] = useState([]);
  const [showSubPlans, SetShowSubPlans] = useState(false);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get("/sub/100/1", authHeader);
      setRows(data);
    }
    onMount();
  }, []);
  async function handleCheckFreeCloset(sub_id) {
    const { data } = await httpService.post(
      "/sub/sub_closet",
      { sub_id },
      authHeader
    );

    if (data.closet_number === null)
      return alert("there is no free closet right now");
    else window.location = "/dashboard/sub";
  }
  function getRowClass(row) {
    if (!row.is_payed) return "table-danger";
    if (!row.remaning_days) return "table-info";
    return "table-success";
  }
  async function getAssignedPlan(subId) {
    try {
      const { data } = await httpService.get(
        `/athlete/sub_plan/${subId}/100/1`,
        authHeader
      );

      setSubPlan(data);
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div className="black-mode-wrapper">
      <AssignedPlansModal
        show={showSubPlans}
        setShow={SetShowSubPlans}
        rows={subPlan}
        isStaff={false}
        // title={athleteName}
      />
      <div className="sub">
        <Table variant="dark" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>sub type</th>
              <th>closet number</th>
              <th>total days</th>
              <th>remaning days</th>
              <th>is payed</th>
              <th>coach</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              let canAssignCloset = false;
              let rowClass = getRowClass(row);
              if (!row.closet_number && row.remaning_days && row.is_payed == 1)
                canAssignCloset = true;
              return (
                <tr className={rowClass} key={index}>
                  <td>{index + 1}</td>
                  <td>{row.sub_type_id == 1 ? "normal" : "gold"}</td>
                  <td>
                    {row.closet_number ? row.closet_number : "not assigned"}
                    {canAssignCloset && (
                      <button
                        className="btn btn-info sub__closet-btn"
                        onClick={() => handleCheckFreeCloset(row.sub_id)}
                      >
                        check for free closet
                      </button>
                    )}
                  </td>
                  <td>{row.total_days}</td>
                  <td>{row.remaning_days}</td>
                  <td>{row.is_payed ? "yes" : "no"}</td>
                  <td>{row.coach_id ? row.coach_full_name : "not assigned"}</td>
                  <td
                    onClick={() => {
                      async function onClick() {
                        await getAssignedPlan(row.sub_id);
                        SetShowSubPlans(!showSubPlans);
                      }
                      onClick();
                    }}
                  >
                    {row.sub_type_id === 2 && row.is_payed === 1 && (
                      <p className="hyperlink">view coach plans</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <button
          onClick={() => {
            navigate("new");
          }}
          className="btn btn-primary m-4 "
        >
          add new sub
        </button>
      </div>
    </div>
  );
}
