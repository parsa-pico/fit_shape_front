import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function Sub() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [addRow, setAddRow] = useState(false);
  const [newRow, setNewRow] = useState({});
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get("/sub/100/1", authHeader);
      setRows(data);
    }
    onMount();
  });
  return (
    <div className="container">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>sub type</th>
            <th>closet number</th>
            <th>coach</th>
            <th>total days</th>
            <th>remaning days</th>
            <th>is payed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.sub_type_id == 1 ? "normal" : "gold"}</td>
                <td>
                  {row.closet_number ? row.closet_number : "not assigned"}
                </td>
                <td>{row.coach_id ? row.coach_full_name : "not assigned"}</td>
                <td>{row.total_days}</td>
                <td>{row.remaning_days}</td>
                <td>{row.is_payed ? "yes" : "no"}</td>
                {/* <td>
                  <button
                    onClick={() => handleDelete(row.date)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button
        onClick={() => {
          navigate("new");
        }}
        className="btn btn-primary"
      >
        add new sub
      </button>
    </div>
  );
}
