import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";

export default function SportHistory() {
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
                <td>{row.description}</td>
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
