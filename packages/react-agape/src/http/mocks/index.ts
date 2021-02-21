import clients from "./clients";
import employees from "./employees";
import products from "./products";
import suppliers from "./suppliers";
import buys from "./buys";
import sells from "./sells";

import { LogIn, Select, Insert, Update, Delete } from "..";

import { Auth } from "shared";

const timePromise = 0;

const isResolve = true;

/**
 * mock Promise
 */
const resolve = <T>(value: T) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, timePromise);
  });
};

const reject = <T>(value: T) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("something wrong on promise"));
    }, timePromise);
  });
};

const requestMockHttp = <T>(value: T) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random())) {
        return reject(new Error("something wrong on promise"));
      }
      resolve(value);
    }, timePromise);
  });
};

const currentPromise = isResolve ? resolve : reject;

export const login: LogIn = (username: string, password: string) => {
  const auth: Auth = {
    token: "Im a secure token :)",
    employee: {
      id: 1,
      dni: 12345,
      firstName: "Miguel",
      lastName: "Pineda",
      phone: "string",
      email: "string",
      addres: "string",
      type: "admin",
      username: "mapineda48",
    },
  };

  return currentPromise(auth);
};

export const select: Select = (token, table, opt) => {
  switch (table) {
    case "employee": {
      return currentPromise(employees as any);
    }
    case "client": {
      return currentPromise(clients);
    }
    case "supplier": {
      return currentPromise(suppliers);
    }
    case "product": {
      return currentPromise(products);
    }
    case "buy": {
      return currentPromise(buys);
    }
    case "sell": {
      return currentPromise(sells);
    }
    case "typeClient": {
      return currentPromise([]);
    }
    case "typeEmployee": {
      return currentPromise([]);
    }
    default:
      throw new Error("not found table!!!");
  }
};

export const insert: Insert = (token, table, input) => {
  switch (table) {
    case "employee": {
      return currentPromise(employees[0] as any);
    }
    case "client": {
      return currentPromise(clients[0]);
    }
    case "supplier": {
      return currentPromise(suppliers[0]);
    }
    case "product": {
      return currentPromise(products[0]);
    }
    case "buy": {
      return currentPromise(buys[0]);
    }
    case "sell": {
      return currentPromise(sells[0]);
    }
    case "typeClient": {
      return currentPromise([]);
    }
    case "typeEmployee": {
      return currentPromise([]);
    }
    default:
      throw new Error("not found table!!!");
  }
};

export const update: Update = (token, table, input) => {
  switch (table) {
    case "employee": {
      return currentPromise(employees[0] as any);
    }
    case "client": {
      return currentPromise(clients[0]);
    }
    case "supplier": {
      return currentPromise(suppliers[0]);
    }
    case "product": {
      return currentPromise(products[0]);
    }
    case "buy": {
      return currentPromise(buys[0]);
    }
    case "sell": {
      return currentPromise(sells[0]);
    }
    case "typeClient": {
      return currentPromise([]);
    }
    case "typeEmployee": {
      return currentPromise([]);
    }
    default:
      throw new Error("not found table!!!");
  }
};

export const dlete: Delete = (token, table, id) => {
  switch (table) {
    case "employee": {
      return currentPromise(employees[0] as any);
    }
    case "client": {
      return currentPromise(clients[0]);
    }
    case "supplier": {
      return currentPromise(suppliers[0]);
    }
    case "product": {
      return currentPromise(products[0]);
    }
    case "buy": {
      return currentPromise(buys[0]);
    }
    case "sell": {
      return currentPromise(sells[0]);
    }
    case "typeClient": {
      return currentPromise([]);
    }
    case "typeEmployee": {
      return currentPromise([]);
    }
    default:
      throw new Error("not found table!!!");
  }
};

export { clients, employees, products, suppliers, buys, sells };

export default {
  login,
  select,
  insert,
  update,
  delete: dlete,
};
