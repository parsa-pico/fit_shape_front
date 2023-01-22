import React, { useState } from "react";
import { Button, FormCheck } from "react-bootstrap";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function SecretaryNotify() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [types, setTypes] = useState([]);
  function handleChange(value) {
    const copyTypes = [...types];
    const parsedValue = parseInt(value);
    const index = copyTypes.findIndex((type) => type === parsedValue);
    if (index === -1) copyTypes.push(parsedValue);
    else copyTypes.splice(index, 1);
    setTypes(copyTypes);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const typesCopy = types;
    typesCopy.sort();
    console.log(typesCopy);
    try {
      await httpService.post(
        "/secretary/notify",
        {
          subject,
          html: text,
          types: typesCopy,
        },
        authHeader
      );
      alert("emails sent");
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div className="container notify">
      <form onSubmit={(e) => handleSubmit(e)} className="notify" action="">
        <Input
          onChange={(e) => setSubject(e.currentTarget.value)}
          placeholder="subject"
        />
        <textarea
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="your text"
          className="form-control w-50 m-5"
          cols="100"
          rows="10"
        ></textarea>
        <h3>send to:</h3>
        <div onChange={(e) => handleChange(e.target.value)}>
          <FormCheck className="m-2" value={0} label="athletes" />
          <FormCheck className="m-2" value={1} label="owner" />
          <FormCheck className="m-2" value={2} label="coaches" />
          <FormCheck className="m-2" value={3} label="secreteries" />
        </div>
        <Button
          type="submit"
          className="m-5 w-50"
          disabled={types.length === 0 ? true : false}
        >
          send
        </Button>
      </form>
    </div>
  );
}
