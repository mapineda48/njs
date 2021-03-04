import { createInput } from "../common";

import { Sell } from "shared";


export const id = createInput({
  type: "Number",
  props: {
    options: {
      disabledDot: true,
    },
  },
});

export const cod = createInput({
  type: "Text",
  props: {},
});

export const dniEmployee = createInput({
  type: "Number",
  props: {},
});

export const dniSupplier = createInput({
  type: "Number",
  props: {},
});

export const date = createInput({
  type: "Text",
  props: {
    type: "date",
  },
});

export const subTotal = createInput({
  type: "Number",
  props: {
    options: {
      allowFloat: true,
    },
  },
});
export const iva = createInput({
  type: "Number",
  props: {
    options: {
      allowFloat: true,
    },
  },
});

export const comment = createInput({
  type: "Text",
  props: {},
});
