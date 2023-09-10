import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import history from "history/browser";
import { Routes, extractParams, pathJoin } from "./util";
import RouteExp from "./RouteExp";

const key = Symbol();
const Context = createContext<IContext>({ baseUrl: "", Outlet: null });
const initState = {} as State;

export function Router(BaseUrl?: FComponent): Route {
  const map = new Map();
  const routes: Routes = [];

  const sync = ({ state, parent: nested }: Sync) => {
    const root = new RouteExp(nested);
    const pathname = history.location.pathname.replace(root.startWith, "");

    const match = routes.find((route) => route.test(pathname));

    const Match = map.get(match?.pattern) ?? MissingRoute;
    const isNested = isRoute(Match);

    const pattern = !isNested ? pathname : Match.pattern;

    if (state.pattern === pattern && pathname.startsWith(state.chunk)) {
      return null;
    }

    const [chunk = ""] = !isNested
      ? [pathname]
      : pathname.match(new RouteExp(pattern).startWith) ?? [];

    const parent = isNested ? root.pattern + chunk : root.pattern;

    const param = isNested ? {} : extractParams(pathname, match?.pattern ?? "");

    const Element = isNested ? Match[key] : () => <Match param={param} />;

    const Provider = () => (
      <Context.Provider
        value={{ baseUrl: parent, Outlet: !BaseUrl ? null : Element }}
      >
        {BaseUrl ? <BaseUrl /> : <Element />}
      </Context.Provider>
    );

    return {
      Element: Provider,
      chunk,
      pattern,
    };
  };

  /**
   * Function Component
   */
  const Route: any = () => {
    const parent = useContext(Context).baseUrl;

    const [state, setState] = useState<State>(
      () => sync({ state: initState, parent }) ?? initState
    );

    const ref = useRef({ parent, state });
    ref.current.parent = parent;
    ref.current.state = state;

    console.log(`render in baseUrl '${parent}' chunk '${state.chunk}'`);
    //console.log(state);

    useEffect(() => {
      return history.listen(() => {
        const state = sync(ref.current);

        if (state) {
          setState(state);
        }
      });
    }, []);

    if (state.Element) {
      return <state.Element />;
    }

    return null;
  };

  /**
   * Cuando se anidan las rutas esto permite a la ruta superior saber cuales son las
   * subrutas disponibles
   */
  Object.defineProperty(Route, key, {
    configurable: false,
    get() {
      return routes.map((route) => route.pattern);
    },
  });

  /**
   * Intentando imitar el comportamiendo de expressjs, agregar los manejadores de cada ruta
   */
  Route.use = (pattern: string, Handler: any) => {
    if (typeof Handler !== "function") {
      throw new Error("Only support function components");
    }

    /**
     * Es necesario agregarlo un . para que sea una expresion regular valida
     */
    if (pattern === "*") {
      pattern = ".*";
    }

    /**
     * En caso de que no sea otra rita anidad, simplemente la agregamos a las
     * rutas disponibles
     */
    if (!isRoute(Handler)) {
      const route = new RouteExp(pattern);

      routes.push(route);

      map.set(pattern, Handler);
      return;
    }

    /**
     * Recuperando los patrones de la ruta unidades agregamos en esta ruta superior
     * los manejadores de para esta
     */

    const patterns = Handler[key].map((route: string) => {
      return pathJoin(pattern, route);
    });

    patterns.forEach((route: string) => {
      routes.push(new RouteExp(route));

      map.set(route, { pattern, [key]: Handler });
    });
  };

  return Route;
}

export function Redirect(props: { relative?: boolean; to: string }) {
  const { baseUrl } = useContext(Context);

  //console.log({ props, baseUrl });

  const path = pathJoin(baseUrl, props.to);

  //console.log(`redirect to ${path}`);

  useEffect(() => {
    setTimeout(() => history.replace(path));
  }, [path]);

  return null;
}

function isRoute(fn: any) {
  return key in fn;
}

export function MissingRoute() {
  return <div>Missing Path...</div>;
}

export function Outlet() {
  const Component = useContext(Context).Outlet;

  //console.log({ Outlet: Component });

  if (!Component) {
    return null;
  }

  return <Component />;
}

export function useRelative() {
  const { baseUrl } = useContext(Context);

  return useCallback(
    (...paths: string[]) => {
      history.push(pathJoin(baseUrl, ...paths));
    },
    [baseUrl]
  );
}

export default Router;

export { history };

/**
 * Type
 */
interface IContext {
  baseUrl: string;
  Outlet: null | (() => JSX.Element);
}

interface State {
  Element: (() => JSX.Element) | null;
  chunk: string;
  pattern: string;
}

interface Sync {
  state: State;
  parent: string;
}

type Route = {
  (): JSX.Element;
  use: (pattern: string, Component: FComponent) => void;
};

type FComponent = (props: unknown) => JSX.Element;
