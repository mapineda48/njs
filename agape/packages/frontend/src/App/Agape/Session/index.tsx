import { Outlet } from "Router";
import { createContext, useContext } from "react";
import useForm, { Session as User } from "./session";
import Input from "form/Input";
import useToolTip from "hook/bootstrap/useTooltip";

const Context = createContext<Session | null>(null);

export function useSession() {
  const session = useContext(Context);

  if (!session) {
    throw new Error("missing session api");
  }

  return session;
}

export default function UserSession() {
  const form = useForm();
  const ref = useToolTip<HTMLButtonElement>(form.error);

  if (form.session) {
    return (
      <Context.Provider value={{ ...form.session, logout: form.logout }}>
        <Outlet />
      </Context.Provider>
    );
  }

  if (!form.login) {
    if (form.isLoading) {
      return <div>loading...</div>;
    }

    if (form.error) {
      return <div>{form.error}</div>;
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <div className="form-signin text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log(form);
            form.submit();
          }}
        >
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width={72}
            height={57}
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating mb-2">
            <Input.String
              proxy={form}
              id="username"
              className="form-control"
              placeholder="mapineda48"
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-2">
            <Input.String
              proxy={form}
              id="password"
              password
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <Input.CheckBox proxy={form} id="rememberMe" />
              Remember me
            </label>
          </div>
          <button
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={form.error}
            ref={ref}
            disabled={form.isLoading}
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Sign in
          </button>
          <div className="invalid-feedback">
            Please enter a message in the textarea.
          </div>
          <p className="text-center mt-5 mb-3 text-muted">© 2023</p>
        </form>
      </div>
    </div>
  );
}

/**
 * Types
 */
export interface Session extends Omit<User, "token"> {
  logout: () => void;
}
