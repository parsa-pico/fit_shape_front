import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import httpService from "../Services.js/httpService";
import { authHeader } from "../Services.js/authService";
import { Alert } from "react-bootstrap";

export default function PaymentVerification() {
  const [backToSubsBtnClass, setBackToSubsBtnClass] = useState("hidden");
  const [searchParmas] = useSearchParams();
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [verifyCountDown, setVerifyCountDown] = useState(10);
  const [paymentDetails, setPaymentDetails] = useState();
  const [paymentStatus, setPaymentStatus] = useState(null);
  function getSearchParmas() {
    const status = searchParmas.get("status");
    const track_id = searchParmas.get("track_id");
    const id = searchParmas.get("id");
    const order_id = searchParmas.get("order_id");
    setPaymentDetails({ status, track_id, id, order_id });
  }
  async function handleVerify() {
    try {
      const { data } = await httpService.post(
        "/sub/payment/verify",
        paymentDetails,
        authHeader
      );
      if (data.status_id == 3) return setPaymentStatus(true);
      return setPaymentStatus(false);
    } catch (e) {
      console.log(e);
      if (e.response) return alert(e.response.data);
      alert(e.message);
    } finally {
      setBackToSubsBtnClass("hidden visibale");
    }
  }
  useEffect(() => {
    getSearchParmas();
  }, []);

  useEffect(() => {
    if (verifyCountDown !== 0 && !isBtnClicked)
      setTimeout(() => {
        setVerifyCountDown(verifyCountDown - 1);
      }, 1000);
    else if (!isBtnClicked) handleVerify();
  }, [verifyCountDown]);

  return (
    <div className=" verify-callback">
      <button
        className="btn btn-light verify-callback__btn"
        onClick={() => {
          setIsBtnClicked(true);
          handleVerify();
        }}
      >
        verify {verifyCountDown !== 0 && !isBtnClicked && verifyCountDown}
      </button>
      {paymentStatus !== null && (
        <Alert
          className="m-2 verify-callback__alert"
          variant={paymentStatus === true ? "success" : "danger"}
        >
          {paymentStatus === true && "payment was successful"}
          {paymentStatus === false &&
            `payment was unsuccessful 
             id pay track id= ${paymentDetails.track_id}`}
        </Alert>
      )}

      <button
        className={`btn btn-dark ${backToSubsBtnClass}`}
        onClick={() => window.location.replace("/dashboard/sub")}
      >
        go back to subscriptions
      </button>
    </div>
  );
}
