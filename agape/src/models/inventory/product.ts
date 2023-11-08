import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as ORM from "@/util/models/orm";
import { toModelName } from "@/util/models/toMap";
import { ModelName as Category } from "./category";
import { ModelName as SubCategory } from "./subcategory";

export const ModelName = "inventory_product";

export function define(seq: Sequelize) {
  const category = seq.models[Category];
  const subcategory = seq.models[SubCategory];

  const product = seq.define<Model<IDefine>>(
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
      images: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // foreignKey
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      //paranoid: true
    }
  );

  category.hasOne(product, { foreignKey: "categoryId" });
  product.belongsTo(category, { foreignKey: "categoryId" });

  subcategory.hasOne(product, { foreignKey: "subcategoryId" });
  product.belongsTo(subcategory, { foreignKey: "subcategoryId" });

  return product;
}

/**
 * Types
 */
export type IModel = Model<IRecord, IData>;
export type IModelStatic = ModelStatic<IModel>;

export interface IRecord extends ORM.Record {
  fullName: string;
  images: string[];
  isEnabled: boolean;
  categoryId: number;
  subcategoryId: number;
  stock: number;
}

export type IDefine = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
