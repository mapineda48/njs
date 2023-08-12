import { createContext, useContext, useMemo } from "react";
import { usePathname as useRoute } from "./hook";
import { Routes, history } from "./util";
import RouteExp from "./RouteExp";

export function MissingPath() {
  return <div>Missing Path...</div>;
}

const key = Symbol();

const Context = createContext<ContextValue>(null);

export function Router(): Route {
  const map = new Map();
  const routes: Routes = [];

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

    const { Route, BaseUrl } = useMemo(() => {
      const Component = map.get(current.pattern) ?? map.get("*") ?? MissingPath;

      if (!isRoute(Component)) {
        const Route = () => <Component param={current.param} />;

        return { Route };
      }

      const route: RouteExp = Component.baseUrl;
      const Route = Component[key];

      const [baseUrl] = current.chunk.match(route.startWith) ?? [];
      setBaseUrl(baseUrl);

      const root = new RouteExp(parent.pattern + route.pattern);
      const Nested = () => <Route root={root} />;

      const BaseUrl = map.get(route.pattern);

      return { Route: Nested, BaseUrl };
    }, [current, setBaseUrl, parent]);

    if (!BaseUrl) {
      return <Route />;
    }

    return (
      <Context.Provider value={Route}>
        <BaseUrl />
      </Context.Provider>
    );
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
  Route.use = (pattern: string, fn: any) => {
    if (typeof fn !== "function") {
      throw new Error("Only support function components");
    }

    const baseUrl = new RouteExp(pattern);

    if (!isRoute(fn)) {
      routes.push(baseUrl);

      map.set(pattern, fn);
      return;
    }

    const patterns = fn[key].map((route: string) => pattern + route);

    patterns.forEach((pattern: string) => {
      routes.push(new RouteExp(pattern));

      map.set(pattern, { baseUrl, [key]: fn });
    });
  };

  return Route;
}

export function NestedRouter() {
  const Component = useContext(Context);

  if (!Component) {
    return Component;
  }

  return <Component />;
}

function isRoute(fn: any) {
  return key in fn;
}

export { history };

/**
 * Type
 */
type ContextValue = (() => JSX.Element) | null;

type Route = {
  (): JSX.Element;
  use: (path: string, Component: (props: any) => JSX.Element) => void;
};
