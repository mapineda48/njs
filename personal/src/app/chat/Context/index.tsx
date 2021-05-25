import React from "react";
import useStateRoot, { State, Chat, Http } from "../state";
import socket from "app/service/socket";

const Context = {
  State: React.createContext<State>(null as any),
  Chat: React.createContext<Chat>(null as any),
  Http: React.createContext<Http>(null as any),
};

export function useContext() {
  const state = React.useContext(Context.State);
  const chat = React.useContext(Context.Chat);
  const http = React.useContext(Context.Http);

  return [state, chat, http] as const;
}

export function useState() {
  const state = React.useContext(Context.State);

  return state;
}

export function useChat() {
  const chat = React.useContext(Context.Chat);

  return chat;
}

export function useHttp() {
  const http = React.useContext(Context.Http);

  return http;
}

export function ProviderPure(props: Props) {
  const { children, state, chat, http } = props;

  React.useEffect(() => {
    http.addRoom(state.id);

    const current = socket.guess(chat, state.id);

    return () => {
      current.disconnect();
    };
  }, [chat, http, state.id]);

  if (!state.isOnline) return null;

  return (
    <Context.Http.Provider value={http}>
      <Context.Chat.Provider value={chat}>
        <Context.State.Provider value={state}>
          {children}
        </Context.State.Provider>
      </Context.Chat.Provider>
    </Context.Http.Provider>
  );
}

export default function Provider(props: { children: React.ReactNode }) {
  const [state, chat, http] = useStateRoot();

  return (
    <ProviderPure state={state} chat={chat} http={http}>
      {props.children}
    </ProviderPure>
  );
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
  state: State;
  chat: Chat;
  http: Http;
}
