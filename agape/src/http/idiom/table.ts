import { DataBase } from "shared";

const createParse: CreateParse = (idiom: any) => {
  const keys: any[] = Object.keys(idiom);

  return (value: any) => {
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const current: any = (idiom as any)[key];
      if (current === value) {
        return key;
      }
    }
    throw new Error("invalid value");
  };
};

export const english = {
  client: "Clients",
  employee: "Employee",
  supplier: "Supplier",
  product: "Product",
  buy: "Buy",
  sell: "Sell",
} as const;

export const parseEnglish = createParse(english);

export const spanish = {
  client: "Clientes",
  employee: "Empleados",
  supplier: "Proveedor",
  product: "Productos",
  buy: "Compra",
  sell: "Ventas",
} as const;

export const parseSpanish = createParse(spanish);

/**
 * Typings
 */

type CreateParse = <T extends Idiom, K = T[keyof T]>(
  idiom: T
) => (value: string) => Table;

type Idiom<T = Omit<DataBase, "type_client" | "type_employee">> = {
  readonly [K in keyof T]: string;
};

type Table = keyof Idiom;
