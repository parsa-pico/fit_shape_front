import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
export default function SubPlan() {
  const params = useParams();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get(
        `/athlete/sub_plan/${params.sub_id}/100/1`,
        authHeader
      );
      setRows(data);
      console.log(data);
    }
    onMount();
  }, []);
  return (
    <div id="sub-plan" className="container">
      <h2>viewing plans for subscription {params.sub_id}</h2>
      <Accordion className="sub-plan__accordion">
        {rows.map((row, index) => (
          <Accordion.Item key={index} eventKey={index}>
            <Accordion.Header>{row.title}</Accordion.Header>
            <Accordion.Body>{row.description}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
