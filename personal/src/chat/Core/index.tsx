import React from "react";
import ReactDOM from "react-dom";
import { IoIosChatboxes } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import {
  createPopper,
  PropsContent as PropsPopper,
} from "mapineda-react/Popper";

import style from "./index.module.scss";

import type { Message }  from "service";

function ShowMessage(props: PropsMsg) {
  if (props.writeByMiguel) {
    return (
      <div className={style.miguel}>
        <div title={props.content}>{props.content}</div>
      </div>
    );
  }

  return (
    <div className={style.guess}>
      <div title={props.content}>{props.content}</div>
    </div>
  );
}

const Content = createPopper((props: PropsContent) => {
  const [message, setMsg] = React.useState("");

  const msgs = React.useMemo(() => [...props.messages].reverse(), [
    props.messages,
  ]);

  return (
    <div ref={props.popper} className={style.content}>
      <div onClick={props.toggle} className={style.header}>
        <h4>Miguel is online!!!</h4>
      </div>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.messages}>
            {msgs.map((message, index) => (
              <ShowMessage key={index} {...message} />
            ))}
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onSendMessage({ content: message });
            setMsg("");
          }}
        >
          <input
            placeholder="Write some message..."
            type="text"
            maxLength={60}
            value={message}
            onChange={({ currentTarget: { value } }) => setMsg(value)}
          />
          <button type="submit">
            <AiOutlineSend />
          </button>
        </form>
      </div>
    </div>
  );
});

Content.options = {
  placement: "top-end",
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [-20, 10],
      },
    },
  ],
};

export function Open({ open, ...props }: Props) {
  return (
    <Content portal enabled={open} {...props}>
      <div onClick={props.toggle} className={style.open}>
        <IoIosChatboxes />
        {!!props.unread && <div className={style.unread}>{props.unread}</div>}
      </div>
    </Content>
  );
}

export default function OpenInPortal(props: Props) {
  return ReactDOM.createPortal(<Open {...props} />, document.body);
}

/**
 * Types
 */

interface PropsMsg extends Message {}

export interface Props {
  open: boolean;
  messages: Message[];
  unread: number;
  toggle: () => void;
  onSendMessage: (message: Message) => void;
}

type Mixin<T, E> = T & E;

export interface PropsContent extends Omit<Mixin<Props, PropsPopper>, "open"> {}
