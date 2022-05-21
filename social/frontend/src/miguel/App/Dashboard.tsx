import React from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { AiFillAlert } from "react-icons/ai";
import clsx from "clsx";
import { useHeight } from "./Layout";
import useWorker from "./useWorker";
import Sections, { JSXFunctional } from "./Section";

export function NavBar() {
  const enabledAlert = useWorker();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-sticky">
      <div className="container-fluid">
        <span className="navbar-brand">Social</span>
        <div className="mr-auto"></div>
        <div className="text-light btns-my">
          <span
            title="Activar Service Worker"
            onClick={() => enabledAlert().catch(console.error)}
          >
            <AiFillAlert />
          </span>
          <span title="Notificaciones" className="mx-2">
            <IoMdNotifications />
          </span>
          <span title="Salir" onClick={() => alert("Deberia Salir")}>
            <RiLogoutBoxRFill />
          </span>
        </div>
      </div>
    </nav>
  );
}

const Icons = Sections.map((Section) => Section.Icon);

export default function Dashboard() {
  const ref = useHeight<HTMLDivElement>();
  const [current, setCurrent] = React.useState(0);
  const [MainContent, setMainContent] = React.useState<JSXFunctional>(
    () => Sections[0].MainContent
  );

  return (
    <React.Fragment>
      <NavBar />
      <div
        ref={ref}
        className="d-flex flex-column flex-shrink-0 p-3 bg-dark app-left-bar"
      >
        <ul className="nav nav-pills flex-column mb-auto">
          {Icons.map((Icon, index) => (
            <li className="nav-item" key={index}>
              <span
                className={clsx(["nav-link", current === index && "active"])}
                onClick={() => {
                  if (current !== index) {
                    const { MainContent } = Sections[index];
                    setCurrent(index);
                    setMainContent(() => MainContent);
                    return;
                  }
                }}
              >
                <Icon />
              </span>
            </li>
          ))}
        </ul>
      </div>
      {MainContent && <MainContent />}
    </React.Fragment>
  );
}
