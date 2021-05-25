import prod from "./client";
import { socket } from "../development";

export default process.env.NODE_ENV === "development" ? socket.client : prod;
