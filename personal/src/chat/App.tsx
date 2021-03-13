import React from "react";
import Chat from "./Core";
import useState from "./state";
import socket from "service/socket";

export default function ChatWithState() {
  const [state, chat, http] = useState();

  React.useEffect(() => {
    http.isOnline(state.id);

    socket.guess(chat, state.id);
  }, [chat, http, state.id]);

  if (!state.isOnline) return null;

  return (
    <Chat
      open={state.open}
      messages={state.messages}
      unread={state.unread}
      toggle={chat.toggle}
      onSendMessage={(message) => http.addMessage({ id: state.id, message })}
    />
  );
}
