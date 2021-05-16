import mock from "../development/http";
import client from "./client";

export default process.env.NODE_ENV === "development" ? mock : client;
