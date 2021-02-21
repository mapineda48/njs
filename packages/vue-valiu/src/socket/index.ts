import { io } from "socket.io-client";
import { event } from "@/shared";
import store from "@/store";

const socket = io();

socket.on(event.insert, (data: any) => {
  store.commit("insert", data);
});

socket.on(event.update, (data: any) => {
  store.commit("update", data || {});
});

socket.on(event.delete, (data: any) => {
  store.commit("delete", data);
});
