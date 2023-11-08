"use client";

import { useState } from "react";
import Select from "@/form/Select";

export default function Test(props: Props) {
  const [state, setState] = useState<{ id: number; name: string }[]>([]);

  return (
    <>
      <Select.Integer
        onChange={(e) => {
          const id = parseInt(e.currentTarget.value);

          const { subcategories } =
            props.categories.find((item) => item.id === id) ?? {};

          setState(subcategories ?? []);
        }}
        required
        name="categoryId"
      >
        <option value="0">Seleccione...</option>
        {props.categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select.Integer>
      <Select.Integer name="subcategoryId">
        <option value="0">Seleccione...</option>
        {state.map(({ id, name }) => (
          <option key={"subcategoryId" + id} value={id}>
            {name}
          </option>
        ))}
      </Select.Integer>
    </>
  );
}

/**
 * Types
 */
export interface Props {
  categories: Categories[];
}

interface Categories {
  id: number;
  name: string;
  subcategories: { id: number; name: string }[];
}
