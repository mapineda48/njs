import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { BiWindowOpen } from "react-icons/bi";
import ShowMessage from "app/components/Message";
import { FORCE_OPEN } from "app/service";
import { useContext } from "app/admin/Context";
import style from "./index.module.scss";

import type { DataMessage, Message } from "app/service";
import type { Room } from "app/admin/state";
import clsx from "clsx";

export default function Chat() {
  const [state, chat, http] = useContext();

  return (
    <ChatPure
      current={state.chat.current}
      messages={state.chat.messages[state.chat.current] || []}
      room={state.chat.room}
      onChangeRoom={chat.changeRoom}
      onSendMessage={http.addMessage}
    />
  );
}

export function ChatPure(props: Props) {
  const [message, setMsg] = React.useState("");

  const [open, setOpen] = React.useState(true);

  const toggle = React.useCallback(() => setOpen((state) => !state), [setOpen]);

  const rooms = React.useMemo(() => Object.values(props.room), [props.room]);

  const messages = React.useMemo(() => [...props.messages].reverse(), [
    props.messages,
  ]);

  const Rooms = (
    <div className={style.rooms}>
      <ol>
        {rooms.map((room, index) => (
          <li
            key={index}
            onClick={() => {
              props.onChangeRoom(room.id);
            }}
            title={room.id}
            className={clsx([room.id === props.current && style.active])}
          >
            <p>{room.id}</p>
            <span>{room.pathname}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <div className={style.root}>
      {open && Rooms}
      <div className={style.room}>
        <div className={style.toggle}>
          <div onClick={toggle}>
            {open ? <FaArrowAltCircleLeft /> : <FaArrowAltCircleRight />}
          </div>
        </div>
        <div className={style.header}>
          <h3>{props.current || "Chat"}</h3>
        </div>
        <div className={style.messages}>
          {messages.map((message, index) => (
            <ShowMessage key={index} right={!message.writeByMiguel}>
              {message.content}
            </ShowMessage>
          ))}
        </div>
        <form
          className={style.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (!message) return;
            props.onSendMessage({
              id: props.current,
              message: { writeByMiguel: true, content: message },
            });
            setMsg("");
          }}
        >
          <input
            disabled={!props.current}
            value={message}
            onChange={({ currentTarget: { value } }) => setMsg(value)}
            placeholder="Write some message miguel..."
            type="text"
            className="forms"
          />
          <button
            disabled={!props.current}
            onClick={() =>
              props.onSendMessage({
                id: props.current,
                message: { writeByMiguel: true, content: FORCE_OPEN },
              })
            }
            type="button"
            className="btn btn-secondary"
          >
            <BiWindowOpen />
          </button>
          <button
            disabled={!props.current}
            className="btn btn-primary"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Types
 */
interface Props {
  current: string;
  room: Room;
  messages: Message[];
  onChangeRoom: (id: string) => void;
  onSendMessage: (data: DataMessage) => void;
}
