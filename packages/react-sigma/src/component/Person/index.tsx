import React from "react";
import Input from "../Input";
import Button from "../Button";
import { createPopper, PropsContent } from "mapineda-react/Popper";
import usePerson, { ArgHook } from "./state";
import { useColombia } from "../Colombia";
import clsx from "clsx";

import style from "./index.module.scss";

export function Panel(props: PProps) {
  return React.createElement("div", {
    ...props,
    className: clsx(["panel", style.panel, props.className]),
  });
}

const FailEmail = createPopper(({ popper, message }: FProps) => {
  return (
    <div className="popper popper-tooltip" ref={popper}>
      {message}
      <div data-popper-arrow className="arrow"></div>
    </div>
  );
});

export default function (props: Props) {
  const { allFields = false, readOnly = false } = props;

  const colombia = useColombia();

  const [state, person] = usePerson(props);

  const isDisabled =
    readOnly ||
    Boolean(state.message) ||
    (allFields &&
      (!state.full_name || !state.email || !state.city || !state.department));

  const onEnter: OnKey = ({ keyCode }) => {
    if (keyCode === 13) person.check();
  };

  const onClick: OnClick = () => {
    person.check();
  };

  return (
    <Panel className={style._} onKeyDown={isDisabled ? undefined : onEnter}>
      <div>
        <label>Departamento*</label>
        <Input.Select
          readOnly={readOnly}
          placeholder="Norte de Santander"
          value={state.department}
          onChange={person.department}
          options={Object.keys(colombia)}
        />
      </div>
      <div>
        <label>Ciudad*</label>
        <Input.Select
          readOnly={readOnly}
          placeholder="Cucuta"
          value={state.city}
          onChange={person.city}
          options={colombia[state.department] || []}
        />
      </div>
      <div>
        <label>Nombre*</label>
        <Input.Text
          readOnly={readOnly}
          placeholder="Nombre"
          value={state.full_name}
          onChange={person.fullName}
          maxLength={50}
        />
      </div>
      <FailEmail
        portal
        message={state.message}
        enabled={Boolean(state.message)}
      >
        <div>
          <label>Correo*</label>
          <Input.Text
            readOnly={readOnly}
            maxLength={50}
            placeholder="foo@bar.com"
            value={state.email}
            onChange={person.email}
          />
        </div>
      </FailEmail>
      <div title={isDisabled ? "Complete el formulario" : undefined}>
        <Button
          onClick={isDisabled ? undefined : onClick}
          disabled={isDisabled}
          red
        >
          Enviar
        </Button>
      </div>
    </Panel>
  );
}

/**
 * Types
 */
interface Props extends ArgHook {
  readOnly?: boolean;
}

interface FProps extends PropsContent {
  message: string;
}

type OnKey = JSX.IntrinsicElements["div"]["onKeyDown"];

type OnClick = JSX.IntrinsicElements["button"]["onClick"];

type PProps = Omit<JSX.IntrinsicElements["div"], "ref">;
