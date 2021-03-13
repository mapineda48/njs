import React from "react";
import type { State, Admin, Http } from "../state";

export default function Context(props: Props) {
  return (
    <Context.Http.Provider value={props.http}>
      <Context.Admin.Provider value={props.admin}>
        <Context.State.Provider value={props.state}>
          {props.children}
        </Context.State.Provider>
      </Context.Admin.Provider>
    </Context.Http.Provider>
  );
}

Context.Admin = React.createContext<Admin>(null as any);
Context.State = React.createContext<State>(null as any);
Context.Http = React.createContext<Http>(null as any);

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
