import clsx from "clsx";
import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import ShowMessage, { IMessage as Message } from "../../../components/Message";
import Portal from "../../../components/Portal";
import { inIframe } from "../Iframe";

export default function ChatGuess(props: Props) {
  const [message, setMessage] = React.useState("");

  return (
    <Portal>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(["chat", inIframe && "chat-center"])}
      >
        <div className="header" onClick={props.onToggle}>
          <h5>Miguel is online!!!</h5>
        </div>
        <div className="main">
          <div className="container">
            <div className="messages">
              {props.messages.map((message, index) => (
                <ShowMessage key={index} right={message.right}>
                  {message.data}
                </ShowMessage>
              ))}
            </div>
          </div>
        </div>
        <div className="footer">
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (!message) return;

              props.onSend(message);
              setMessage("");
            }}
          >
            <input
              placeholder="Write some message..."
              type="text"
              maxLength={60}
              value={message}
              onChange={({ currentTarget: { value } }) => setMessage(value)}
            />
            <button type="submit">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      </div>
    </Portal>
  );
}

/**
 * Types
 */
export interface Props {
  center?: boolean;
  onToggle?: () => void;
  messages: Message[];
  onSend: (message: string) => void;
}
