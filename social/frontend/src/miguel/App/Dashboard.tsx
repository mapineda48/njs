import React from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { initAction } from "mp48-react/useState";
import { AMOUNT_PAGE } from "@socket/type";
import ShowMessage from "../../components/Message";
import { useSession } from "./Session";
import useNotify from "./useWorker";
import { IMessage } from "../../components/Message";

const useState = initAction({
  notify(state: State, notification: string): State {
    return { ...state, notification };
  },

  loading(state: State, loading = true): State {
    if (state.loading === loading) return state;

    return { ...state, loading };
  },

  removeRoom(state: State, room: string): State {
    if (!state.data[room]) {
      return state;
    }

    const data = { ...state.data };

    delete data[room];

    return {
      ...state,
      room: state.room !== room ? state.room : "",
      rooms: state.rooms.filter((r) => r !== room),
      data: { ...data },
    };
  },

  addRooms(state: State, rooms: string[]): State {
    const _rooms = rooms.filter((room) => !state.rooms.includes(room));

    if (!_rooms.length) {
      return state;
    }

    return {
      ...state,
      room: state.room ? state.room : _rooms[0],
      data: {
        ...state.data,
        ...Object.fromEntries(_rooms.map((room) => [room, initRoom()])),
      },
      rooms: [...state.rooms, ..._rooms],
    };
  },

  addRoom(state: State, room: string): State {
    if (state.data[room]) {
      return state;
    }

    return {
      ...state,
      room: state.room ? state.room : room,
      rooms: [...state.rooms, room],
      data: {
        ...state.data,
        [room]: initRoom(),
      },
    };
  },

  showRoom(state: State, room: string): State {
    if (state.room === room) return state;

    return { ...state, room };
  },

  loadingRoom(state: State, isLoading = true): State {
    const { room, data } = state;

    if (data.isLoading) {
      return state;
    }

    return {
      ...state,
      data: {
        ...data,
        [room]: {
          ...data[room],
          isLoading,
        },
      },
    };
  },

  loadMessages(state: State, room: string, messages: IMessage[]): State {
    const data = state.data[room];

    if (!data) {
      console.error({ missRoom: room });

      return state;
    }

    const canFetchMsgs = messages.length >= AMOUNT_PAGE;

    return {
      ...state,
      data: {
        ...state.data,
        [room]: {
          ...data,
          canFetchMsgs,
          page: data.page + 1,
          isLoading: false,
          messages: [...data.messages, ...messages],
        },
      },
    };
  },

  addMessage(state: State, room: string, message: IMessage): State {
    if (!state.data[room]) {
      console.error({ missRoom: room });

      return state;
    }

    const data = state.data[room];

    const open = room === state.room;

    const unread = !open ? data.unread + 1 : 0;

    return {
      ...state,
      data: {
        ...state.data,
        [room]: {
          ...data,
          unread,
          messages: [message, ...data.messages],
        },
      },
    };
  },

  togglePanelRooms(state: State): State {
    return { ...state, open: !state.open };
  },

  writeMessage(state: State, message: string): State {
    return { ...state, message };
  },
});

export default function Dashboard() {
  const enabledNotifications = useNotify();

  const session = useSession();

  const [state, , dashboard] = useState(initState);

  React.useEffect(() => {
    const removeAdd = session.onAddMessage(dashboard.addMessage);

    const removeGuestOnline = session.onGuestOnline((room, isOnline) => {
      if (isOnline) {
        dashboard.addRoom(room);
        return;
      }

      dashboard.removeRoom(room);
    });

    session.ready().then(dashboard.addRooms).catch(console.error);

    document.title = "Dashboard";
    return () => {
      removeAdd();
      removeGuestOnline();
    };
  }, [dashboard, session]);

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
        {state.rooms.map((room, index) => {
          return (
            <li
              className={state.room === room ? "active" : undefined}
              onClick={() => dashboard.showRoom(room)}
              key={index}
              title={room + "\n" + room}
            >
              {room}
            </li>
          );
        })}
      </ul>
    );
  }, [dashboard, state.rooms, state.room]);

  const data = state.data[state.room];

  const room = state.room;

  React.useEffect(() => {
    if (!data || !data?.canFetchMsgs || data?.isLoading) {
      return;
    }

    session
      .getMessages(room, data.page)
      .then((messages) => dashboard.loadMessages(room, messages))
      .catch(console.error);
  }, [dashboard, data, room, session]);

  const messages = data?.messages;

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
              <h5>{state.room}</h5>
            </div>
            <div className="body">
              <Messages />
            </div>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();

                if (!state.message || !state.room) return;

                session.addMessage(state.room, state.message);
                dashboard.writeMessage("");
              }}
            >
              <input
                type="text"
                className="form-control"
                disabled={!Boolean(state.room)}
                value={state.message}
                onChange={({ currentTarget: { value } }) =>
                  dashboard.writeMessage(value)
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
    room: "",
    rooms: [],
    data: {},
  };
}

export function initRoom(): Room {
  return {
    origin: "unknwon",
    demo: "unknwon",
    fullName: "unknwon",
    address: "unknwon",
    userAgent: "unknwon",
    isLoading: false,
    page: 1,
    unread: 0,
    canFetchMsgs: true,
    messages: [],
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
  room: string;
  rooms: string[];
  data: { [K: string]: Room };
}

interface Room {
  origin: string;
  demo: string;
  fullName: string;
  address: string;
  userAgent: string;
  isLoading: boolean;
  page: number;
  unread: number;
  canFetchMsgs: boolean;
  messages: IMessage[];
}
