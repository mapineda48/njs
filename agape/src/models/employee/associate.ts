import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import { ModelName as User } from "../user";
import { ModelName as Role } from "./role";
import { ModelName as EmployeeRole } from "./associateRole";
import * as ORM from "../../util/models/orm";


export const ModelName = "employee_associate";

export function define(seq: Sequelize) {
  const user = seq.models[User];
  const role = seq.models[Role];

  const employee = seq.define<Model<IDefine>>(
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

  employee.belongsToMany(role, {
    through: EmployeeRole,
    foreignKey: "associateId",
  });
  role.belongsToMany(employee, { through: EmployeeRole, foreignKey: "roleId" });

  return employee;
}

/**
 * Types
 */
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  userId: number;
}

export type IDefine = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
