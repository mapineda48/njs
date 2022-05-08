import React from "react";
import { SiGooglemessages } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { AiFillAlert } from "react-icons/ai";
import clsx from "clsx";
import { LeftBar, Main, useLayout, useLeftMenu } from "./Layout";
import { useDispatch, useSelector } from "./Store/hook";
import { useSession } from "./Session";
import Room from "./Room";

import type { IconType } from "react-icons";
import useWorker from "./useWorker";

export function NavBar() {
  const session = useSession();
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

const Sections: Section[] = [];

Sections.push({
  Icon: SiGooglemessages,
  MenuLeft() {
    const rooms = useSelector((state) => state.room.availables);
    const current = useSelector((state) => state.room.current);
    const action = useDispatch().room;

    const ref = useLeftMenu<HTMLUListElement>();

    return (
      <ul
        ref={ref}
        style={{ display: "none" }}
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      >
        <ul className="nav nav-pills flex-column mb-auto">
          {rooms.map((room) => {
            return (
              <li
                className="nav-item"
                onClick={
                  room === current ? undefined : () => action.setRoom(room)
                }
              >
                <span
                  className={clsx(["nav-link", room === current && "active"])}
                  aria-current="page"
                >
                  <svg className="bi me-2" width={16} height={16}>
                    <use xlinkHref="#home" />
                  </svg>
                  {room}
                </span>
              </li>
            );
          })}
        </ul>
      </ul>
    );
  },
  MainContent() {
    return <Room />;
  },
});

Sections.push({
  Icon: BiUserCircle,
  MenuLeft: null,
  MainContent() {
    return <div>Users</div>;
  },
});

const Icons = Sections.map((Section) => Section.Icon);

export default function Dashboard() {
  const ref = useLayout();
  const [current, setCurrent] = React.useState(0);
  const [MenuLeft, setMenuLeft] = React.useState<JSXElement>(null);
  const [MainContent, setMainContent] = React.useState<JSXElement>(
    () => Sections[0].MainContent
  );

  React.useEffect(() => {
    setTimeout(() => {
      console.log(ref);
    }, 2000);
  }, [ref]);

  return (
    <React.Fragment>
      <NavBar />
      <LeftBar className="d-flex flex-column flex-shrink-0 p-3 bg-dark">
        <ul className="nav nav-pills flex-column mb-auto">
          {Icons.map((Icon, index) => (
            <li className="nav-item" key={index}>
              <span
                className={clsx(["nav-link", current === index && "active"])}
                onClick={() => {
                  if (current !== index) {
                    const { MainContent } = Sections[index];
                    setCurrent(index);
                    setMenuLeft(null);
                    setMainContent(() => MainContent);
                    return;
                  }

                  if (MenuLeft) {
                    setMenuLeft(null);
                    return;
                  }

                  const Menu = Sections[current].MenuLeft;

                  if (Menu) {
                    setMenuLeft(() => Menu);
                  }
                }}
              >
                <Icon />
              </span>
            </li>
          ))}
        </ul>
      </LeftBar>
      {MenuLeft && <MenuLeft />}
      <Main>{MainContent && <MainContent />}</Main>
    </React.Fragment>
  );
}

/**
 * Types
 */

type JSXElement = (() => JSX.Element | null) | null;

type Section = {
  Icon: IconType;
  MenuLeft: JSXElement;
  MainContent: JSXElement;
};
