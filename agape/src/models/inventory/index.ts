import { Sequelize } from "sequelize";
import * as category from "./category";
import * as subcategory from "./subcategory";
import * as product from "./product";

export function define(seq: Sequelize) {
  category.define(seq);
  subcategory.define(seq);
  product.define(seq);
}

export const apis = [
  category.ModelName,
  subcategory.ModelName,
  product.ModelName,
];

/**
 * Types
 */
export interface IModelStatic {
  category: category.IModelStatic;
  subcategory: subcategory.IModelStatic;
  product: product.IModelStatic;
}
