import { api } from "shared";
import createApi, { applyBaseUrl } from "../http";

const route = applyBaseUrl("../", api);

export default createApi(route);
