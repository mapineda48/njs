import React from "react";
import Input from "component/Input";
import TextArea from "component/TextArea";
import Form from "../Base";
import Field from "../Field";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

import { Sell } from "shared";

export default () => {
  const { management } = useDispatch();

  const state: Sell = useSelector(
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
      <Field label="Fecha" from={6} to={9}>
        <Input.Number
          value={state.date}
          onChangeValue={(date) => management.update({ date })}
          options={{ disabledDot: true }}
        />
      </Field>
      <Field label="Empleado" from={1} to={5}>
        <Input.Number
          value={state.dniEmployee}
          onChangeValue={(dniEmployee) => management.update({ dniEmployee })}
        />
      </Field>
      <Field label="Cliente" from={5} to={9}>
        <Input.Number
          value={state.dniClient}
          onChangeValue={(dniClient) => management.update({ dniClient })}
        />
      </Field>
      <Field label="SubTotal" from={1} to={4}>
        <Input.Number
          value={state.subTotal}
          onChangeValue={(subTotal) => management.update({ subTotal })}
        />
      </Field>
      <Field label="IVA" from={4} to={6}>
        <Input.Number
          value={state.iva}
          onChangeValue={(iva) => management.update({ iva })}
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

type Table = "sell";
