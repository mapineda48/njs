import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as ORM from "@/util/models/orm";
import { toModelName } from "@/util/models/toMap";

export const ModelName = "setting";

export function define(seq: Sequelize) {
  const role = seq.define<Model<IDefine>>(
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
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  key: string;
  value: unknown;
}

type IDefine = ORM.Model<IRecord>;

type IData = ORM.Model<IRecord, "id">;
