import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function AssignedPlansModal({
  subId,
  title,
  show,
  setShow,
  rows,
}) {
  const [newPlanId, setNewPlanId] = useState();
  async function handleAdd() {
    try {
      await httpService.post(
        `/coach/sub_plan`,
        { sub_id: subId, coach_plan_id: newPlanId },
        authHeader
      );

      window.location = "/dashboard/assigned_sub";
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  async function handleDelete(planId) {
    try {
      await httpService.delete(`/coach/sub_plan`, {
        data: { sub_id: subId, coach_plan_id: planId },
        ...authHeader,
      });

      window.location = "/dashboard/assigned_sub";
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div>
      <Modal
        dialogClassName="sport-history__modal"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion className="sub-plan__accordion">
            {rows.map((row, index) => (
              <Accordion.Item key={index} eventKey={index}>
                <Accordion.Header>
                  #{row.coach_plan_id} &nbsp;{row.title}
                </Accordion.Header>
                <Accordion.Body className="relative">
                  {row.description}
                  <Button
                    onClick={() => handleDelete(row.coach_plan_id)}
                    className="absolute right-0"
                    variant="danger"
                  >
                    delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <Modal.Footer>
            <Input
              onChange={({ target }) => setNewPlanId(target.value)}
              placeholder={"plan id"}
            />
            <Button onClick={() => handleAdd()}>add new plan</Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}
