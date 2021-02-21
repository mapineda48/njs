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
        <p>{state.message || 'unknown'}</p>
      </Panel>
      <Action>
        <Button onClick={sigma.welcome}>Aceptar</Button>
      </Action>
    </>
  );
}
