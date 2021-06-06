import { io } from "socket.io-client";
import { event } from "@/shared";
import store from "@/store";
const socket = io();
socket.on(event.insert, (data) => {
    store.commit("insert", data);
});
socket.on(event.update, (data) => {
    store.commit("update", data || {});
});
socket.on(event.delete, (data) => {
    store.commit("delete", data);
});
//# sourceMappingURL=index.js.map