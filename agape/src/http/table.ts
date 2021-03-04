import {
  Client,
  PreviewEmployee,
  Sell,
  Supplier,
  Product,
  Detail,
  Buy,
  TypeClient,
  TypeEmployee,
} from "shared";

export const createClient = (): Client => {
  return {
    id: 0,
    addres: "",
    dni: 0,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    type: "",
  };
};

export const createEmployee = (): PreviewEmployee => {
  return {
    id: 0,
    addres: "",
    dni: 0,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    type: "",
    username: "",
  };
};

export const createSupplier = (): Supplier => {
  return {
    id: 0,
    addres: "",
    dni: 0,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  };
};

export const createProduct = (): Product => {
  return {
    id: 0,
    cod: "",
    comment: "",
    fullName: "",
    sellPrice: 0,
  };
};

export const createDetail = (): Detail => {
  return {
    id: 0,
    cod: "",
    fullName: "",
    iva: 0,
    quantity: 0,
    subTotal: 0,
    unitPrice: 0,
  };
};

export const createSell = (): Sell => {
  return {
    cod: "",
    comment: "",
    date: 0,
    details: [createDetail()],
    dniClient: 0,
    dniEmployee: 0,
    id: 0,
    iva: 0,
    subTotal: 0,
  };
};

export const createBuy = (): Buy => {
  return {
    cod: "",
    comment: "",
    date: 0,
    details: [createDetail()],
    dniSupplier: 0,
    dniEmployee: 0,
    id: 0,
    iva: 0,
    subTotal: 0,
  };
};

export const createTypeClient = (): TypeClient => {
  return { fullName: "", id: 0 };
};

export const createTypeEmployee = (): TypeEmployee => {
  return { fullName: "", id: 0 };
};

export const createRecord = {
  client: createClient,
  supplier: createSupplier,
  employee: createEmployee,
  product: createProduct,
  sell: createSell,
  buy: createBuy,
};

export const create = (table: keyof typeof createRecord) => {
  const create = createRecord[table];

  if (!create) {
    throw new Error("not found table");
  }

  return create();
};
