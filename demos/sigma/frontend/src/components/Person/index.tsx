import React from "react";
import clsx from "clsx";
import { FaRegTimesCircle } from "react-icons/fa";
import { initAction } from "mp48-react/useState";
import { getPartial } from "./util";
import { fetchColombia } from "api";
import { useConfirm } from "components/Confirm";

import style from "./index.module.scss";

import type { Colombia } from "@model/type";
import type { Person } from "@model/person";

let cache = "";

const useState = initAction({
  fullName(state: State, fullName: string): State {
    return { ...state, fullName };
  },
  email(state: State, email: string): State {
    return { ...state, email };
  },
  city(state: State, city: string): State {
    return { ...state, city };
  },
  department(state: State, department: string): State {
    return { ...state, department };
  },
  colombia(state: State, colombia: Colombia): State {
    if (state.colombia) return state;

    cache = JSON.stringify(colombia);

    return { ...state, colombia };
  },
  reset(state: State): State {
    return init();
  },
});

function init(person?: Partial<Person>): State {
  return {
    fullName: "",
    email: "",
    city: "",
    department: "",
    colombia: cache ? JSON.parse(cache) : null,
    ...(person || {}),
  };
}

export default function PersonCRUD(props: Props) {
  const { label, disabled, onPartial, onRequired, onClose } = props;

  const [state, , person] = useState(() => init(props.person));

  const confirm = useConfirm();

  /**
   * Get colombia data from api sigma
   */
  React.useEffect(() => {
    if (state.colombia) return;

    let mount = true;

    fetchColombia()
      .then((colombia) => {
        if (!mount) return;
        person.colombia(colombia);
      })
      .catch((error) => confirm({ error }));

    return () => {
      mount = false;
    };
  }, [state.colombia, confirm, person]);

  /**
   * Preapre list
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colombia = state.colombia || {};

  const departments = React.useMemo(() => {
    const [, ...departments] = Object.keys(colombia);

    return ["", ...departments];
  }, [colombia]);

  const citys = React.useMemo(() => {
    const citys = colombia[state.department] || [];

    return ["", ...citys];
  }, [colombia, state.department]);

  React.useEffect(() => {
    if (!departments.includes(state.department)) {
      const [department] = departments;
      person.department(department);
    }

    if (citys.length && !citys.includes(state.city)) {
      const [city] = citys;
      person.city(city);
    }
  }, [citys, departments, person, state.city, state.department]);

  const required = React.useMemo(() => !!onRequired, [onRequired]);

  const isDisabled = disabled || !state.colombia;

  return (
    <form
      className={clsx([
        style._,
        props.panel && "panel",
        props.panel && style.panel,
      ])}
      onSubmit={(event) => {
        event.preventDefault();

        if (onRequired) {
          const { colombia, ...data } = state;

          onRequired(data, person);
        }

        if (onPartial) {
          const { colombia, ...data } = getPartial(state);
          onPartial(data, person);
        }
      }}
    >
      {onClose && (
        <div className={"text-danger " + style.close} onClick={onClose}>
          <FaRegTimesCircle />
        </div>
      )}

      <div>
        <label>Departamento</label>
        <select
          name=""
          id=""
          className="form-control"
          required={required}
          disabled={isDisabled}
          value={state.department}
          onChange={({ currentTarget: { value } }) => person.department(value)}
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
          className="form-control"
          required={required}
          disabled={isDisabled}
          value={state.city}
          onChange={({ currentTarget: { value } }) => person.city(value)}
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
          className="form-control"
          required={required}
          disabled={isDisabled}
          value={state.fullName}
          onChange={({ currentTarget: { value } }) => person.fullName(value)}
          type="text"
          maxLength={30}
        />
      </div>
      <div>
        <label>Correo</label>
        <input
          className="form-control"
          required={required}
          disabled={isDisabled}
          value={state.email}
          onChange={({ currentTarget: { value } }) => person.email(value)}
          type="email"
          maxLength={30}
        />
      </div>
      <div>
        <input
          autoFocus
          className={clsx(["button-red", style.button])}
          disabled={isDisabled}
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
type Form = ReturnType<typeof useState>[2];

export interface Props {
  panel?: boolean;
  disabled?: boolean;
  label?: string;
  person?: Person;
  onRequired?: (person: Person, form: Form) => void;
  onPartial?: (person: Partial<Person>, form: Form) => void;
  onClose?: () => void;
}

interface State extends Person {
  colombia: Colombia | null;
}
