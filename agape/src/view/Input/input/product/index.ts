import { createInput } from "../common";

import { Product } from "shared";


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

export const fullName = createInput({
  type: "Text",
  props: {},
});

export const comment = createInput({
  type: "Text",
  props: {},
});

export const sellPrice = createInput({
  type: "Number",
  props: {
    options: {
      allowFloat: true,
    },
  },
});
