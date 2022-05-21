import React from "react";
import { initReducer } from "mp48-react/useState";
import Login from "./Login";
import { existsSession } from "../../http";

import type { Session } from "../../http";

export const Context = React.createContext<Session | null>(null);

export function useSession() {
  const state = React.useContext(Context);

  if (!state) {
    throw new Error("missing session");
  }

  return state;
}

const useState = initReducer({
  sync(state: State, session: Session | null): State {
    return { ...state, session, isSync: true, isLoading: false };
  },
  isLoading(state: State, isLoading = true): State {
    return { ...state, isLoading };
  },
});

export default function ProviderSession(props: Props) {
  const [state, , session] = useState({
    session: null,
    isLoading: false,
    isSync: false,
  });

  React.useEffect(() => {
    if (state.isLoading || state.isSync) {
      return;
    }

    existsSession()
      .then(session.sync)
      .catch((err) => {
        console.error(err);
        session.sync(null);
      });
  }, [state.isSync, state.isLoading, session]);

  if (state.isLoading) {
    return <div>loading....</div>;
  }

  if (!state.isSync) {
    return null;
  }

  if (!state.session) {
    return <Login onSuccess={session.sync} />;
  }

  return (
    <Context.Provider value={state.session}>{props.children}</Context.Provider>
  );
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}

interface State {
  session: Session | null;
  isLoading: boolean;
  isSync: boolean;
}
