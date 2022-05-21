import clsx from "clsx";
import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { useHeight, useSize } from "../../Layout";
import { useSession } from "../../Session";
import { useDispatch, useSelector } from "../../Store/hook";
import style from "./index.module.scss";

export function Rooms(props: { open: boolean; onToggle: () => void }) {
  const rooms = useSelector((state) => state.room.availables);
  const current = useSelector((state) => state.room.current);
  const action = useDispatch().room;
  const ref = useHeight<HTMLDivElement>();

  const { open, onToggle } = props;

  const existsRooms = Boolean(rooms.length);

  const canOpen = open && existsRooms;

  return (
    <div
      ref={ref}
      className={clsx([
        `d-flex flex-column flex-shrink-0 ${style.rooms}`,
        open ? style.roomsOpen : style.roomsClose,
      ])}
      onClick={existsRooms ? onToggle : undefined}
    >
      {!canOpen && (
        <div
          style={{ height: "100%" }}
          className="d-flex flex column bg-secondary text-light justify-content-center align-items-center"
        >
          <BiRightArrow style={{ cursor: "pointer", position: "sticky" }} />
        </div>
      )}
      {canOpen && (
        <ul className="nav nav-pills flex-column mb-auto bg-secondary text-light p-2">
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
      )}
    </div>
  );
}

export default function Room() {
  const current = useSelector(({ room }) => room.current);
  const state = useSelector(({ room }) => room.data[room.current]);
  const session = useSession();
  const action = useDispatch();
  const ref = useSize<HTMLFormElement>();
  const [data, setData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const toggle = React.useCallback(() => setOpen((open) => !open), []);

  const haveMessages = Boolean(state?.messages?.length);

  const enabledScrollFetch = state?.canFetch && !state?.loading;

  const page = state?.page ?? 0;

  const { room } = action;

  React.useEffect(() => {
    room.syncRoom(current);
  }, [current, room]);

  const onScroll = React.useMemo(() => {
    if (!enabledScrollFetch) {
      return;
    }

    return function onScroll({ currentTarget }: ScrollEvt) {
      const { scrollTop, scrollHeight, clientHeight } = currentTarget;

      const total = -1 * (scrollTop - clientHeight);

      const limitToFetch = scrollHeight / 5;

      const available = scrollHeight - total;

      if (limitToFetch < available) {
        return;
      }

      action.room.fetchMessages(current, page);
    };
  }, [enabledScrollFetch, action.room, current, page]);

  return (
    <form
      className={`d-flex flex-column app-main ${style._}`}
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!data) {
          return;
        }

        setData("");
        session.addMessage(current, data);
      }}
    >
      <Rooms open={open} onToggle={toggle} />
      <main
        className={clsx([
          "d-flex flex-column",
          open ? style.msgsOpen : style.msgsClose,
        ])}
      >
        <header className="d-flex justify-content-center align-items-center bg-secondary text-light">
          <h2>{!current ? "Sin Visitante" : current}</h2>
        </header>
        {!haveMessages && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flexGrow: 1 }}
          >
            <h1>Sin mensajes</h1>
          </div>
        )}
        {haveMessages && (
          <ul
            className={`d-flex flex-column-reverse p-1 ${style.messages}`}
            onScroll={onScroll}
          >
            {state.messages.map((msg, index) => (
              <li
                key={index}
                className={clsx([
                  "d-flex m-2",
                  msg.right && "flex-row-reverse",
                ])}
              >
                <span className="bg-light rounded border p-2">
                  {isValidUrl(msg.data) ? (
                    <a href={msg.data} target="_blank" rel="noreferrer">
                      {msg.data}
                    </a>
                  ) : (
                    msg.data
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
        <footer className="d-flex justify-content-center align-items-center">
          <input
            className="form-control"
            type="text"
            placeholder="Input here…"
            readOnly={!Boolean(current)}
            value={data}
            onChange={({ currentTarget: { value } }) => setData(value)}
          />
          <button type="submit" className="btn btn-primary mb-2">
            Enviar
          </button>
        </footer>
      </main>
    </form>
  );
}

export function isValidUrl(val: string) {
  const matchpattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(val);
}

/**
 * Types
 */
type ScrollEvt = React.UIEvent<HTMLUListElement, UIEvent>;
