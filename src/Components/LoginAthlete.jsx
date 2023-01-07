import React, { useState } from "react";
import httpService from "../Services.js/httpService";
import { Input } from "./Common/Inputs";
import Form from "react-bootstrap/Form";
export default function Register() {
  const [user, setUser] = useState({});
  const [genericError, setGenericError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await httpService.post("/athlete/login", user);
      setGenericError(null);

      window.localStorage.setItem("token", data);

      window.location = "/dashboard";
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
    <div className=" login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>sign in</h3>
        <div onChange={handleUserInfo}>
          <Input className="login-input" placeholder="email" id={"email"} />
          <Input
            className="login-input"
            placeholder="password"
            type="password"
            id={"password"}
          />
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        <button className="btn btn-primary m2">login</button>
      </form>
    </div>
  );
}
