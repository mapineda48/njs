import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "@api/models/inventory/product";
import { toModelName } from "@util/models/toMap";
import { ModelName as Category } from "./category";
import { ModelName as SubCategory } from "./subcategory";

export const ModelName = toModelName(__filename);

export function define(seq: Sequelize) {
  const category = seq.models[Category];
  const subcategory = seq.models[SubCategory];

  const product = seq.define<Model<Integration.IModel>>(
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
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
