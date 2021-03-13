import React from "react";
import useState from "./state";
import { useAdmin } from "../Context";
import { createTooltip } from "components/Tooltip";
import type { OnSession } from "./state/thunk";

const Error = createTooltip();

Error.options = { ...Error.options, placement: "top" };

export function Login({ onSession }: Props) {
  const [state, login, http] = useState();

  React.useEffect(() => {
    if (!state.session) return;

    onSession(state.session);
    login.clear();
  }, [login, onSession, state.session]);

  return (
    <div className="login">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          http.login();
        }}
      >
        <div>
          <h3>Admin</h3>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            disabled={state.isLoading}
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="Username"
            required
            maxLength={10}
            autoComplete="off"
            value={state.username}
            onChange={({ currentTarget: { value } }) =>
              login.setUsername(value)
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            disabled={state.isLoading}
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Password"
            required
            maxLength={10}
            value={state.password}
            onChange={({ currentTarget: { value } }) =>
              login.setPassword(value)
            }
          />
        </div>
        <div>
          <Error portal enabled={!!state.message} content={state.message}>
            <div>
              <input
                disabled={state.isLoading}
                type="submit"
                value="Login"
                className="btn btn-success"
              />
            </div>
          </Error>
        </div>
      </form>
    </div>
  );
}

export default function LoginInContext() {
  const admin = useAdmin();

  return <Login onSession={(session) => admin.setToken(session)} />;
}

/**
 * Types
 */
interface Props {
  onSession: OnSession;
}
