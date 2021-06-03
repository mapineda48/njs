import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useState, Reducer } from "./state";
import style from "./index.module.scss";
import * as util from "./util";

import type { Record, Update, Insert, Search } from "service";

export function Field(props: PropsField) {
  const { children, type = "text", ...rest } = props;

  const { id, label } = React.useMemo(() => {
    const id = children.toLowerCase();

    const label =
      children[0].toUpperCase() +
      children.slice(1, children.length).toLowerCase() +
      ":";

    return { id, label };
  }, [children]);

  return (
    <div className={style.field}>
      <label htmlFor={id}>{label}</label>
      <input {...rest} type={type} id={id} className="form-control" />
    </div>
  );
}

export default function PersonComponent(props: Props) {
  const { record, onCreate, onEdit, onSearch, isLoading, onCancel } = props;

  const [state, person] = useState(record);

  const buttonLabel = onCreate
    ? "Crear"
    : onEdit
    ? "Editar"
    : onSearch
    ? "Buscar"
    : "Unknown";

  return (
    <form
      className={style.person}
      onSubmit={(event) => {
        event.preventDefault();

        if (onCreate) {
          const { id, ...record } = state;
          onCreate(record, person);
        } else if (onEdit) {
          onEdit({ ...state }, person);
        } else if (onSearch) {
          const { id, ...record } = state;

          onSearch(util.search(record), person);
        }
      }}
    >
      <div className={style.header}>
        <h3>Personas</h3>

        {onCancel && (
        <div
          className={"text-danger " + style.cancel}
          onClick={() => onCancel(person)}
        >
          <FaRegTimesCircle />
        </div>
      )}
      </div>

      <div className={style.fields}>
        <Field
          disabled={isLoading}
          value={state.full_name}
          onChange={({ currentTarget: { value } }) => person.fullName(value)}
          required={!onSearch}
          maxLength={30}
        >
          nombre
        </Field>
        <Field
          disabled={isLoading}
          value={state.dni || ""}
          onChange={({ currentTarget: { value } }) => person.dni(value)}
          required={!onSearch}
          maxLength={20}
          type="number"
        >
          cédula
        </Field>
        <Field
          disabled={isLoading}
          value={state.address}
          onChange={({ currentTarget: { value } }) => person.address(value)}
          required={!onSearch}
          maxLength={30}
        >
          direccion
        </Field>
        <Field
          disabled={isLoading}
          value={state.email}
          onChange={({ currentTarget: { value } }) => person.email(value)}
          required={!onSearch}
          maxLength={30}
          type="email"
        >
          correo
        </Field>
      </div>

      <div className={style.footer}>
        <button disabled={isLoading} className="btn-primary" type="submit">
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}

/**
 * Types
 */
interface Props {
  isLoading?: boolean;
  record?: Record;
  onEdit?: (person: Update, form: Reducer) => void;
  onCreate?: (person: Insert, form: Reducer) => void;
  onSearch?: (person: Search, form: Reducer) => void;
  onCancel?: (form: Reducer) => void;
}

interface PropsField extends NativeInput {
  children: string;
}

type NativeInput = Omit<JSX.IntrinsicElements["input"], "children" | "ref">;
