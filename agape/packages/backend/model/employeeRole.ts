import { Model, ModelStatic } from "sequelize";
import { IData, IRecord } from "../api/model/employeeRole";

export const ModelName = "employeeRole";

/**
 * Types
 */
export type IModelStatic = ModelStatic<Model<IRecord, IData>>;
