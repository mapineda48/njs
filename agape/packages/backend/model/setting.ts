import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "../api/model/setting";

export const { ModelName } = Integration;

export function define(seq: Sequelize) {
  const role = seq.define<Model<Integration.IModel>>(
    ModelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  return role;
}

/**
 * Types
 */
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
