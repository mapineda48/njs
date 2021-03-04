import React from "react";
import useStateRoot, { create, State, Admin, Http } from ".";

const value: any = null;

const ContextState = React.createContext<State>(create());

const ContextAdmin = React.createContext<Admin>(value);

const ContextHttp = React.createContext<Http>(value);

export function useState() {
  const state = React.useContext(ContextState);

  const admin = React.useContext(ContextAdmin);

  const http = React.useContext(ContextHttp);

  return [state, admin, http] as const;
}

export function useHttp() {
  return React.useContext(ContextHttp);
}

export function useAdmin() {
  return React.useContext(ContextAdmin);
}

export default function Context(props: Props) {
  const [state, admin, http] = useStateRoot();

  if (!admin || !http) return null;

  return (
    <ContextAdmin.Provider value={admin}>
      <ContextHttp.Provider value={http}>
        <ContextState.Provider value={state}>
          {props.children}
        </ContextState.Provider>
      </ContextHttp.Provider>
    </ContextAdmin.Provider>
  );
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}
