import { IMethod } from "../../util/query";
import * as Role from "./role";

export interface IApi {
  role: IMethod<Role.IData, Role.IRecord>;
}
