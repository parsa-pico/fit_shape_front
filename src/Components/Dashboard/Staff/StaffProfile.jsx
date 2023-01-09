import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { authHeader, clearToken } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function StaffProfile({ staff }) {
  const [user, setUser] = useState();
  const [genericError, setGenericError] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const { staff_id, job_position_id, iat, email, ...rest } = staff;
    setUser({ ...rest });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await httpService.put("/staff", user, authHeader);
      setGenericError(null);
      clearToken();
      window.location = "/login/staff";
    } catch (error) {
      console.log(error);
      setGenericError(error.response.data);
    }
  };

  function handleUserInfo({ target }) {
    const value = target.value.trim();
    setUser((prevState) => ({
      ...prevState,
      [target.id]: value,
    }));
  }

  return (
    <div className="container register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <div onChange={handleUserInfo} className="grid grid--1x2">
          <Input
            defaultValue={staff.national_code}
            className="register-input"
            // placeholder="national code"
            id={"national_code"}
          />
          <Input
            defaultValue={staff.phone_number}
            className="register-input"
            // placeholder="phone number"
            id={"phone_number"}
          />
          <Input
            defaultValue={staff.first_name}
            className="register-input"
            // placeholder="first name"
            id={"first_name"}
          />
          <Input
            defaultValue={staff.last_name}
            className="register-input"
            // placeholder="last name"
            id={"last_name"}
          />

          <h3>address</h3>
          <span></span>
          <Input
            defaultValue={staff.city}
            className="register-input"
            // placeholder="city"
            id={"city"}
          />
          <Input
            defaultValue={staff.street}
            className="register-input"
            // placeholder="street"
            id={"street"}
          />
          <Input
            defaultValue={staff.alley}
            className="register-input"
            // placeholder="alley"
            id={"alley"}
          />
          <Input
            defaultValue={staff.house_number}
            className="register-input"
            // placeholder="house number"
            id={"house_number"}
          />
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        <button className="btn btn-primary m-3">change info</button>
      </form>
    </div>
  );
}
