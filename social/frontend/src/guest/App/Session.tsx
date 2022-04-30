import React from "react";
import { createSession } from "../http";

import type { Session as ISession } from "../http";

const Context = React.createContext<ISession | null>(null);

export default function Session(props: Props) {
  const [session, setSession] = React.useState<ISession | null>(null);

  React.useEffect(() => {
    if (session) {
      return;
    }

    createSession().then(setSession).catch(console.error);
  }, [session]);

  if (!session) {
    return null;
  }

  return <Context.Provider value={session}>{props.children}</Context.Provider>;
}

export function useSession() {
  const session = React.useContext(Context);

  if (!session) {
    throw new Error("missing session");
  }

  return session;
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}
