import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as ORM from "../util/models/orm";


export const ModelName = "documentType";

export function define(seq: Sequelize) {
  const documentType = seq.define<Model<IDefine>>(
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
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  fullName: string;
  code: string;
  isEnabled: boolean;
}

type IDefine = ORM.Model<IRecord>;

type IData = ORM.Model<IRecord, "id">;
