import React from "react";
import Chat from "./Chat";
import { useHttp } from "../Context";
import style from "./index.module.scss";

export default function Dashboard() {
  const http = useHttp();

  React.useEffect(() => {
    http.fetchRooms();
  }, [http]);

  return (
    <div className={style.root}>
      <div className={style.panel}>
        <Chat />
      </div>
    </div>
  );
}
