


/**
 * Typings
 */
export interface Client {
  id: number;
  dni: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addres: string;
  type: string;
}

export interface Employee {
  id: number;
  dni: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addres: string;
  type: string;
  username: string;
  password: string;
}

export type PreviewEmployee = Omit<Employee, "password">;

export interface Product {
  id: number;
  cod: string;
  fullName: string;
  comment: string;
  sellPrice: number;
}

export interface Detail {
  id: number;
  cod: string;
  fullName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  iva: number;
}

export interface Buy {
  id: number;
  cod: string;
  dniEmployee: number;
  dniSupplier: number;
  date: number;
  subTotal: number;
  iva: number;
  comment: string;
  details: Detail[];
}

export interface Sell {
  id: number;
  cod: string;
  dniEmployee: number;
  dniClient: number;
  date: number;
  subTotal: number;
  iva: number;
  comment: string;
  details: Detail[];
}

export interface Supplier {
  id: number;
  dni: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addres: string;
  company: string;
}

export interface TypeClient {
  id: number;
  fullName: string;
}

export interface TypeEmployee {
  id: number;
  fullName: string;
}

export interface DataBase {
  client: Client;
  employee: PreviewEmployee;
  supplier: Supplier;
  product: Product;
  sell: Sell;
  buy: Buy;
  type_client: TypeClient;
  type_employee: TypeEmployee;
}

export type Table = keyof DataBase;

export type Option<T extends Table> = {
  column?: (keyof DataBase[T])[] | "*";
  where?: {
    column: keyof DataBase[T];
    value: string;
  };
  limit?: number;
  offset?: number;
};

export type Results<T extends Table = Table> = DataBase[T][];

export interface Auth {
  token: string;
  employee: PreviewEmployee;
}

export type IInsert<T extends Table> = Omit<DataBase[T], "id">;

export type IUpdate<T extends Table> = {
  id: number;
  input: Partial<IInsert<T>>;
};
