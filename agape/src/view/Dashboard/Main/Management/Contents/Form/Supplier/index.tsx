import React from "react";
import Input from "component/Input";
import Form from "../Base";
import Field from "../Field";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

import { Supplier } from "shared";

export default () => {
  const { management } = useDispatch();

  const state: Supplier = useSelector(
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
      <Field label="Cedula" from={3} to={6}>
        <Input.Number
          value={state.dni}
          onChangeValue={(dni) => management.update({ dni })}
        />
      </Field>
      <Field label="Empresa" from={6} to={9}>
        <Input.Text
          value={state.company}
          onChangeValue={(company) => management.update({ company })}
        />
      </Field>
      <Field label="Nombre" from={1} to={5}>
        <Input.Text
          value={state.firstName}
          onChangeValue={(firstName) => management.update({ firstName })}
        />
      </Field>
      <Field label="Apellido" from={5} to={9}>
        <Input.Text
          value={state.lastName}
          onChangeValue={(lastName) => management.update({ lastName })}
        />
      </Field>
      <Field label="Direccion" from={1} to={5}>
        <Input.Text
          value={state.addres}
          onChangeValue={(addres) => management.update({ addres })}
        />
      </Field>
      <Field label="Email" from={5} to={9}>
        <Input.Text
          value={state.email}
          onChangeValue={(email) => management.update({ email })}
          type="email"
        />
      </Field>
      <Field label="Telefono" from={1} to={5}>
        <Input.Text
          value={state.phone}
          onChangeValue={(phone) => management.update({ phone })}
          type="tel"
        />
      </Field>
    </Form>
  );
};

/**
 * Typings
 */

type Table = "supplier";
