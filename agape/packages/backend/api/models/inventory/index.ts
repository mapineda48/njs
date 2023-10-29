import { IMethod } from "../../util/query";
import * as Category from "./category";
import * as SubCategory from "./subcategory";
import * as Product from "./product";

export interface IApi {
  category: IMethod<Category.IData, Category.IRecord>;
  subcategory: IMethod<SubCategory.IData, SubCategory.IRecord>;
  product: IMethod<Product.IData, Product.IRecord>;
}
