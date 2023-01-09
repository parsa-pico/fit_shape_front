import React, { useState } from "react";
import httpService from "../Services.js/httpService";
import { Input } from "./Common/Inputs";

export default function RegisterStaff() {
  const [user, setUser] = useState({});
  const [genericError, setGenericError] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(user);
      const { data } = await httpService.post("/staff/sign_up", user);
      alert("registerd");
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
        <h3>sign up for staff</h3>
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
          <h3>address</h3>
          <span></span>
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
