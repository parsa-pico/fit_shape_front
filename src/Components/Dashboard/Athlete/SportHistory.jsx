import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
export default function SportHistory() {
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescriptionId, setCurrentDescriptionId] = useState();
  const target = useRef(null);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get(
        "/athlete/sport_history/100/1",
        authHeader
      );
      setRows(data);
    }
    onMount();
  }, []);
  async function handleDelete(id) {
    try {
      await httpService.delete(`/athlete/sport_history/${id}`, authHeader);
      window.location = "/dashboard/sport_history";
    } catch (e) {
      if (e && e.response) alert(e.response.data);
      alert(e.message);
    }
  }
  return (
    <div className="container">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Sport</th>
            <th>Spent Years</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.sport}</td>
                <td>{row.spent_years}</td>
                <td
                  className="hyperlink sport-history__description-wrapper"
                  onClick={() => {
                    setShowDescription(!showDescription);
                    setCurrentDescriptionId(row.sport_history_id);
                  }}
                >
                  {!showDescription && "..."}
                  {showDescription &&
                    row.sport_history_id === currentDescriptionId && (
                      <span>
                        <button className="btn btn-sm small btn-danger sport-history__description-close">
                          X
                        </button>
                        <textarea
                          value={row.description}
                          readOnly
                          cols={10}
                          rows={5}
                          className="form-control no-border sport-history__description"
                        ></textarea>
                      </span>
                    )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/sport_history/${row.sport_history_id}`,
                        { state: { originalSportHistory: row } }
                      )
                    }
                    className="btn btn-warning"
                  >
                    change
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(row.sport_history_id)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button
        onClick={() => navigate("/dashboard/sport_history/new")}
        className="btn btn-primary "
        style={{ padding: "0.3rem 2rem" }}
      >
        add
      </button>
    </div>
  );
}
