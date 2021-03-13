import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { GoRepoForcePush } from "react-icons/go";
import { useContext } from "admin/Context";
import { FORCE_OPEN } from "production";

import type { Message, PostMessage } from "production";

export function ChatPanel(props: Props) {
  const { room, current, onChange, onSend } = props;

  const [message, setMsg] = React.useState("");

  const [open, setOpen] = React.useState(true);

  const toggle = React.useCallback(() => setOpen((state) => !state), [setOpen]);

  const messages = React.useMemo(() => {
    const messages = room[current] ? [...room[current]] : [];

    return messages.reverse();
  }, [room, current]);

  const Chats = (
    <div className="chats">
      <ul className="keys">
        {props.keys.map((key, index) => {
          return (
            <li
              className={key === current ? "active" : undefined}
              onClick={() => onChange(key)}
              key={index}
            >
              {`${index + 1}. `}
              {key}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="chat">
      {open && Chats}
      <div className="content">
        <div className="header">
          <div onClick={toggle} className="toggle">
            {open ? <FaArrowAltCircleLeft /> : <FaArrowAltCircleRight />}
          </div>
          <h3>{current}</h3>
          <div
            className="open"
            title="force open chat guess"
            onClick={() => {
              onSend({
                id: current,
                message: { writeByMiguel: true, content: FORCE_OPEN },
              });
            }}
          >
            <GoRepoForcePush />
          </div>
        </div>
        <div className="messages">
          <ul className="data">
            {messages.map(({ content, writeByMiguel }, index) => (
              <li className={writeByMiguel ? "miguel" : "guess"} key={index}>
                <div>{content}</div>
              </li>
            ))}
          </ul>
        </div>
        <form
          className="footer"
          onSubmit={(event) => {
            event.preventDefault();
            if (!message || !current) return;
            setMsg("");
            onSend({
              id: current,
              message: { writeByMiguel: true, content: message },
            });
          }}
        >
          <input
            value={message}
            onChange={({ currentTarget: { value } }) => setMsg(value)}
            required
            placeholder="Ingresa un mensaje miguel"
            type="text"
            className="form-control"
          />
          <input
            disabled={!current}
            className="btn btn-success"
            type="submit"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
}

export default function ChatPanelInContext() {
  const [state, admin, http] = useContext();

  const keys = Object.keys(state.chat.room);

  return (
    <ChatPanel
      current={state.chat.current}
      keys={keys}
      room={state.chat.room}
      onChange={admin.changeRoom}
      onSend={http.addMessage}
    />
  );
}

/**
 * Types
 */
export interface Props {
  current: string;
  keys: string[];
  room: Room;
  onSend: (data: PostMessage) => void;
  onChange: (key: string) => void;
}

export type Room = {
  [K: string]: Message[];
};

export type { Message };
