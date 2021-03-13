import React from "react";
import Chat from "./Chat";
import { useContext } from "../Context";
import socket from "service/socket";

export default function Dashboard() {
  const [{ token }, admin, http] = useContext();

  React.useEffect(() => {
    http.fetchRooms();

    socket.admin(admin, token);
  }, [admin, http, token]);

  return (
    <div className="dashboard">
      <div className="tabs">
        <div>chat</div>
      </div>
      <Chat />
    </div>
  );
}
