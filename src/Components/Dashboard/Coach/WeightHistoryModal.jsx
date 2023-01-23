import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";

export default function WeightHistoryModal({ title, show, setShow, rows }) {
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
                <th>date</th>
                <th>weight</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.date}</td>
                    <td>{row.weight}</td>
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
