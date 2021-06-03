import { Table as TBase, DataBase } from "shared";

export const spanish: Idiom = {
  buy: {
    id: "ID",
    cod: "Codigo",
    dniEmployee: "Empleado",
    dniSupplier: "Proveedor",
    iva: "IVA",
    date: "Fecha",
    subTotal: "SubTotal",
    comment: "Comentario",
    details: "Detalles",
  },
  sell: {
    id: "ID",
    cod: "Codigo",
    dniEmployee: "Empleado",
    dniClient: "Cliente",
    iva: "IVA",
    date: "Fecha",
    subTotal: "SubTotal",
    comment: "Comentario",
    details: "Detalles",
  },
  client: {
    id: "ID",
    dni: "Documento",
    firstName: "Nombre",
    lastName: "Apellidos",
    phone: "Telefono",
    email: "Correo",
    addres: "Direccion",
    type: "Tipo",
  },
  supplier: {
    id: "ID",
    dni: "Documento",
    firstName: "Nombre",
    lastName: "Apellidos",
    phone: "Telefono",
    email: "Correo",
    addres: "Direccion",
    company: "Empresa",
  },
  employee: {
    id: "ID",
    dni: "Documento",
    firstName: "Nombre",
    lastName: "Apellidos",
    phone: "Telefono",
    email: "Correo",
    addres: "Direccion",
    type: "Tipo",
    username: "Usuario",
  },
  product: {
    id: "ID",
    fullName: "Nombre",
    sellPrice: "Precio",
    cod: "Codigo",
    comment: "Comentario",
  },
  type_client: {
    id: "ID",
    fullName: "Nombre",
  },
  type_employee: {
    id: "ID",
    fullName: "Nombre",
  },
};

/**
 * Typings
 */

type Idiom = {
  [K in Table]: SetString<DataBase[K]>;
};

type SetString<T extends unknown> = {
  [K in keyof T]: string;
};

export type Table = TBase;
