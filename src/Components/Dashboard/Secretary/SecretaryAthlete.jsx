import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { authHeader } from "../../../Services.js/authService";
import httpService from "../../../Services.js/httpService";
import { Input } from "../../Common/Inputs";
import { getBloodType } from "./../../Common/commonFuncs";
import AthleteDetailsModal from "../Coach/AthleteDetailsModal";
import cartoonMan from "../../Images/cartoonMan.png";
export default function SecretaryAthlete() {
  const [athleteName, setAthleteName] = useState("");
  const [athleteDetails, setAthleteDetails] = useState({});
  const [showAthleteDetails, SetShowAthleteDetails] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAthleteId, setEditAthleteId] = useState();
  const [editRfidTag, setEditRfidTag] = useState("");
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function onMount() {
      try {
        const { data } = await httpService.get(
          "/secretary/athlete/",
          authHeader
        );
        setRows(data);
      } catch (error) {
        if (error.response) alert(error.response.data);
        else alert(error.message);
      }
    }
    onMount();
  }, []);
  console.log(rows);
  async function handleEdit() {
    try {
      await httpService.put(
        `/secretary/athlete/${editAthleteId}`,
        { rfid_tag: editRfidTag },
        authHeader
      );
      window.location = "/dashboard/athlete";
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert(error.message);
    }
  }
  return (
    <div className="black-mode-wrapper">
      <AthleteDetailsModal
        title={athleteName}
        bodyObj={athleteDetails}
        show={showAthleteDetails}
        setShow={SetShowAthleteDetails}
      />
      <div>
        <Table variant="dark" hover>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>first name</th>
              <th>last name</th>
              <th></th>
              <th>rfid tag</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const editCondtion =
                isEditMode && row.athlete_id == editAthleteId;
              return (
                <tr key={index}>
                  <td></td>
                  <td>
                    {index + 1}
                    {row.is_in_gym && (
                      <img className="cartoon-man" src={cartoonMan} alt="" />
                    )}
                  </td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td
                    onClick={() => {
                      SetShowAthleteDetails(!showAthleteDetails);
                      setAthleteDetails({
                        athlete_id: 32,
                        national_code: row.national_code,
                        phone_number: row.phone_number,
                        email: row.email,
                        blood_type_id: getBloodType(row.blood_type_id),
                        height: row.height,
                        city: row.city,
                        street: row.street,
                        alley: row.alley,
                        house_number: row.house_number,
                      });
                      setAthleteName(row.first_name + " " + row.last_name);
                    }}
                    className="hyperlink"
                  >
                    view athlete details
                  </td>
                  {!editCondtion && (
                    <>
                      <td
                        onClick={() => {
                          setIsEditMode(true);
                          setEditAthleteId(row.athlete_id);
                          setEditRfidTag(row.rfid_tag);
                        }}
                      >
                        <textarea
                          style={{
                            background: "#212529",
                            color: "white",
                            resize: "none",
                          }}
                          defaultValue={row.rfid_tag}
                          className="form-contorl no-border "
                          cols="25"
                          rows="1"
                        />
                      </td>
                      <td></td>
                    </>
                  )}
                  {editCondtion && (
                    <>
                      <td>
                        <textarea
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEdit();
                          }}
                          onChange={({ target }) => {
                            if (target.value === "") setEditRfidTag(null);
                            else setEditRfidTag(target.value.trim());
                          }}
                          value={editRfidTag}
                          style={{
                            background: "#212529",
                            color: "white",
                            resize: "none",
                          }}
                          className="form-contorl no-border "
                          cols="25"
                          rows="1"
                        ></textarea>
                      </td>
                      <td>
                        <Button onClick={() => handleEdit()}>save</Button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
