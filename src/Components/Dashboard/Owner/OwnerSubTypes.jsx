import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import { authHeader } from "./../../../Services.js/authService";

export default function OwnerSubTypes() {
  const [subTypes, setSubTypes] = useState([]);
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get("/sub/sub_type");
      setSubTypes(data);
    }
    onMount();
  }, []);
  function handleChange(value, index) {
    const subTypesCopy = [...subTypes];
    subTypesCopy[index] = { ...subTypes[index] };
    subTypesCopy[index].price_per_day = value;
    console.log(subTypesCopy);
    setSubTypes(subTypesCopy);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      for (let type of subTypes) {
        await httpService.put(
          "/owner/sub_type",
          {
            sub_type_id: type.sub_type_id,
            price_per_day: type.price_per_day,
          },
          authHeader
        );
      }

      window.location = "/dashboard/sub_types";
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div className="container mt-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        {subTypes.map((type, index) => (
          <Input
            onChange={({ target }) => handleChange(target.value, index)}
            type="number"
            key={index}
            value={type.price_per_day}
            id={type.type}
          />
        ))}
        <Button className="mt-2" type="submit">
          save
        </Button>
      </form>
    </div>
  );
}
