import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";

export default function SportHistoryModal({ title, show, setShow, rows }) {
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescriptionId, setCurrentDescriptionId] = useState();
  return (
    <div>
      <Modal
        dialogClassName="sport-history__modal"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Sport</th>
                <th>Spent Years</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.sport}</td>
                    <td>{row.spent_years}</td>
                    <td
                      className="hyperlink sport-history__description-wrapper"
                      onClick={() => {
                        setShowDescription(!showDescription);
                        setCurrentDescriptionId(row.sport_history_id);
                      }}
                    >
                      {!showDescription && "..."}
                      {showDescription &&
                        row.sport_history_id === currentDescriptionId && (
                          <span>
                            <button className="btn btn-sm small btn-danger sport-history__description-close">
                              X
                            </button>
                            <textarea
                              value={row.description}
                              readOnly
                              cols={20}
                              rows={5}
                              className="form-control no-border sport-history__description"
                            ></textarea>
                          </span>
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}
