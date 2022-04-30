import React from "react";
import { FaTwitter, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import { root } from "mp48-react/render";
import useState from "./state";
import Chat from "./Chat";
import { useSession } from "./Session";
import iframe from "../iframe";

export default function App() {
  const session = useSession();

  const [state, chat] = useState();

  React.useEffect(() => {
    iframe.onConnect((origin, app) => {
      chat.setIframe({ origin, app });
    });
  }, []);

  React.useEffect(() => {
    if (state.isSync || state.isLoading) {
      return;
    }

    chat.isLoading();

    session
      .getMessages(state.nextPage)
      .then((messages) => {
        chat.sync();
        chat.loadMessages(messages);
      })
      .catch((err) => {
        console.log(err);
        chat.isLoading(false);
      });
  }, [session, state.isLoading, state.isSync, state.nextPage]);

  React.useMemo(() => {
    if (!state.online) return;

    root.classList.add("enabled-chat");

    return () => {
      root.classList.remove("enabled-chat");
    };
  }, [state.online]);

  React.useMemo(() => {
    if (!state.open) {
      if (state.iframe) {
        iframe.close();
      }

      session.appNotify("chat close");

      return;
    }

    session.appNotify("chat open");

    if (!state.iframe) {
      return;
    }

    iframe.open();
    session.iframe(state.iframe.origin, state.iframe.app);
  }, [session, state.iframe, state.open]);

  React.useEffect(() => {
    const removeAdd = session.onAddMessage(chat.addMessage);

    const removeOnline = session.onMiguelOnline(chat.setOnline);

    const removeError = session.onError((data) => console.error(data));

    const removeForceOpen = session.onForceOpen(() => {
      chat.openChat();
    });

    document.title = "Welcome Guest";

    return () => {
      removeAdd();
      removeOnline();
      removeError();
      removeForceOpen();
    };
  }, [session]);

  return (
    <React.Fragment>
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
          href="https://www.facebook.com/mapined48"
          title="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
      </li>
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
          <div title="Miguel is Online">
            <AiFillWechat />
          </div>
          {!!state.unread && <div className="unread">{state.unread}</div>}
          {state.open && (
            <Chat
              inIframe={Boolean(state.iframe)}
              messages={state.messages}
              onToggle={chat.toggle}
              onSend={session.addMessage}
              onScroll={
                state.isLoadAllMessages || state.isLoading
                  ? undefined
                  : ({ currentTarget }) => {
                      const { scrollTop, scrollHeight, clientHeight } =
                        currentTarget;

                      const total = -1 * (scrollTop - clientHeight);

                      const limitToFetch = scrollHeight / 5;

                      const available = scrollHeight - total;

                      if (limitToFetch < available) {
                        return;
                      }

                      chat.isLoading();

                      session
                        .getMessages(state.nextPage)
                        .then((messages) => {
                          chat.loadMessages(messages);
                        })
                        .catch(console.error);
                    }
              }
            />
          )}
        </li>
      )}
    </React.Fragment>
  );
}
