import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { authHeader, clearToken } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";

export default function SportHistoryForm() {
  const params = useParams();
  const location = useLocation();
  const [sportHisory, setSportHistory] = useState();
  const [genericError, setGenericError] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (location.state) {
      const { sport, spent_years, description } =
        location.state.originalSportHistory;

      setSportHistory({ sport, spent_years, description });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id === "new") {
        await httpService.post(
          "/athlete/sport_history",
          sportHisory,
          authHeader
        );
      } else {
        await httpService.put(
          `/athlete/sport_history/${params.id}`,
          sportHisory,
          authHeader
        );
      }

      window.location = "/dashboard/sport_history";
    } catch (error) {
      console.log(error);
      setGenericError(error.response.data);
    }
  };

  function handleUserInfo({ target }) {
    const value = target.value.trim();
    setSportHistory((prevState) => ({
      ...prevState,
      [target.id]: value,
    }));
  }

  return (
    <div className=" m-5 w-100">
      <form onSubmit={handleSubmit}>
        <div onChange={handleUserInfo}>
          <Input
            defaultValue={sportHisory && sportHisory.sport}
            className="register-input "
            id={"sport"}
          />
          <Input
            type="number"
            defaultValue={sportHisory && sportHisory.spent_years}
            className="register-input"
            id={"spent_years"}
          />
          <label htmlFor="description">description</label>
          <textarea
            rows={10}
            defaultValue={sportHisory && sportHisory.description}
            className="form-control"
            id="description"
          ></textarea>
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        <button className="btn btn-primary m-3">
          {params.id === "new" ? "add" : "submit change "}
        </button>
      </form>
    </div>
  );
}
