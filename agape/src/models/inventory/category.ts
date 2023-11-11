import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as ORM from "../../util/models/orm";


export const ModelName = "inventory_category";

export function define(seq: Sequelize) {
  const category = seq.define<Model<IDefine>>(
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

  return category;
}

/**
 * Types
 */
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  fullName: string;
  isEnabled: boolean;
}

export type IDefine = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
