import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import useState, { Opt } from "./state";
import { getPartial, createCache, Cache } from "./state/util";
import style from "./index.module.scss";
import type { Colombia, Person as SPerson } from "shared";
import type { Form } from "./state";

export default function Person(props: Props) {
  const { label, disabled, onPartial, onRequired, onClose } = props;

  const [{ person, cache }, form] = useState(props);

  if (cache) cache.save(person);

  const [colombia, departments] = React.useMemo(() => {
    const colombia = props.colombia || {};

    const departments = ["", ...Object.keys(colombia)];

    return [colombia, departments] as const;
  }, [props.colombia]);

  const citys = React.useMemo(() => {
    const citys = colombia[person.department] || [];

    return ["", ...citys];
  }, [colombia, person.department]);

  React.useEffect(() => {
    if (!departments.includes(person.department)) {
      const [department] = departments;
      form.department(department);
    }

    if (citys.length && !citys.includes(person.city)) {
      const [city] = citys;
      form.city(city);
    }
  }, [citys, departments, person.city, person.department]);

  const required = React.useMemo(() => !!onRequired, [onRequired]);

  return (
    <form
      className={style._}
      onSubmit={(event) => {
        event.preventDefault();

        const _cache = cache || createCache("");

        if (onRequired) {
          onRequired(person, form, _cache);
        }

        if (onPartial) {
          const partial = getPartial(person);
          onPartial(partial, form, _cache);
        }
      }}
    >
      {onClose && (
        <div
          className={"text-danger " + style.close}
          onClick={() => {
            const _cache = cache || createCache("");
            onClose(form, _cache);
          }}
        >
          <FaRegTimesCircle />
        </div>
      )}

      <div>
        <label>Departamento</label>
        <select
          name=""
          id=""
          className="input"
          required={required}
          disabled={disabled}
          value={person.department}
          onChange={({ currentTarget: { value } }) => form.department(value)}
        >
          {departments.map((departament, index) => (
            <option key={index} value={departament}>
              {departament.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Ciudad</label>
        <select
          name=""
          id=""
          className="input"
          required={required}
          disabled={disabled}
          value={person.city}
          onChange={({ currentTarget: { value } }) => form.city(value)}
        >
          {citys.map((city, index) => (
            <option key={index} value={city}>
              {city.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Nombre</label>
        <input
          className="input"
          required={required}
          disabled={disabled}
          value={person.full_name}
          onChange={({ currentTarget: { value } }) => form.fullname(value)}
          type="text"
        />
      </div>
      <div>
        <label>Correo</label>
        <input
          className="input"
          required={required}
          disabled={disabled}
          value={person.email}
          onChange={({ currentTarget: { value } }) => form.email(value)}
          type="email"
        />
      </div>
      <div>
        <input
          autoFocus
          className="button-red"
          disabled={disabled}
          type="submit"
          value={label || "Enviar"}
        />
      </div>
    </form>
  );
}

/**
 * Types
 */
export interface Props extends Opt {
  colombia: Colombia | null;
  disabled?: boolean;
  label?: string;
  onRequired?: (person: SPerson, form: Form, cache: Cache) => void;
  onPartial?: (person: Partial<SPerson>, form: Form, cache: Cache) => void;
  onClose?: (form: Form, cache: Cache) => void;
}
