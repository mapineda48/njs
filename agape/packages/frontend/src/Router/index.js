import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  Sync: createContext(null),
};

const State = createContext({
  baseUrl: "",
  startWith: "",
  getChunckPathname() {
    return history.location.search;
  },
  sync() {
    throw new Error("ups...");
  },
});

export function Router(BaseUrl) {
  const map = new Map();
  const routes = [];

  const sync2 = (setState) => {
    return ({ current, parent }, force = false) => {
      const pathname = parent.getChunckPathname();

      const match = routes.find(({ pattern }) => pattern.test(pathname));

      if (!match) {
        throw Error("missing match route");
      }

      const { Component } = match;

    };
  };

  const sync = ({ state, parent: nested }, force = false) => {
    const root = new RouteExp(nested);
    const pathname = history.location.pathname.replace(root.startWith, "");

    const match = routes.find((route) => route.test(pathname));

    const Match = map.get(match?.pattern) ?? MissingRoute;
    const isNested = isRoute(Match);

    const pattern = !isNested ? pathname : Match.pattern;

    if (
      state.pattern === pattern &&
      pathname.startsWith(state.chunk) &&
      !force
    ) {
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

    const force = useCallback(() => setState(sync(ref.current, true)), []);

    if (!state.Element) {
      return null;
    }

    return (
      <Context.Sync.Provider value={force}>
        <Context.BaseUrl.Provider value={state.baseUrl}>
          <state.Element />
        </Context.BaseUrl.Provider>
      </Context.Sync.Provider>
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

  Route.lazy = (pattern, dynamicImport) => {
    const matchAll = pattern + ".*";

    const route = new RouteExp(matchAll);

    routes.push(route);

    const Lazy = () => {
      const sync = useSync();

      useEffect(() => {
        let refresh = sync;

        dynamicImport()
          .then((mod) => {
            routes.slice(routes.indexOf(route), 1);
            map.delete(route);

            Route.use(pattern, mod.default);

            console.log(mod);

            if (refresh) {
              refresh();
            }
          })
          .catch(console.error);

        return () => {
          refresh = null;
        };
      }, [sync]);

      return "Loading...";
    };

    map.set(matchAll, Lazy);
  };

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

export function useSync() {
  return useContext(Context.Sync);
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

export function useRoute(...paths) {
  const [state, setState] = useState(false);
  const baseUrl = useContext(Context.BaseUrl);
  const ref = useRef(state);
  ref.current = state;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const url = useMemo(() => pathJoin(baseUrl, ...paths), [baseUrl, ...paths]);

  const changeTo = useCallback(() => {
    if (ref.current) {
      return;
    }

    history.push(url);
  }, [url]);

  const inRoute = useCallback(() => {
    const state = history.location.pathname.startsWith(url);

    if (state === ref.current) {
      return;
    }

    setState(state);
  }, [url]);

  useEffect(() => {
    inRoute();

    return history.listen(inRoute);
  }, [inRoute]);

  return { changeTo, inRoute: state };
}

export default Router;

export { history };
