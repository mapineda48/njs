import React from "react";
import socket from "app/service/socket";
import type { State, Admin, Http } from "../state";

export default function Context(props: Props) {
  const { state, admin, http, children } = props;

  const { token } = state;

  React.useEffect(() => {
    if(!token) return;

    const current = socket.admin(admin, token);

    return () => {
      current.disconnect();
    };
  }, [admin, http, token]);

  return (
    <Context.Http.Provider value={http}>
      <Context.Admin.Provider value={admin}>
        <Context.State.Provider value={state}>
          {children}
        </Context.State.Provider>
      </Context.Admin.Provider>
    </Context.Http.Provider>
  );
}

Context.Admin = React.createContext<Admin>(null as any);
Context.State = React.createContext<State>(null as any);
Context.Http = React.createContext<Http>(null as any);

export function useHttp() {
  return React.useContext(Context.Http);
}

export function useState() {
  return React.useContext(Context.State);
}

export function useAdmin() {
  return React.useContext(Context.Admin);
}

export function useContext() {
  const state = React.useContext(Context.State);

  const admin = React.useContext(Context.Admin);

  const http = React.useContext(Context.Http);

  return [state, admin, http] as const;
}

/**
 * Types
 */
export interface Props {
  state: State;
  admin: Admin;
  http: Http;
  children: React.ReactNode;
}
