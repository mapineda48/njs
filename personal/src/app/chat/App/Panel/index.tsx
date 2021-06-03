import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import ShowMessage from "../../../components/Message";
import { useContext } from "app/chat/Context";
import style from "./index.module.scss";

import type { Props as Core } from "mapineda48-react/Popper";
import type { Message } from "app/service";

export default function Panel(props: Core) {
  const [state, chat, http] = useContext();

  return (
    <PanelPure
      {...props}
      messages={state.messages}
      onSendMessage={(message) =>
        http.addMessage({
          id: state.id,
          message,
        })
      }
      toggle={chat.toggle}
    />
  );
}

export function PanelPure(props: Props) {
  const [message, setMsg] = React.useState("");

  const msgs = React.useMemo(() => [...props.messages].reverse(), [
    props.messages,
  ]);

  return (
    <div className={style.root} ref={props.popper}>
      <div onClick={props.toggle} className={style.header}>
        <h4>Miguel is online!!!</h4>
      </div>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.messages}>
            {msgs.map((message, index) => (
              <ShowMessage key={index} right={message.writeByMiguel}>
                {message.content}
              </ShowMessage>
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
}

/**
 * Types
 */

interface Props extends Core {
  messages: Message[];
  toggle: () => void;
  onSendMessage: (message: Message) => void;
}
