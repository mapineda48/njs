import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import { ModelName as DocumentType } from "./documentType";
import * as Integration from "../api/model/user";

export const ModelName = "user";

export function define(seq: Sequelize) {
  const documentType = seq.models[DocumentType];

  const user = seq.define<Model<Integration.IModel>>(
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
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      documentNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      // foreignKey
      documentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      //paranoid: true
    }
  );

  documentType.hasMany(user);
  user.belongsTo(documentType);

  return user;
}

/**
 * Types
 */
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
