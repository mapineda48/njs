import clsx from "clsx";
import { Outlet, useRoute } from "Router";
import useSize from "hook/useSize";

const menuWidth = 250;

export default function MenuSetting() {
  const ref = useSize<HTMLDivElement>(stickySideMenu);

  return (
    <div className="h-100 w-100">
      <div
        ref={ref}
        className="flex-column flex-shrink-0 p-3 bg-light"
        style={{
          width: menuWidth,
          position: "fixed",
        }}
      >
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <ChangeTo path="document-type">
              <svg className="bi me-2" width={16} height={16}>
                <use xlinkHref="#home" />
              </svg>
              Tipos documentos
            </ChangeTo>
          </li>
          <li>
            <ChangeTo path="user">
              <svg className="bi me-2" width={16} height={16}>
                <use xlinkHref="#speedometer2" />
              </svg>
              Usuarios
            </ChangeTo>
          </li>
        </ul>
        <hr />
      </div>

      <div style={{ marginLeft: menuWidth }}>
        <Outlet />
      </div>
    </div>
  );
}

export function ChangeTo(props: { path: string; children: ChildSpan }) {
  const { changeTo, inRoute } = useRoute(props.path);

  return (
    <span
      onClick={changeTo}
      className={clsx(["nav-link cursor-pointer", (inRoute && "active") || "link-dark"])}
      aria-current={inRoute ? "page" : undefined}
    >
      {props.children}
    </span>
  );
}

function stickySideMenu(el: HTMLDivElement) {
  //const rect = el?.parentElement?.getBoundingClientRect();
  // const rect =
  //   el?.parentElement?.parentElement?.previousElementSibling?.getBoundingClientRect();

  const rect = document
    .getElementsByTagName("header")
    .item(0)
    ?.getBoundingClientRect();

  if (!rect) {
    return;
  }

  console.log(rect);

  el.style.top = rect.height + "px";
  el.style.height = window.innerHeight - rect.height + "px";
}

/**
 * Types
 */
type ChildSpan = JSX.IntrinsicElements["span"]["children"];
