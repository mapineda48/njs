import prod, { PostMessage, Session, PostRoom, ResOnline } from "./client";
import { http } from "../../development";

export default process.env.NODE_ENV === "development" ? http.client : prod;

/**
 * Types
 */

export type { PostMessage, PostRoom, ResOnline, Session };
