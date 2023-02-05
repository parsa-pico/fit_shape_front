import React, { useState } from "react";
import httpService from "../Services.js/httpService";
import { Input } from "./Common/Inputs";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import backGround from "./Images/loginBackground.jpg";
export default function LoginAthlete() {
  const navigate = useNavigate();
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
    <div className="login-page login-athlete">
      <img
        className="login-athlete__background"
        src={backGround}
        alt=""
        srcset=""
      />
      <form
        className="login-form login-from--withbg  relative"
        onSubmit={handleSubmit}
      >
        <h3>sign in</h3>
        <div onChange={handleUserInfo}>
          <Input className="login-input" placeholder="email" id={"email"} />
          <Input
            className="login-input mb-1"
            placeholder="password"
            type="password"
            id={"password"}
          />
          <Link to={"/register/athlete"} className="underline">
            <small>new to fit shape? register here</small>
          </Link>
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        <button className="btn btn-primary m-3">login</button>
        <small
          onClick={() => navigate("/login/staff")}
          className="absolute right-1 down-1 hyperlink"
        >
          login staff
        </small>
      </form>
    </div>
  );
}
