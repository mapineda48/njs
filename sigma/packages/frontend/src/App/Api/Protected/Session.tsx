import axios from "axios";
import React, { useContext } from "react";
import ProtectedApi from "api/protected";

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

const Context = React.createContext<ProtectedApi>(
  new ProtectedApi(
    axios.create({
      baseURL,
    })
  )
);

export function useSession() {
  return useContext(Context);
}

export default function SessionProvider(props: { children: JSX.Element }) {
  const api = new ProtectedApi(
    axios.create({
      baseURL,
    })
  );

  return <Context.Provider value={api}>{props.children}</Context.Provider>;
}
