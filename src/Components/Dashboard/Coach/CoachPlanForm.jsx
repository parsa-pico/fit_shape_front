import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import Form from "react-bootstrap/Form";

export default function CoachPlanForm() {
  const [coachPlan, setCoachPLan] = useState();
  const [coachPlanTypes, setCoachPlanTypes] = useState([]);
  const [genericError, setGenericError] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    async function onMount() {
      const { data: planTypes } = await httpService.get(
        `/coach/coach_plan/coach_plan_type`
      );
      setCoachPlanTypes(planTypes);
    }
    onMount();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await httpService.post("/coach/coach_plan", coachPlan, authHeader);

      window.location = "/dashboard/coach_plan";
    } catch (error) {
      if (error.response) setGenericError(error.response.data);
      else alert(error.message);
    }
  };

  function handleUserInfo({ target }) {
    const value = target.value.trim();
    setCoachPLan((prevState) => ({
      ...prevState,
      [target.id]: value,
    }));
  }

  return (
    <div className=" m-5 w-100">
      <form onSubmit={handleSubmit}>
        <div onChange={handleUserInfo}>
          <Input className="register-input " id={"title"} />
          <Form.Select className="select" id="plan_type_id">
            <option>choose your plan type</option>
            {coachPlanTypes.map((planType) => (
              <option key={planType.plan_type_id} value={planType.plan_type_id}>
                {planType.type}
              </option>
            ))}
          </Form.Select>
          <label htmlFor="description">description</label>
          <textarea
            rows={10}
            defaultValue={coachPlan && coachPlan.description}
            className="form-control"
            id="description"
          ></textarea>
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        <button className="btn btn-primary m-3">add</button>
      </form>
    </div>
  );
}
