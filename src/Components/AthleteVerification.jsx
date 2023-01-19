import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import httpService from "../Services.js/httpService";
import { authHeader } from "../Services.js/authService";
import { Alert } from "react-bootstrap";

export default function AthleteVerification() {
  const [backToLoginBtnClass, setBackToLoginBtnClass] = useState("hidden");
  const [searchParmas] = useSearchParams();
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [verifyCountDown, setVerifyCountDown] = useState(5);
  const [verificationDetails, setVerificationDetails] = useState();
  const [isVerifed, setIsVerified] = useState(false);
  function getSearchParmas() {
    const user_id = parseInt(searchParmas.get("user_id"));
    const token = searchParmas.get("token");

    setVerificationDetails({ token, user_id });
  }
  async function handleVerify() {
    try {
      const { data } = await httpService.post(
        "/athlete/verify",
        verificationDetails,
        authHeader
      );
      setIsVerified(true);
    } catch (e) {
      console.log(e);
      if (e.response) return alert(e.response.data);
      alert(e.message);
    } finally {
      setBackToLoginBtnClass("hidden visibale");
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
      {isVerifed && (
        <Alert className="m-2 verify-callback__alert" variant="success">
          successfully verified
        </Alert>
      )}
      <button
        className={`m-3 btn btn-dark ${backToLoginBtnClass}`}
        onClick={() => window.location.replace("/login/athlete")}
      >
        go back to login page
      </button>
    </div>
  );
}
