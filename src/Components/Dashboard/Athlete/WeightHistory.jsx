import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function WeightHistory() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [addRow, setAddRow] = useState(false);
  const [newRow, setNewRow] = useState({});
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get(
        "/athlete/athlete_weight/100/1",
        authHeader
      );
      setRows(data);
    }
    onMount();
  }, []);
  async function handleDelete(date) {
    try {
      await httpService.delete(`/athlete/athlete_weight/${date}`, authHeader);
      window.location = "/dashboard/weight_history";
    } catch (e) {
      if (e && e.response) return alert(e.response.data);
      alert(e.message);
    }
  }
  async function handleAdd() {
    try {
      await httpService.post(`/athlete/athlete_weight/`, newRow, authHeader);
      window.location = "/dashboard/weight_history";
    } catch (e) {
      if (e && e.response) return alert(e.response.data);
      alert(e.message);
    }
  }
  return (
    <div className="container">
      {/* <button
        onClick={() => navigate("/dashboard/sport_history/new")}
        className="btn btn-primary"
      >
        add
      </button> */}
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>date</th>
            <th>weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.date}</td>
                <td>{row.weight}</td>
                <td>
                  <button
                    onClick={() => handleDelete(row.date)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
          {addRow && (
            <tr>
              <td>{rows.length + 1}</td>
              <td>
                <Input
                  onChange={(e) => {
                    setNewRow({ ...newRow, date: e.target.value });
                  }}
                  placeholder=" "
                  className="w-50"
                />
              </td>
              <td>
                <Input
                  onChange={(e) => {
                    setNewRow({ ...newRow, weight: e.target.value });
                  }}
                  placeholder=" "
                  className="w-50"
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {!addRow && (
        <button onClick={() => setAddRow(true)} className="btn btn-info ">
          +
        </button>
      )}
    </div>
  );
}
