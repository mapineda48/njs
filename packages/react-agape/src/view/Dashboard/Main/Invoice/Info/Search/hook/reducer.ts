import { createDetail } from "http/table";
import { initDetail, State, create } from "./state";

import { Product } from "shared";

export const reset = () => {
  return (state: State): State => {
    return create();
  };
};

export const updateDetail = (value: string, products: Product[]) => {
  const result = products.filter((product) =>
    product.fullName.toUpperCase().includes(value.toUpperCase())
  );

  return (state: State): State => {
    if (result.length === 1 && result[0].fullName === value) {
      return {
        ...state,
        current: initDetail(result[0]),
        preview: createDetail(),
        focus: -1,
        coincidences: [],
      };
    }

    const coincidences = value === "" ? [] : result;

    return {
      ...state,
      current: { ...createDetail(), fullName: value },
      preview: createDetail(),
      coincidences,
      focus: -1,
    };
  };
};

export const updateFocus = (focus: number) => {
  return (state: State): State => {
    return { ...state, focus, preview: initDetail(state.coincidences[focus]) };
  };
};

export const upFocus = () => {
  return (state: State): State => {
    const focus = state.focus + 1;

    const isInRange = focus < state.coincidences.length;

    if (!isInRange) {
      return { ...state, focus: -1, preview: createDetail() };
    }

    return { ...state, focus, preview: initDetail(state.coincidences[focus]) };
  };
};

export const downFocus = () => {
  return (state: State): State => {
    const focus = state.focus - 1;

    const isInRange = focus > -2;

    if (!isInRange) {
      return state;
    }

    return {
      ...state,
      focus,
      preview:
        focus > -1 ? initDetail(state.coincidences[focus]) : createDetail(),
    };
  };
};

export const selectFocus = () => {
  return (state: State): State => {
    if (!state.coincidences[state.focus]) {
      return { ...state, focus: -1, preview: createDetail(), coincidences: [] };
    }

    return {
      ...state,
      focus: -1,
      preview: createDetail(),
      coincidences: [],
      current: initDetail(state.coincidences[state.focus]),
    };
  };
};

export const resetFocus = () => {
  return (state: State): State => {
    return { ...state, focus: -1, preview: createDetail() };
  };
};

export const updateQuantity = (quantity: number) => {
  return (state: State): State => {
    const total = state.current.unitPrice * quantity;
    const iva = total * 0.16;
    const subTotal = total - iva;

    return { ...state, current: { ...state.current, quantity, iva, subTotal } };
  };
};

export const onNotification = () => {
  return (state: State): State => {
    return {
      ...state,
      showNoti: true,
      focus: -1,
      preview: createDetail(),
      coincidences: [],
    };
  };
};

export const offNotification = () => {
  return (state: State): State => {
    return { ...state, showNoti: true };
  };
};
