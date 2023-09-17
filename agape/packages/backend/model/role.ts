import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "../api/model/role";

export const ModelName = "role";

export function define(seq: Sequelize) {
  const role = seq.define<Model<Integration.IModel>>(
    ModelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
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
