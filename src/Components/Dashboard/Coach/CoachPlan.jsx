import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
export default function CoachPlan() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPlanId, setEditPlanId] = useState(null);
  const [editPlanDetails, setEditPlanDetails] = useState({});
  const [coachPlanTypes, setCoachPlanTypes] = useState([]);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get(
        `/coach/coach_plan/me/100/1`,
        authHeader
      );
      const { data: planTypes } = await httpService.get(
        `/coach/coach_plan/coach_plan_type`
      );
      setRows(data);
      setCoachPlanTypes(planTypes);
      console.log(planTypes);
      console.log(data);
    }
    onMount();
  }, []);

  async function handleEdit(coachPlanId) {
    try {
      await httpService.put(
        `/coach/coach_plan/${coachPlanId}`,
        editPlanDetails,
        authHeader
      );
      setIsEditMode(false);
      setEditPlanDetails({});
      setEditPlanId(null);
      window.location = "/dashboard/coach_plan";
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
      setIsEditMode(false);
      setEditPlanDetails({});
      setEditPlanId(null);
    }
  }
  async function handleDelete(coachPlanId) {
    try {
      await httpService.delete(`/coach/coach_plan/${coachPlanId}`, authHeader);
      window.location = "/dashboard/coach_plan";
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div id="sub-plan" className="container">
      <h2>plans</h2>
      <Accordion className="sub-plan__accordion">
        {rows.map((row, index) => {
          const editCondition =
            !isEditMode || (isEditMode && editPlanId != row.coach_plan_id);
          return (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header className="relative">
                <span>
                  <span>#{row.coach_plan_id} &nbsp;</span>
                  {row.title}
                </span>
                <span className="absolute right-4">type:{row.type}</span>
              </Accordion.Header>
              <Accordion.Body style={{ position: "relative" }}>
                {editCondition && (
                  <>
                    <textarea
                      className="form-control no-border"
                      value={row.description}
                      rows={15}
                      readOnly
                    ></textarea>
                    <Button
                      onClick={() => handleDelete(row.coach_plan_id)}
                      variant="danger"
                    >
                      delete
                    </Button>
                    <Button
                      style={{ position: "absolute", right: "1.2rem" }}
                      onClick={() => {
                        setIsEditMode(true);
                        setEditPlanId(row.coach_plan_id);
                      }}
                    >
                      edit
                    </Button>
                  </>
                )}
                {!editCondition && (
                  <>
                    <textarea
                      rows={15}
                      defaultValue={row.description}
                      className="form-control"
                      id="description"
                      onChange={({ target }) =>
                        setEditPlanDetails({
                          ...editPlanDetails,
                          description: target.value,
                        })
                      }
                    ></textarea>
                    <Button
                      onClick={() => {
                        setIsEditMode(false);
                        setEditPlanDetails({});
                        setEditPlanId(null);
                      }}
                      variant="danger"
                    >
                      cancel
                    </Button>
                    <Button
                      onClick={() => handleEdit(row.coach_plan_id)}
                      className="m-1"
                      variant="warning"
                    >
                      save
                    </Button>
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Button
        className="m-5"
        onClick={() => navigate("/dashboard/coach_plan/new")}
      >
        add new plan
      </Button>
    </div>
  );
}
