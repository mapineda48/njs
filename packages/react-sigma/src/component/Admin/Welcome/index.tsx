import React from "react";
import { Panel } from "../../Person";
import Action from "../Action";
import Button from "../../Button";
import { useSigma } from "../state";

import style from "./index.module.scss";

export default function () {
  const [state, sigma] = useSigma();

  return (
    <>
      <Panel className={style._}>
        <p>
          Bienvenido a la vista de administración, por favor seleccione alguna
          de las acciones en el panel inferior para continuar.
        </p>
      </Panel>
      <Action>
        <Button onClick={sigma.search}>Buscar</Button>
        <Button onClick={sigma.create}>Crear</Button>
      </Action>
    </>
  );
}
