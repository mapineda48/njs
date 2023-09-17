import { authenticate, Auth } from "backend/api.old/auth/agape";
import { Outlet } from "Router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Form from "Form";
import Input from "Form/Input";

const Context = createContext<Omit<Auth, "token"> | null>(null);

export function useSession() {
  const session = useContext(Context);

  if (!session) {
    throw new Error("missing session api");
  }

  return session;
}

export function useAuth() {}

const initState: State = {
  showLogin: false,
  isLoading: false,
  error: null,
  session: null,
};

const cache = storage("agape");

export default function Session() {
  const [state, setState] = useState<State>({
    ...initState,
    isLoading: true,
  });

  const setAuth = useCallback((auth: Auth) => {
    setState({ ...initState, session: auth });
    cache.set(auth.token);
  }, []);

  useEffect(() => {
    const token = cache.get();

    if (!token) {
      setState({ ...initState, showLogin: true });
      return;
    }

    let onError: any = () => {
      cache.remove();
      setState({ ...initState, showLogin: true });
    };
    let onSuccess: any = setAuth;

    authenticate(token)
      .then((auth) => onSuccess && onSuccess(auth))
      .catch(() => onError && onError());

    return () => {
      onSuccess = null;
      onError = null;
    };
  }, [setAuth]);

  if (state.session) {
    return (
      <Context.Provider value={state.session}>
        <Outlet />
      </Context.Provider>
    );
  }

  if (!state.showLogin && state.isLoading) {
    return <div>loading...</div>;
  }

  if (!state.showLogin && state.error) {
    return <div>{JSON.stringify(state.error)}</div>;
  }

  return (
    <div>
      <Form
        onSubmit={(auth: { username: string; password: string }) => {
          setState((state) => ({ ...state, isLoading: true }));

          authenticate(auth.username, auth.password)
            .then(setAuth)
            .catch((error) => {
              setState((state) => ({ ...state, isLoading: false, error }));
            });
        }}
      >
        <Input.Text fieldName="username" />
        <Input.Text fieldName="password" password />
        <input type="submit" value="Enviar" />
      </Form>
    </div>
  );
}

function storage(key: string) {
  return {
    set(value: string) {
      localStorage.setItem(key, value);
    },
    get() {
      return localStorage.getItem(key);
    },
    remove() {
      localStorage.removeItem(key);
    },
  };
}

/**
 * Types
 */
interface State {
  isLoading: boolean;
  showLogin: boolean;
  session: Omit<Auth, "token"> | null;
  error?: any;
}
