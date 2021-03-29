import prod from "./client";
import { http } from "../development";

export default process.env.NODE_ENV === "development" ? http.client : prod;