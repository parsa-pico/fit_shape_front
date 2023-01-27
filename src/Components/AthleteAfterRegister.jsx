import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import httpService from "../Services.js/httpService";

export default function AthleteAfterRegister() {
  const params = useParams();

  async function reSendVerificationCode() {
    try {
      const { data } = await httpService.post(`/athlete/re_send_verification`, {
        athlete_id: params.athlete_id,
      });
      alert("check your email");
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div className="container register-page">
      <div className="register-form">
        <h3>successfully registerd</h3>
        <h3>please check your email</h3>
        <Button onClick={() => reSendVerificationCode()}>
          re-send verification code
        </Button>
      </div>
    </div>
  );
}
