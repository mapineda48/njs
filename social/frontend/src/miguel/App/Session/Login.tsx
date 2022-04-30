import React from "react";
import { initAction } from "mp48-react/useState";
import { login as loginSession } from "../../http";
import clsx from "clsx";

import type { Session } from "../../http";

const useState = initAction({
  message(state: State, message: string): State {
    return { ...state, message, loading: false };
  },
  user(state: State, user: string): State {
    return { ...state, user, message: "" };
  },
  password(state: State, password: string): State {
    return { ...state, password, message: "" };
  },
  loading(state: State, loading = true): State {
    return { ...state, loading };
  },
  reset(state: State): State {
    return create();
  },
});

export default function LogIn(props: Props) {
  const [state, , login] = useState(create);

  const missingCredetials = !state.user || !state.password;

  const label = state.loading ? (
    <div className="spinner-border spinner-border-sm" role="status" />
  ) : state.message ? (
    state.message
  ) : (
    "Sign In"
  );

  React.useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <form
      className="login panel"
      onSubmit={async (event) => {
        event.preventDefault();
        if (state.message) return;

        login.loading();

        try {
          const session = await loginSession(state.user, state.password);
          props.onSuccess(session);
        } catch (error: any) {
          login.message(error.message);
        } finally {
          login.loading(false);
        }
      }}
      noValidate
    >
      <h3>Social</h3>
      <input
        required
        id="user"
        name="user"
        placeholder="username"
        autoComplete="Text"
        autoFocus
        className="form-control"
        onChange={({ currentTarget: { value } }) => login.user(value)}
        value={state.user}
      />
      <input
        required
        name="password"
        type="password"
        id="password"
        placeholder="password"
        autoComplete="current-password"
        className="form-control"
        onChange={({ currentTarget: { value } }) => login.password(value)}
        value={state.password}
      />
      <button
        type="submit"
        color={state.message ? "secondary" : "primary"}
        className={clsx([
          "btn",
          state.loading && "btn-info",
          !state.message && !state.loading && "btn-primary",
          state.message && "btn-danger",
        ])}
        disabled={state.loading || missingCredetials}
      >
        {label}
      </button>
    </form>
  );
}

function create(): State {
  return {
    message: "",
    loading: false,
    user: "",
    password: "",
  };
}

/**
 * Types
 *
 */

interface Props {
  onSuccess: (session: Session) => void;
}

export interface State {
  message: string;
  loading: boolean;
  user: string;
  password: string;
}
