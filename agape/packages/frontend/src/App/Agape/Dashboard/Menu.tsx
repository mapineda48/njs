import { useSession } from "App/Agape/Session";
import { Outlet, useRelative, useRoute } from "Router";
import clsx from "clsx";

export default function Menu() {
  const { user, logout } = useSession();
  const changeTo = useRelative();

  return (
    <>
      <header className="p-3 border-bottom bg-dark agape-nav">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="32"
                fill="currentColor"
                className="bi bi-bootstrap-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" />
                <path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396H5.062z" />
              </svg>
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <ChangeTo path="home">Inicio</ChangeTo>
              </li>
              <li>
                <ChangeTo path="inventory">Inventario</ChangeTo>
              </li>
              <li>
                <ChangeTo path="customer">Clientes</ChangeTo>
              </li>
              <li>
                <ChangeTo path="setting">Configuración</ChangeTo>
              </li>
            </ul>
            <div className="dropdown text-end cursor-pointer">
              <span
                className="d-block link-light text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="mx-2">{user.fullName}</span>
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </span>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <span className="dropdown-item">Settings</span>
                </li>
                <li>
                  <span className="dropdown-item">Profile</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <span onClick={logout} className="dropdown-item">
                    Sign out
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main className="h-100">
        <Outlet />
      </main>
    </>
  );
}

export function ChangeTo(props: { path: string; children: ChildSpan }) {
  const { changeTo, inRoute } = useRoute(props.path);

  return (
    <span
      onClick={changeTo}
      className={clsx([
        "nav-link px-2 cursor-pointer",
        (inRoute && "active") || "link-light",
      ])}
      aria-current={inRoute ? "page" : undefined}
    >
      {props.children}
    </span>
  );
}

/**
 * Types
 */
type ChildSpan = JSX.IntrinsicElements["span"]["children"];
