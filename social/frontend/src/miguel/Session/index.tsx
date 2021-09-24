import React from "react";
import Login from "./Login";
import createSocket, { Socket } from "../../socket/miguel";
import { client as http } from "../../http";

export const Context = React.createContext<Session>(null as any);

export function useSession() {
  const state = React.useContext(Context);

  if (!state) {
    throw new Error("missing session");
  }

  return state;
}

export default function Session(props: Props) {
  const [state, setState] = React.useState<Session | null>(null);

  if (!state) {
    return (
      <Login
        onToken={(token) => {
          const socket = createSocket(token);

          setState({
            token,
            socket,
            async logout() {
              try {
                await http.logout(token);
              } catch (error) {
                console.error(error);
              } finally {
                setState(null);
                socket.disconnect();
              }
            },
          });
        }}
      />
    );
  }

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}

interface Session {
  token: string;
  socket: Socket;
  logout: () => Promise<void>;
}
