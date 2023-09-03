import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import { ModelName as User } from "./user";
import { ModelName as Role } from "./role";
import { ModelName as EmployeeRole } from "./employeeRole";
import * as Integration from "../api/model/employee";

export const { ModelName } = Integration;

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

  employee.belongsToMany(role, { through: EmployeeRole });
  role.belongsToMany(employee, { through: EmployeeRole });

  return employee;
}

/**
 * Types
 */
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
