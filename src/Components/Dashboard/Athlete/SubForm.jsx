import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { authHeader, clearToken } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import Form from "react-bootstrap/Form";

export default function SubForm() {
  const [coachs, setCoaches] = useState([]);
  const [sub, setSub] = useState();
  const [subTypes, setSubTypes] = useState([]);
  const [genericError, setGenericError] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState();
  const [errors, setErrors] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  useEffect(() => {
    async function onMount() {
      const { data: coachRows } = await httpService.get(
        "/athlete/coach",
        authHeader
      );

      const { data: subTypeRows } = await httpService.get("/sub/sub_type");

      setSubTypes(subTypeRows);
      setCoaches(coachRows);
    }
    onMount();
  }, []);
  useEffect(() => {
    if (sub && sub.sub_type_id && sub.total_days)
      setPaymentAmount(mustPayAmount());
  }, [sub]);
  function mustPayAmount() {
    const { price_per_day } = subTypes.find(
      (subType) => subType.sub_type_id == sub.sub_type_id
    );
    return price_per_day * sub.total_days;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      if (sub.coach_id === "" || sub.sub_type_id == 1) delete sub.coach_id;
      const { data } = await httpService.post("/sub", sub, authHeader);
      console.log(data);
      window.location.replace(data.payment_link);
    } catch (error) {
      console.log(error);
      setGenericError(error.response.data);
      setDisableBtn(false);
    }
  };

  function handleUserInfo({ target }) {
    const value = target.value.trim();

    setSub((prevState) => ({
      ...prevState,
      [target.id]: value,
    }));
  }

  return (
    <div className=" m-5 w-100">
      <h3>new sub</h3>
      <form onSubmit={handleSubmit}>
        <div onChange={handleUserInfo}>
          <Form.Select className="select" id="sub_type_id">
            <option>choose your sub type</option>
            {subTypes.map((sub) => (
              <option
                key={sub.sub_type_id}
                value={sub.sub_type_id}
              >{`${sub.type} ${sub.price_per_day} Rial per day`}</option>
            ))}
          </Form.Select>
          {sub && sub.sub_type_id && sub.sub_type_id == 2 && (
            <Form.Select className="select" id="coach_id">
              <option>choose your coach</option>
              {coachs.map((coach) => (
                <option key={coach.staff_id} value={coach.staff_id}>
                  {coach.full_name}
                </option>
              ))}
              {/* <option
                value={""}
              >{`i don't know any coach(we will choose for you)`}</option> */}
            </Form.Select>
          )}

          <Input type="number" className="register-input" id={"total_days"} />
        </div>
        {genericError && (
          <div className="alert alert-danger">
            <b>{genericError}</b>
          </div>
        )}
        {paymentAmount && sub && sub.total_days && (
          <h4>
            payment amount:
            <br></br>
            {paymentAmount} RIAL
          </h4>
        )}
        <button disabled={disableBtn} className="btn btn-primary m-3">
          save and pay
        </button>
      </form>
    </div>
  );
}
