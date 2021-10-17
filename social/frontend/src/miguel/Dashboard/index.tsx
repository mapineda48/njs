import React from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import useAction from "mp48-react/useAction";
import { MIGUEL } from "@socket";
import ShowMessage from "../../components/Message";
import { useSession } from "../Session";
import useNotify from "../useWorker";
import { IMessage } from "../../components/Message";

import type { Message } from "@socket";

const action = {
  notify(state: State, notification: string): State {
    return { ...state, notification };
  },

  loading(state: State, loading = true): State {
    if (state.loading === loading) return state;

    return { ...state, loading };
  },

  showRoom(state: State, id: string): State {
    if (state.id === id) return state;

    return { ...state, id };
  },

  addMessage(state: State, payload: Message): State {
    const { room, writeBy, data } = payload;

    const message: IMessage = {
      right: writeBy !== MIGUEL,
      data,
    };

    if (!state.room[room]) {
      return {
        ...state,
        ids: [...state.ids, room],
        room: {
          ...state.room,
          [room]: [message],
        },
      };
    }

    return {
      ...state,
      room: {
        ...state.room,
        [room]: [message, ...state.room[room]],
      },
    };
  },

  setRooms(state: State, rooms: string[]): State {
    const [id] = rooms;

    return {
      ...state,
      id,
      ids: [...rooms],
      room: Object.fromEntries(rooms.map((room) => [room, []])),
    };
  },

  togglePanelRooms(state: State): State {
    return { ...state, open: !state.open };
  },

  message(state: State, message: string): State {
    return { ...state, message };
  },
};

export default function Dashboard() {
  const enabledNotifications = useNotify();

  const socket = useSession().socket;

  const [state, setState] = React.useState(initState);

  const dashboard = useAction(setState, action);

  React.useEffect(() => {
    const removeAdd = socket.onAddMessage(dashboard.addMessage);

    dashboard.loading();

    socket
      .fetchRooms()
      .then(dashboard.setRooms)
      .catch((err) => {
        console.error(err);
        dashboard.notify(err.message || "unknown");
      })
      .finally(() => dashboard.loading(false));

    return () => {
      removeAdd();
    };
  }, [dashboard, socket]);

  console.log(state);

  const Loading = React.useCallback(() => {
    if (!state.loading) return null;

    return <div className="loading">loading...</div>;
  }, [state.loading]);

  const Notification = React.useCallback(() => {
    if (!state.notification) return null;

    return (
      <div className="notification">
        <h4>{state.notification}</h4>
      </div>
    );
  }, [state.notification]);

  const Rooms = React.useCallback(() => {
    return (
      <ul>
        {state.ids.map((room, index) => {
          return (
            <li
              className={state.id === room ? "active" : undefined}
              onClick={() => dashboard.showRoom(room)}
              key={index}
            >
              {room}
            </li>
          );
        })}
      </ul>
    );
  }, [dashboard, state.ids, state.id]);

  const messages = state.room[state.id];

  const Messages = React.useCallback(() => {
    if (!messages) return null;

    if (!messages.length) return <div>Sin mensajes</div>;

    return (
      <ul className="messages">
        {messages.map(({ right, data }, index) => (
          <ShowMessage right={right} key={index}>
            {data}
          </ShowMessage>
        ))}
      </ul>
    );
  }, [messages]);

  const enabled = !state.loading && !state.notification;

  return (
    <div className="dashboard">
      <div className="head">
        <h2>Guests Online</h2>

        <div className="out">
          <div onClick={() => enabledNotifications().catch(console.error)}>
            <MdNotifications />
          </div>
          <div>
            <RiLogoutBoxRFill />
          </div>
        </div>
      </div>
      <Loading />
      <Notification />
      {enabled && (
        <div className="body">
          {state.open && (
            <div className="rooms">
              <Rooms />
            </div>
          )}
          <div className="guest">
            <div className="bttn-toggle" onClick={dashboard.togglePanelRooms}>
              {state.open ? (
                <FaArrowAltCircleLeft />
              ) : (
                <FaArrowAltCircleRight />
              )}
            </div>

            <div className="head">
              <h5>{state.id}</h5>
            </div>
            <div className="body">
              <Messages />
            </div>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();

                if (!state.message) return;

                socket.addMessage(state.id, state.message);
                dashboard.message("");
              }}
            >
              <input
                type="text"
                className="form-control"
                value={state.message}
                onChange={({ currentTarget: { value } }) =>
                  dashboard.message(value)
                }
              />
              <input className="btn btn-primary" type="submit" value="Enviar" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function initState(): State {
  return {
    message: "",
    loading: false,
    notification: "",
    open: true,
    id: "",
    ids: [],
    room: {},
  };
}

/**
 * Types
 */
interface State {
  message: string;
  loading: boolean;
  notification: string;
  open: boolean;
  id: string;
  ids: string[];
  room: { [K: string]: IMessage[] };
}
