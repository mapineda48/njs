import { Outlet, RouteObject } from "react-router-dom";
import Navbar from "./Navbar";
import useSize from "../../hook/useSize";
import ErrorPage from "./ErrorPage";
import SessionProvider from "../Api/Protected/Session";
import Portals from "Component/Portal";
import routes from "./routes";

const route: RouteObject = {
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage />,
  children: routes,
};

export function Root() {
  const ref = useSize((el) => {
    const rect = el.getBoundingClientRect();

    const maxHeight = window.innerHeight - rect.top;

    el.style.overflow = "auto";
    el.style.width = window.innerWidth + "px";
    el.style.height = maxHeight + "px";
  }, []);

  return (
    <SessionProvider>
      <Portals>
        <Navbar />
        <main ref={ref}>
          <Outlet />
        </main>
      </Portals>
    </SessionProvider>
  );
}

export default route;
