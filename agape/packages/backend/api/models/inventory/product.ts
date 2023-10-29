import * as ORM from "../../util/orm";

export interface IRecord extends ORM.Record {
  fullName: string;
  images: string[];
  isEnabled: boolean;
  categoryId: number;
  subcategoryId: number;
  stock: number;
}

export type IModel = ORM.Model<IRecord>;

export type IData = ORM.Model<IRecord, "id">;
