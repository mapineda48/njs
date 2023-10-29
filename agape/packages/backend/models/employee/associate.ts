import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "@api/models/employee/associate";
import { toModelName } from "@util/models/toMap";
import { ModelName as User } from "../user";
import { ModelName as Role } from "./role";
import { ModelName as EmployeeRole } from "./associateRole";

export const ModelName = toModelName(__filename);

export function define(seq: Sequelize) {
  const user = seq.models[User];
  const role = seq.models[Role];

  const employee = seq.define<Model<Integration.IModel>>(
    ModelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // foreignKey
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      //paranoid: true
    }
  );

  user.hasOne(employee);
  employee.belongsTo(user);

  employee.belongsToMany(role, { through: EmployeeRole, foreignKey: "associateId" });
  role.belongsToMany(employee, { through: EmployeeRole, foreignKey: "roleId" });

  return employee;
}

/**
 * Types
 */
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
