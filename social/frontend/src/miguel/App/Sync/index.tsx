import React from "react";
import { useSession } from "../Session";
import { useDispatch } from "../Store/hook";

export function Sync(props: Props) {
  const session = useSession();
  const { room } = useDispatch();

  React.useEffect(() => {
    const unmountCbs: CB[] = [];

    unmountCbs.push(
      session.onAddMessage((id, message) => {
        room.addMessage({
          room: id,
          message,
        });
      })
    );

    unmountCbs.push(
      session.onGuestOnline((id, online) => {
        if (online) {
          room.addRoom(id);
          return;
        }

        room.removeRoom(id);
      })
    );

    session.ready().then(room.addRooms).catch(console.error);

    return () => unmountCbs.forEach((cb) => cb());
  }, [room, session]);

  return <React.Fragment>{props.children}</React.Fragment>;
}

/**
 * Types
 */
type CB = () => void;

export interface Props {
  children: React.ReactNode;
}
