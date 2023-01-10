import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function OwnerStaff() {
  const [rows, setRows] = useState([]);
  const [updateRows, setUpdateRows] = useState([]);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get("/owner/staff/100/1", authHeader);
      setRows(data);
    }
    onMount();
  }, []);
  console.log(updateRows);
  async function submitChange() {
    for (let value of updateRows) {
      await handleChange(value.staff_id, value.job_position_id);
    }
    window.location = "/dashboard/staff";
  }
  async function handleChange(staff_id, job_position_id) {
    try {
      await httpService.put(
        `/owner/staff/`,
        { staff_id, job_position_id },
        authHeader
      );
    } catch (e) {
      if (e && e.response) alert(e.response.data);
      alert(e.message);
    }
  }
  function handleAddToUpdateRows(staff_id, job_position_id) {
    const updateRowsCopy = [...updateRows];
    const index = updateRowsCopy.findIndex((row) => row.staff_id === staff_id);
    if (index !== -1) {
      const rowCopy = { ...updateRowsCopy[index] };
      updateRowsCopy[index] = rowCopy;
      updateRowsCopy[index].job_position_id = job_position_id;
    } else updateRowsCopy.push({ staff_id, job_position_id });
    setUpdateRows(updateRowsCopy);
  }
  return (
    <div className="container">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>first name</th>
            <th>last name</th>
            <th>national code</th>
            <th>phone number</th>
            <th>email </th>
            <th>city </th>
            <th>street </th>
            <th>alley </th>
            <th>house number </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.national_code}</td>
                <td>{row.phone_number}</td>
                <td>{row.email}</td>
                <td>{row.city}</td>
                <td>{row.street}</td>
                <td>{row.alley}</td>
                <td>{row.house_number}</td>
                <td>
                  <Form.Select
                    defaultValue={row.job_position_id}
                    id="job_position_id"
                    onClick={({ target }) => {
                      const value =
                        target.value === "" ? null : parseInt(target.value);
                      handleAddToUpdateRows(row.staff_id, value);
                    }}
                  >
                    <option value={""}>not assigned</option>
                    <option value={2}>coach</option>
                    <option value={3}>secretary</option>
                  </Form.Select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={() => submitChange()}>Save</Button>
    </div>
  );
}
