import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import history from "history/browser";
import { extractParams, pathJoin } from "./util";
import RouteExp from "./RouteExp";

const key = Symbol();

const initState = {};
const Context = {
  BaseUrl: createContext(""),
  Outlet: createContext(null),
};

export function Router(BaseUrl) {
  const map = new Map();
  const routes = [];

  const sync = ({ state, parent: nested }) => {
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

    return {
      chunk,
      pattern,
      baseUrl: parent,
      Element,
    };
  };

  /**
   * Function Component
   */
  let Route = () => {
    const parent = useContext(Context.BaseUrl);

    const [state, setState] = useState(
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

    if (!state.Element) {
      return null;
    }

    return (
      <Context.BaseUrl.Provider value={state.baseUrl}>
        <state.Element />
      </Context.BaseUrl.Provider>
    );
  };

  if (BaseUrl) {
    const Element = Route;

    Route = () => (
      <Context.Outlet.Provider value={Element}>
        <BaseUrl />
      </Context.Outlet.Provider>
    );
  }

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
  Route.use = (pattern, Handler) => {
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

    const patterns = Handler[key].map((route) => {
      return pathJoin(pattern, route);
    });

    patterns.forEach((route) => {
      routes.push(new RouteExp(route));

      map.set(route, { pattern, [key]: Handler });
    });
  };

  return Route;
}

export function Redirect(props) {
  const baseUrl = useContext(Context.BaseUrl);

  //console.log({ props, baseUrl });

  const path = pathJoin(baseUrl, props.to);

  //console.log(`redirect to ${path}`);

  useEffect(() => {
    setTimeout(() => history.replace(path));
  }, [path]);

  return null;
}

function isRoute(fn) {
  return key in fn;
}

export function MissingRoute() {
  return <div>Missing Path...</div>;
}

export function Outlet() {
  const Component = useContext(Context.Outlet);

  if (!Component) {
    return null;
  }

  return <Component />;
}

export function useRelative() {
  const baseUrl = useContext(Context.BaseUrl);

  return useCallback(
    (...paths) => {
      history.push(pathJoin(baseUrl, ...paths));
    },
    [baseUrl]
  );
}

export default Router;

export { history };
