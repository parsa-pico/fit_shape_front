import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { authHeader, clearToken } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function AthleteProfile({ athlete }) {
  const [user, setUser] = useState();
  const [genericError, setGenericError] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const { athlete_id, rfid_tag, iat, email, is_in_gym, ...rest } = athlete;
    setUser({ ...rest });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await httpService.put("/athlete", user, authHeader);
      setGenericError(null);
      clearToken();
      window.location = "/login/athlete";
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
            defaultValue={athlete.national_code}
            className="register-input"
            // placeholder="national code"
            id={"national_code"}
          />
          <span className="my-input">
            <label htmlFor="blood_type_id">blood type</label>
            <Form.Select
              defaultValue={athlete.blood_type_id}
              id="blood_type_id"
            >
              <option>choose your blood type</option>
              <option value={1}>O+</option>
              <option value={2}>O-</option>
              <option value={3}>B+</option>
              <option value={4}>B-</option>
              <option value={5}>A+</option>
              <option value={6}>A-</option>
              <option value={7}>AB+</option>
              <option value={8}>AB-</option>
            </Form.Select>
          </span>

          <Input
            defaultValue={athlete.phone_number}
            className="register-input"
            // placeholder="phone number"
            id={"phone_number"}
          />
          <Input
            defaultValue={athlete.first_name}
            className="register-input"
            // placeholder="first name"
            id={"first_name"}
          />
          <Input
            defaultValue={athlete.last_name}
            className="register-input"
            // placeholder="last name"
            id={"last_name"}
          />
          <Input
            defaultValue={athlete.height}
            className="register-input"
            // placeholder="height"
            id={"height"}
            type={"number"}
          />

          <h3>address</h3>
          <span></span>
          <Input
            defaultValue={athlete.city}
            className="register-input"
            // placeholder="city"
            id={"city"}
          />
          <Input
            defaultValue={athlete.street}
            className="register-input"
            // placeholder="street"
            id={"street"}
          />
          <Input
            defaultValue={athlete.alley}
            className="register-input"
            // placeholder="alley"
            id={"alley"}
          />
          <Input
            defaultValue={athlete.house_number}
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
