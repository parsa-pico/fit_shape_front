import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-router-dom";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import { authHeader } from "./../../../Services.js/authService";

export default function SecretarySubmitEntrance() {
  const [rfidTag, setRfidTag] = useState("");
  const [message, setMesseage] = useState();
  const [messeageClass, setMessageClass] = useState(
    "alert-danger hidden--0-5s"
  );
  useEffect(() => {}, [message]);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await httpService.post(
        "/entrance",
        { rfid_tag: rfidTag },
        authHeader
      );
      setMessageClass("alert-info hidden--0-5s visibale");
      setMesseage(data);
    } catch (error) {
      setMessageClass("alert-danger hidden--0-5s visibale");
      if (error.response) setMesseage(error.response.data);
      else setMesseage(error.message);
    } finally {
      setRfidTag("");
      setTimeout(() => {
        setMessageClass("hidden--0-5s");
      }, 5000);
    }
  }
  return (
    <div className="submit-entrance">
      <form onSubmit={(e) => handleSubmit(e)} className="submit-entrance__form">
        <Input
          autoFocus
          value={rfidTag}
          onChange={({ target }) => setRfidTag(target.value)}
          placeholder={"enter rfid tag"}
        />
        <Button type="submit" className="mt-4 w-50">
          submit
        </Button>
        <div className={"alert m-4 " + messeageClass}>
          <b>{message}</b>
        </div>
      </form>
    </div>
  );
}
