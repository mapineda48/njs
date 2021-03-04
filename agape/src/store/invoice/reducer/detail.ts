import { Detail } from "shared";

export const reducer = (input: number | Detail, state: Detail[]) => {
  const details: Detail[] = [];
  if (typeof input === "number") {
    state.forEach((detail) => {
      if (detail.id === input) {
        return;
      }
      details.push(detail);
    });
  } else {
    let found = false;
    state.forEach((detail) => {
      if (detail.id === input.id) {
        found = true;

        const quantity = input.quantity + detail.quantity;
        const subTotal = quantity * detail.unitPrice;

        details.push({
          ...detail,
          quantity,
          subTotal,
        });

        return;
      }

      details.push(detail);
    });
    if (!found) {
      details.push(input);
    }
  }

  const total = details
    .map((detail) => detail.subTotal)
    .reduce((prev, current) => current + prev, 0);

  const iva = total * 0.16;

  const subTotal = total - iva;

  return {
    details,
    subTotal,
    iva,
  };
};
