import React from "react";
import { Panel } from "../../Person";
import Action from "../Action";
import Button from "../../Button";
import Person from "../../Person";
import { useSigma } from "../state";

import style from "./index.module.scss";

export default function () {
  const [state, sigma, thunk] = useSigma();

  return (
    <>
      <Person
        readOnly={state.reandOnly}
        onSend={(person) => {
          thunk.fetchPersons(person);
        }}
      />
      <Action>
        <Button onClick={sigma.welcome}>Volver</Button>
      </Action>
    </>
  );
}
