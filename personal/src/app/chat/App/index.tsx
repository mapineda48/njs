import Panel from "./Panel";
import { IoIosChatboxes } from "react-icons/io";
import Provider, { useContext } from "../Context";
import createPopper from "mapineda-react/Popper";
import { View } from "./util";

import style from "./index.module.scss";

const Messages = createPopper(Panel);

Messages.options = {
  placement: "top-end",
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [-20, 10],
      },
    },
    {
      name: "check height",
      enabled: true,
      phase: "afterWrite",
      fn({ instance }) {
        const { popper } = instance.state.elements;

        const view = new View(popper);

        if (view.needResize()) {
          view.apply();
          return;
        }

        view.remove();
      },
    },
  ],
};

export function Open() {
  const [state, chat] = useContext();

  if (!state.isOnline) return null;

  return (
    <Messages enabled={state.open}>
      <div onClick={chat.toggle} className={style.open}>
        <IoIosChatboxes />
        {!!state.unread && <div className={style.unread}>{state.unread}</div>}
      </div>
    </Messages>
  );
}

export default function App() {
  return (
    <Provider>
      <Open />
    </Provider>
  );
}



/**
 * Types
 */
