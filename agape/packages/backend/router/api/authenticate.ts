import { route } from "../../api/public";
import { sign } from "../authenticate";

export const path = route.authenticate;

export const onApi = sign;