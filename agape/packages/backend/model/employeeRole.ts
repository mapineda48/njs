import { Model, ModelStatic } from "sequelize";
import { ModelName, IData, IRecord } from "../api/model/employeeRole";

export { ModelName };

/**
 * Types
 */
export type IModelStatic = ModelStatic<Model<IRecord, IData>>;
