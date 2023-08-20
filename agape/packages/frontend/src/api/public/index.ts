import { routePublic, IPublicApi } from "backend";
import { axios, initApi } from "./util";

export default initApi<IPublicApi>(axios(), routePublic);
