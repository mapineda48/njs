import React from "react";
import { FaTwitter, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import useState from "./state";
import Iframe from "./Iframe";
import Chat from "./Chat";
import { createGuest } from "../../socket/guest";
import { MIGUEL } from "@socket";
import { root } from "../../common";

const guest = createGuest();

export default function App() {
  const [state, chat] = useState();

  React.useEffect(() => {
    const removeAdd = guest.onAddMessage(({ data, writeBy }) => {
      chat.addMessage({
        data,
        right: writeBy === MIGUEL,
      });
    });

    const removeOnline = guest.onIsOnlineMiguel(chat.setOnline);

    const removeError = guest.onError((data) => console.error(data));

    return () => {
      removeAdd();
      removeOnline();
      removeError();
    };
  }, []);

  React.useEffect(() => {
    if (!state.online) return;

    root.classList.add("enabled-chat");

    return () => {
      root.classList.remove("enabled-chat");
    };
  }, [state.online]);

  return (
    <Iframe open={state.open}>
      <li className="twitter shadow-one">
        <a
          href="https://twitter.com/MiguelPinedaTec"
          title="Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </li>
      <li className="facebook shadow-one">
        <a
          href="https://www.facebook.com/a.pinedavegamiguel"
          title="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
      </li>{" "}
      <li className="github shadow-one">
        <a
          href="https://github.com/mapineda48"
          title="Github"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </li>
      <li className="linkedin shadow-one">
        <a
          href="https://co.linkedin.com/in/apinedavegamiguel"
          title="Github"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </li>
      {state.online && (
        <li className="button-chat shadow-one" onClick={chat.toggle}>
          <a title="Miguel is Online">
            <AiFillWechat />
          </a>
          {!!state.unread && <div className="unread">{state.unread}</div>}
          {state.open && (
            <Chat messages={state.messages} onSend={guest.addMessage} />
          )}
        </li>
      )}
    </Iframe>
  );
}
