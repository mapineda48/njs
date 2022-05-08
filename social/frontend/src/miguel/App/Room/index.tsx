import clsx from "clsx";
import React from "react";
import { useSession } from "../Session";
import { useSelector } from "../Store/hook";
import style from "./index.module.scss";

export default function Room() {
  const room = useSelector(({ room }) => room.current);
  const state = useSelector(({ room }) => room.data[room.current]);
  const session = useSession();
  const [data, setData] = React.useState("");
  const ref = useSize<HTMLFormElement>();

  return (
    <form
      className="d-flex flex-column"
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!data) {
          return;
        }

        setData("");
        session.addMessage(room, data);
      }}
    >
      {!state?.messages?.length && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ flexGrow: 1 }}
        >
          <h1>Sin mensajes</h1>
        </div>
      )}
      {state?.messages?.length && (
        <ul className={`d-flex flex-column-reverse p-1 ${style.messages}`}>
          {[...state.messages].reverse().map((msg, index) => (
            <li
              key={index}
              className={clsx(["d-flex m-2", msg.right && "flex-row-reverse"])}
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
      <div className="d-flex justify-content-center align-items-center">
        <input
          className="form-control"
          type="text"
          placeholder="Input here…"
          readOnly={!Boolean(room)}
          value={data}
          onChange={({ currentTarget: { value } }) => setData(value)}
        />
        <button
          style={{ marginLeft: "1em", marginBottom: "0 !important" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

export function useSize<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const setSize = () => {
      const { top, left } = el.getBoundingClientRect();

      el.style.height = `calc(100vh - ${top}px)`;
      el.style.maxHeight = `calc(100vh - ${top}px)`;
      el.style.width = `calc(100vw - ${left}px)`;
      el.style.maxWidth = `calc(100vw - ${left}px)`;
    };

    setSize();

    window.addEventListener("resize", setSize);

    return () => window.removeEventListener("resize", setSize);
  });

  return ref;
}

export function isValidUrl(val: string) {
  const matchpattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(val);
}
