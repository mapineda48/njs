import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as ORM from "@/util/models/orm";
import { toModelName } from "@/util/models/toMap";
import { ModelName as DocumentType } from "./documentType";

export const ModelName = "user";

export function define(seq: Sequelize) {
  const documentType = seq.models[DocumentType];

  const user = seq.define<Model<IDefine>>(
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
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  fullName: string;
  email: string;
  city: string;
  department: string;
  birthday: Date;
  documentNumber: string;
  documentTypeId: number;
}

type IDefine = ORM.Model<IRecord>;

type IData = ORM.Model<IRecord, "id">;
