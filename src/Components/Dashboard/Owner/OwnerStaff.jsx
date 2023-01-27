import React, { useEffect, useState } from "react";
import { FormCheck, Pagination, Table } from "react-bootstrap";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Input } from "./../../Common/Inputs";

export default function OwnerStaff() {
  const pageLimit = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [rows, setRows] = useState([]);
  const [searchObj, setSearchObj] = useState({});
  const [updateRows, setUpdateRows] = useState([]);
  const [paginationItems, setPaginationItems] = useState([]);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.post(
        `/owner/staff/${pageLimit}/1`,
        {},
        authHeader
      );
      setTotalPages(data.totalPages);
      setRows(data.rows);
    }
    onMount();
  }, []);
  useEffect(() => {
    const paginationArray = [];
    for (let number = 1; number <= totalPages; number++) {
      paginationArray.push(
        <Pagination.Item
          id={number}
          onClick={(e) => handlePaginate(e)}
          key={number}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      );
    }

    setPaginationItems(paginationArray);
  }, [totalPages, currentPage]);
  async function submitChange() {
    for (let value of updateRows) {
      await handleChangeJobPosition(value.staff_id, value.job_position_id);
    }
    window.location = "/dashboard/staff";
  }
  async function handleChangeJobPosition(staff_id, job_position_id) {
    console.log(staff_id, job_position_id);
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
  function handleChangeSearch(target) {
    if (target.type === "checkbox") handleCheckBox(target);
    else {
      const value = target.value.trim();
      const searchObjCopy = { ...searchObj };
      if (value === "") {
        delete searchObjCopy[target.id];
        setSearchObj(searchObjCopy);
      } else {
        if (!searchObj[target.id])
          setSearchObj((prevState) => ({
            ...prevState,
            [target.id]: { like: true, value },
          }));
        else
          setSearchObj((prevState) => ({
            ...prevState,
            [target.id]: { like: searchObj[target.id].like, value },
          }));
      }
    }
  }
  function handleCheckBox(target) {
    const searchObjCopy = { ...searchObj };
    const obj = { ...searchObj[target.id] };
    obj.like = !obj.like;
    searchObjCopy[target.id] = obj;
    setSearchObj(searchObjCopy);
  }
  console.log(searchObj);
  async function handleSearch(e) {
    e.preventDefault();
    try {
      const { data } = await httpService.post(
        `/owner/staff/${pageLimit}/1`,
        searchObj,
        authHeader
      );
      setRows(data.rows);
      setTotalPages(data.totalPages);
    } catch (e) {
      if (e && e.response) alert(e.response.data);
      alert(e.message);
    }
  }
  async function handlePaginate(e) {
    setRows([]);
    const page = e.target.id;

    try {
      const { data } = await httpService.post(
        `/owner/staff/${pageLimit}/${page}`,
        searchObj,
        authHeader
      );
      setRows(data.rows);
      setTotalPages(data.totalPages);
      setCurrentPage(parseInt(page));
    } catch (e) {
      if (e && e.response) alert(e.response.data);
      alert(e.message);
    }
  }
  return (
    <div className="black-mode-wrapper ">
      <form onSubmit={(e) => handleSearch(e)}>
        <div
          onChange={({ target }) => handleChangeSearch(target)}
          className="grid grid--1x5 m-2"
        >
          <div>
            <Input
              className="register-input"
              // placeholder="first name"
              id={"first_name"}
            />
            <Form.Check id={"first_name"} label={`exact`} />
          </div>
          <div>
            <Input
              className="register-input"
              // placeholder="last name"
              id={"last_name"}
            />
            <Form.Check id={"last_name"} label={`exact`} />
          </div>
          <div>
            <Input
              className="register-input"
              // placeholder="national code"
              id={"national_code"}
            />
            <Form.Check id={"national_code"} label={`exact`} />
          </div>
          <div>
            <Input
              className="register-input"
              // placeholder="phone number"
              id={"phone_number"}
            />
            <Form.Check id={"phone_number"} label={`exact`} />
          </div>
          <div>
            <Input className="register-input" id={"email"} />
            <Form.Check id={"email"} label={`exact`} />
          </div>
          <div>
            <Input className="register-input" id={"city"} />
            <Form.Check id={"city"} label={`exact`} />
          </div>
          <Button type="submit" className="w-50 ">
            search
          </Button>
        </div>
      </form>
      <Table variant="dark" hover>
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
            <th></th>
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
      <Button className="m-4" onClick={() => submitChange()}>
        Save
      </Button>
      <Pagination>{paginationItems}</Pagination>
    </div>
  );
}
