import React from "react";

import type { State, App, Http } from "../state";

const Context = {
  State: React.createContext<State>(null as any),
  Reducer: React.createContext<[App, Http]>(null as any),
};

export function useState() {
  return React.useContext(Context.State);
}

export function useContext() {
  return React.useContext(Context.Reducer);
}

export function useApp() {
  const [app] = React.useContext(Context.Reducer);

  return app;
}

export function useHttp() {
  const [, http] = React.useContext(Context.Reducer);

  return http;
}

function ContextApp(props: Props) {
  return (
    <Context.Reducer.Provider value={[props.app, props.http]}>
      <Context.State.Provider value={props.state}>
        {props.children}
      </Context.State.Provider>
    </Context.Reducer.Provider>
  );
}

export default ContextApp;

/**
 * Types
 */
interface Props {
  state: State;
  http: Http;
  app: App;
  children: React.ReactNode;
}
