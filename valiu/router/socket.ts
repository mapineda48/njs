import { event } from "../src/shared";
import { Server as Socket } from "socket.io";

export default function create(socket: Socket) {
  return {
    insert(tag: any) {
      socket.emit(event.insert, tag);
    },
    update(tag: any) {
      socket.emit(event.update, tag);
    },
    delete(tag: any) {
      socket.emit(event.delete, tag);
    },
  };
}
