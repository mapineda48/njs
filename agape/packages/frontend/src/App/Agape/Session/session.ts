import authenticate, { Session } from "backend/api/rpc/agape";
import initForm, { FormState, FormError } from "form.BETA4";
import initCache from "./storage";

let current: Omit<Session, "token"> | undefined;

const cache = initCache("session");

const proto = {
  username: "",
  password: "",
  login: false,
  rememberMe: false,
  session: current,
  error: "",

  async submit() {
    this.error = "";

    const { username, password, rememberMe } = this;

    const { token, ...session } = await authenticate(username, password);

    this.logout();

    if (rememberMe) {
      cache.set(token);
    }

    this.session = current = session;
  },

  logout() {
    this.username = "";
    this.password = "";
    this.rememberMe = false;
    this.login = true;
    this.error = "";
    this.session = current = undefined;

    cache.remove();
  },

  onError(error: FormError) {
    if (error.response?.status === 401) {
      this.error = "Eso no funciono";
      return;
    }

    this.error = "Error desconocido";
  },

  onInit() {
    if (current) {
      this.session = current;
      return;
    }

    const token = cache.get();

    if (!token) {
      this.login = true;
      return;
    }

    return remember(token);
  },
};

async function remember(user: string) {
  try {
    const { token, ...session } = await authenticate(user);

    current = session;
    cache.set(token);

    return (state: State) => ({ ...state, session });
  } catch (error) {
    cache.remove();

    return (state: State) => ({ ...state, login: true });
  }
}

export default initForm(proto);

/**
 * Types
 */
export type { Session };
export type State = FormState<typeof proto>;
