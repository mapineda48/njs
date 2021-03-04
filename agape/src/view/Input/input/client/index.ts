import { createInput } from "../common";

import { Client } from "shared";


export const id = createInput({
  type: "Number",
  props: {
    options: {
      disabledDot: true,
    },
  },
});

export const dni = createInput({
  type: "Number",
  props: {},
});

export const firstName = createInput({
  type: "Text",
  props: {},
});

export const lastName = createInput({
  type: "Text",
  props: {},
});

export const phone = createInput({
  type: "Text",
  props: {
    type: "tel",
  },
});

export const email = createInput({
  type: "Text",
  props: {
    type: "email",
  },
});

export const addres = createInput({
  type: "Text",
  props: {},
});

export const type = createInput({
  type: "Text",
  props: {},
});
