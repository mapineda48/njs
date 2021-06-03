import React from "react";
import type { State, Grants, Http } from "../state";

export const ContextState = React.createContext<State>({} as any);

export const ContextGrants = React.createContext<Grants>({} as any);

export const ContextHttp = React.createContext<Http>({} as any);

/**
 * Context
 */
export default function Context(props: Props) {
  return (
    <ContextHttp.Provider value={props.http}>
      <ContextGrants.Provider value={props.grants}>
        <ContextState.Provider value={props.state}>
          {props.children}
        </ContextState.Provider>
      </ContextGrants.Provider>
    </ContextHttp.Provider>
  );
}

/**
 * Hooks
 */

/**
 * Get Context
 */
export function useContext() {
  const state = React.useContext(ContextState);

  const grants = React.useContext(ContextGrants);

  const http = React.useContext(ContextHttp);

  return [state, grants, http] as const;
}

export function useState() {
  return React.useContext(ContextState);
}

export function useGrants() {
  return React.useContext(ContextGrants);
}

export function useHttp() {
  return React.useContext(ContextHttp);
}

/**
 * Types
 */
export interface Props {
  state: State;
  grants: Grants;
  http: Http;
  children: JSX.Element | JSX.Element[];
}
