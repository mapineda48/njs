import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "../api/model/access";
import { ModelName as Employee } from "./employee";

export const ModelName = "access";

export function define(seq: Sequelize) {
  const employee = seq.models[Employee];

  const access = seq.define<Model<Integration.IModel>>(
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
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
