import { Sequelize, Model, DataTypes, ModelStatic } from "sequelize";
import * as Integration from "@api/models/inventory/subcategory";
import { ModelName as Category } from "./category";
import { toModelName } from "@util/models/toMap";

export const ModelName = toModelName(__filename);

export function define(seq: Sequelize) {
  const category = seq.models[Category];

  const subcategory = seq.define<Model<Integration.IModel>>(
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
      //paranoid: true
    }
  );

  category.hasMany(subcategory, { foreignKey: "categoryId", as: "subcategories" });
  subcategory.belongsTo(category, { foreignKey: "categoryId" });

  return subcategory;
}

/**
 * Types
 */
export type IModel = Model<Integration.IRecord, Integration.IData>;
export type IModelStatic = ModelStatic<IModel>;
