import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";

export default function SecretaryEntrance() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function onMount() {
      try {
        const { data } = await httpService.get("/entrance/100/1", authHeader);
        setRows(data);
      } catch (error) {
        if (error.response) alert(error.response.data);
        else alert(error.message);
      }
    }
    onMount();
  }, []);

  return (
    <div className="black-mode-wrapper">
      <div>
        <Table variant="dark" hover>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>first name</th>
              <th>last name</th>
              <th>entered date time</th>
              <th>exited date time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td></td>
                  <td>{index + 1}</td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.entered_date_time}</td>
                  <td>{row.exited_date_time}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
