import React, { useState } from "react";
import httpService from "../Services.js/httpService";
import { Input } from "./Common/Inputs";
import Form from "react-bootstrap/Form";
export default function RegisterAthlete() {
  const [user, setUser] = useState({});
  const [genericError, setGenericError] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(user);
      const { data } = await httpService.post("/athlete/sign_up", user);
      alert("registerd,please check your email");
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
        <h3>sign up</h3>
        <div onChange={handleUserInfo} className="grid grid--1x2">
          <Input className="register-input" placeholder="email" id={"email"} />
          <Input
            className="register-input"
            placeholder="password"
            type="password"
            id={"password"}
          />
          <Input
            className="register-input"
            placeholder="national code"
            id={"national_code"}
          />

          <Form.Select id="blood_type_id">
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

          <Input
            className="register-input"
            placeholder="phone number"
            id={"phone_number"}
          />
          <Input
            className="register-input"
            placeholder="first name"
            id={"first_name"}
          />
          <Input
            className="register-input"
            placeholder="last name"
            id={"last_name"}
          />
          <Input
            className="register-input"
            placeholder="hieght"
            id={"height"}
            type={"number"}
          />
          <Input
            className="register-input"
            placeholder="weight"
            id={"weight"}
            type="number"
          />
          <p></p>
          <h3>address</h3>
          <Input className="register-input" placeholder="city" id={"city"} />
          <Input
            className="register-input"
            placeholder="street"
            id={"street"}
          />
          <Input className="register-input" placeholder="alley" id={"alley"} />
          <Input
            className="register-input"
            placeholder="house number"
            id={"house_number"}
            error={errors.house_number}
          />
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        <button className="btn btn-primary m2">sign up</button>
      </form>
    </div>
  );
}
