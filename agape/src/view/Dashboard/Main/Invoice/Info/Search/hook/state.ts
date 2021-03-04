import { createDetail } from "http/table";

import { Product, Detail } from "shared";

export const initDetail = (product: Product): Detail => {
  const total = product.sellPrice * 1;
  const iva = total * 0.16;
  const subTotal = total - iva;
  return {
    cod: product.cod,
    fullName: product.fullName,
    id: product.id,
    unitPrice: product.sellPrice,
    quantity: 1,
    subTotal,
    iva,
  };
};

export const create = (): State => {
  return {
    current: createDetail(),
    preview: createDetail(),
    coincidences: [],
    focus: -1,
    showNoti: false,
  };
};

/**
 * Typings
 */

export interface State {
  current: Detail;
  preview: Detail;
  coincidences: Product[];
  focus: number;
  showNoti: boolean;
}
