import React, { useEffect, useState } from "react";
import socket from "../socket";
export default function SocketTest() {
  const [arr, setArr] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  useEffect(() => {
    socket.connect();
    return () => {
      socket.off("res");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("res", (data) => {
      setArr((pervState) => [...pervState, data]);
    });
    socket.on("newJoin", (id) => {
      console.log(id + " joind");
    });
    socket.on("connect_error", (err) => {
      alert(err);
    });
  }, []);

  function handleClick() {
    socket.emit("message", "test");
  }
  function handleJoinRoom() {
    socket.emit("join", roomNumber);
  }
  return (
    <div>
      {arr.map((item, idx) => (
        <p key={idx}>{item}</p>
      ))}
      <input
        onChange={({ target }) => setInputValue(target.value)}
        type="text"
      />
      <button onClick={handleClick}>click</button>
      <input
        onChange={({ target }) => setRoomNumber(target.value)}
        type="text"
      />
      <button onClick={handleJoinRoom}>join room</button>
    </div>
  );
}
