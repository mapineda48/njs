import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import { ModelName as Category } from "./category";
import * as ORM from "../../util/models/orm";


export const ModelName = "inventory_subcategory";

export function define(seq: Sequelize) {
  const category = seq.models[Category];

  const subcategory = seq.define<Model<IDefine>>(
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

      // foreignKey
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      //paranoid: true,
      
    }
  );

  category.hasMany(subcategory, {
    foreignKey: "categoryId",
    as: "subcategories",
  });
  subcategory.belongsTo(category, { foreignKey: "categoryId" });

  return subcategory;
}

/**
 * Types
 */
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  fullName: string;
  isEnabled: boolean;
  categoryId: number;
}

export type IDefine = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
