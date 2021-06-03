import React from "react";
import Input from "component/Input";
import TextArea from "component/TextArea";
import Form from "../Base";
import Field from "../Field";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

import { Product } from "shared";

export default () => {
  const { management } = useDispatch();

  const state: Product = useSelector(
    (state: any) => state.management.record.preview
  );

  return (
    <Form>
      <Field label="ID" from={1} to={3}>
        <Input.Number
          value={state.id}
          onChangeValue={(id) => management.update({ id })}
          options={{ disabledDot: true }}
        />
      </Field>
      <Field label="Codigo" from={3} to={6}>
        <Input.Text
          value={state.cod}
          onChangeValue={(cod) => management.update({ cod })}
        />
      </Field>
      <Field label="Precio" from={6} to={9}>
        <Input.Number
          value={state.sellPrice}
          onChangeValue={(sellPrice) => management.update({ sellPrice })}
          options={{ allowFloat: true }}
        />
      </Field>
      <Field label="Nombre" from={1} to={7}>
        <Input.Text
          value={state.fullName}
          onChangeValue={(fullName) => management.update({ fullName })}
        />
      </Field>
      <Field label="Comentario" from={1} to={9} initial>
        <TextArea />
      </Field>
    </Form>
  );
};

/**
 * Typings
 */

type Table = "product";
