import { DataBase } from "shared";

export const filter: Filter = {
  client: ["id", "dni", "firstName"],
  sell: ["cod", "id"],
  supplier: ["id", "dni", "firstName"],
  buy: ["cod", "id"],
  product: ["cod", "id"],
  type_client: ["id", "fullName"],
  type_employee: ["id", "fullName"],
  employee: ["id", "dni", "firstName"],
};

/**
 * Typings
 */

type Filter = { [K in keyof DataBase]: (keyof DataBase[K])[] };
