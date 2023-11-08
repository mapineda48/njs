import { Sequelize } from "sequelize";
import * as role from "./role";
import * as associate from "./associate";
import * as associateRole from "./associateRole";
import * as access from "./access";

export function define(seq: Sequelize) {
  role.define(seq);
  associate.define(seq);
  access.define(seq);
}

/**
 * Types
 */
export interface IModelStatic {
  role: role.IModelStatic;
  associate: associate.IModelStatic;
  associateRole: associateRole.IModelStatic;
  access: access.IModelStatic;
}
