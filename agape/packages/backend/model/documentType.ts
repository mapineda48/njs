import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "../api/model/documentType";

export const ModelName = "documentType"; 

export function define(seq: Sequelize) {
  const documentType = seq.define<Model<Integration.IModel>>(
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
        unique: true,
      },
      code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
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

  return documentType;
}

/**
 * Types
 */
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
