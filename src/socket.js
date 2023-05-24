import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  autoConnect: false,
  auth: { token: "123" },
});
export default socket;
