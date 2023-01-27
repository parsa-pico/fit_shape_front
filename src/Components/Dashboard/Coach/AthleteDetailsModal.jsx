import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export default function CustomModal({ setShow, show, title, bodyObj }) {
  const [body, setBody] = useState([]);
  useEffect(() => {
    let body = [];
    for (let key in bodyObj) {
      body.push(`${key}   : ${bodyObj[key]}`);
    }
    setBody(body);
  }, [bodyObj]);

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body && body.map((p, index) => <p key={index}>{p}</p>)}
        </Modal.Body>
      </Modal>
    </div>
  );
}
