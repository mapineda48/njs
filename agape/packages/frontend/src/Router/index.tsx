import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import history from "history/browser";
import { usePathname as useRoute } from "./hook";
import { Routes, pathJoin, relative } from "./util";
import RouteExp from "./RouteExp";

export function MissingRoute() {
  return <div>Missing Path...</div>;
}

const key = Symbol();

const Context = {
  Outlet: createContext<ContextValue>(null),
  BaseUrl: createContext({ baseUrl: "", outlet: "" }),
};

export function Outlet() {
  const Component = useContext(Context.Outlet);

  if (!Component) {
    return null;
  }

  return <Component />;
}

export function useRelative() {
  const { baseUrl, outlet } = useContext(Context.BaseUrl);

  return useMemo(() => {
    const changeTo = (path: string) => {
      history.push(!baseUrl ? relative(path) : pathJoin(baseUrl, path));
    };

    const outletTo = (path: string) => {
      if (!outlet) {
        throw new Error("missing outlet path");
      }

      history.push(pathJoin(outlet, path));
    };

    return { changeTo, outletTo };
  }, [baseUrl, outlet]);
}

export function Router(
  baseUrl?: string,
  BaseUrl?: (props: any) => JSX.Element
): Route {
  const map = new Map();
  const routes: Routes = [];

  const relative: any[] = [];

  /**
   * Function Component
   */
  const Route: any = (props: { root: RouteExp }) => {
    const parent = useMemo(() => props.root ?? { pattern: "" }, [props.root]);
    console.log(`render in parent ${parent.pattern}`);

    const [current, setBaseUrl] = useRoute({
      routes,
      parent: parent?.startWith,
    });

    const Handler = map.get(current.pattern) ?? MissingRoute;

    const Element = useMemo(() => {
      if (!isRoute(Handler)) {
        return (props: any) => <Handler {...props} />;
      }

      const Route = Handler[key];
      const BaseUrl = Route.BaseUrl;
      const baseUrl: RouteExp = Route.baseUrl;

      const route: RouteExp = Handler.route;

      const [baseChunk] = current.chunk.match(route.startWith) ?? [];
      setBaseUrl(baseChunk);

      const pattern = pathJoin(parent.pattern, route.pattern);
      const root = new RouteExp(pattern);

      const [pathname = ""] = current.pathname.match(root.startWith) ?? [];

      const Current = (props: any) => (
        <Context.BaseUrl.Provider value={{ baseUrl: pathname, outlet: "" }}>
          <Route {...props} root={root} />
        </Context.BaseUrl.Provider>
      );

      if (!baseUrl || !BaseUrl) {
        return Current;
      }

      const basePath = pathname.replace(baseUrl.endWith, "");

      return () => (
        <Context.BaseUrl.Provider
          value={{ baseUrl: basePath, outlet: pathname }}
        >
          <Context.Outlet.Provider value={Current}>
            <BaseUrl />
          </Context.Outlet.Provider>
        </Context.BaseUrl.Provider>
      );
    }, [Handler, setBaseUrl, current.chunk, current.pathname, parent.pattern]);

    return <Element param={current.param} />;
  };

  /**
   * Cuando se anidan las rutas esto permite a la ruta superior saber cuales son las
   * subrutas disponibles
   */
  Object.defineProperty(Route, key, {
    configurable: false,
    get() {
      return routes.map((route) => {
        if (!baseUrl) {
          return route.pattern;
        }

        return pathJoin(baseUrl, route.pattern);
      });
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
     * si es ralativo, se guarda en el arreglo para que se agregue desde la
     * ruta raiz
     */
    if (pattern.includes("../")) {
      relative.push({ Handler, paths: [baseUrl, pattern] });

      return;
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
     * Por el momento estos patrones de ruta no son soportados,
     * aun no se ha probado todos los escenarios
     */
    if (
      pattern.endsWith(".*") ||
      !pattern.startsWith("/") ||
      pattern.endsWith("/")
    ) {
      throw new Error("unsupport pattern");
    }

    /**
     * Recuperando los patrones de la ruta unidades agregamos en esta ruta superior
     * los manejadores de para esta
     */
    const patterns = Handler[key].map((route: string) => {
      return pathJoin(pattern, route);
    });

    const route = new RouteExp(
      pathJoin(pattern, Handler.baseUrl?.pattern ?? "")
    );

    patterns.forEach((pattern: string) => {
      routes.push(new RouteExp(pattern));

      map.set(pattern, { route, [key]: Handler });
    });

    /**
     * Agregamos los rutas relativas de la ruta anidada con el patron actual
     * sera recuperadas por el metodo root y agregadas
     */
    Handler.relative.forEach(({ paths, Handler }: any) => {
      relative.push({
        paths: [pattern, ...paths],
        Handler,
      });
    });
  };

  Route.relative = relative;
  Route.BaseUrl = BaseUrl;
  Route.baseUrl = baseUrl ? new RouteExp(baseUrl) : undefined;

  /**
   * Indica que es la ruta raiz y carga todas las rutas relativas
   */
  Route.root = () => {
    const last = routes.pop();

    relative.forEach((route) => {
      const { paths, Handler } = route;
      const pattern = pathJoin("/", ...paths);

      Route.use(pattern, Handler);
    });

    if (!last) {
      return;
    }

    routes.push(last);
  };

  return Route;
}

export function Redirect(props: { relative?: boolean; to: string }) {
  const { baseUrl } = useContext(Context.BaseUrl);

  const path = pathJoin(baseUrl, props.to);

  console.log(`redirect to ${path}`);

  useEffect(() => {
    setTimeout(() => history.replace(path));
  }, [path]);

  return null;
}

function isRoute(fn: any) {
  return key in fn;
}

export default Router;

export { history };

/**
 * Type
 */
type ContextValue = ((props: any) => JSX.Element) | null;

type Route = {
  (): JSX.Element;
  use: (path: string, Component: (props: any) => JSX.Element) => void;
  root: () => void;
};
