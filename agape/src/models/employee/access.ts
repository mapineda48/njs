import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as ORM from "@/util/models/orm";
import { toModelName } from "@/util/models/toMap";
import { ModelName as Employee } from "./associate";

export const ModelName = "employee_access";

export function define(seq: Sequelize) {
  const employee = seq.models[Employee];

  const access = seq.define<Model<IDefine>>(
    ModelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      // foreignKey
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      //paranoid: true
    }
  );

  employee.hasOne(access);
  access.belongsTo(employee);

  return access;
}

/**
 * Types
 */
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  employeeId: number;
  username: string;
  password: string;
  isEnabled: boolean;
}

export type IDefine = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
