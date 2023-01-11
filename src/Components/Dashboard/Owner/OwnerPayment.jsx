import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getPaymentStatus,
  getPaymentStatusClass,
} from "../../Common/commonFuncs";

export default function OwnerPayment() {
  const [rows, setRows] = useState([]);
  const [isGroupBy, setIsGroupBy] = useState(false);
  const [groupByRows, setGroupByRows] = useState([]);
  const moneyFormater = new Intl.NumberFormat("en-US");
  useEffect(() => {
    async function onMount() {
      const { data } = await httpService.get(
        "/sub/payment/all/100/1",
        authHeader
      );
      setRows(data);
    }
    onMount();
  }, []);
  async function handleGroupBy() {
    try {
      const { data } = await httpService.get(
        `/sub/payment/paid_per_athlete`,
        authHeader
      );
      setGroupByRows(data);
      setIsGroupBy(true);
    } catch (e) {
      setIsGroupBy(false);
      if (e && e.response) return alert(e.response.data);
      alert(e.message);
    }
  }
  return (
    <div className="black-mode-wrapper">
      {!isGroupBy && (
        <Table variant="dark" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>first name</th>
              <th>last name</th>
              <th>national code</th>
              <th>phone number</th>
              <th>payed date time</th>
              <th>payment tracking code</th>
              <th>payment amount</th>
              <th>payment status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr
                  className={getPaymentStatusClass(row.status_id)}
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.national_code}</td>
                  <td>{row.phone_number}</td>
                  <td>{row.payed_date_time}</td>
                  <td>{row.payment_tracking_code}</td>
                  <td>{moneyFormater.format(row.payment_amount)}</td>
                  <td>{getPaymentStatus(row.status_id)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {isGroupBy && (
        <Table variant="dark" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>first name</th>
              <th>last name</th>
              <th>national code</th>
              <th>phone number</th>
              <th>total payment</th>
            </tr>
          </thead>
          <tbody>
            {groupByRows.map((row, index) => {
              const isLastIndex =
                groupByRows.length === index + 1 ? true : false;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{!isLastIndex && row.first_name}</td>
                  <td>{!isLastIndex && row.last_name}</td>
                  <td>{!isLastIndex && row.national_code}</td>
                  <td>{!isLastIndex && row.phone_number}</td>
                  <td>{moneyFormater.format(row.total_payment)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {!isGroupBy && (
        <Button onClick={() => handleGroupBy()}>group by athlete</Button>
      )}
      {isGroupBy && (
        <Button
          onClick={() => {
            setGroupByRows([]);
            setIsGroupBy(false);
          }}
        >
          show all payments
        </Button>
      )}
    </div>
  );
}
