import React from "react";
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
        current={state.person}
        readOnly={state.reandOnly}
        onSend={(person) => {
          const { id } = state.person;
          const update = { ...person, id };

          thunk.updatePerson(update);
        }}
      />
      <Action>
        <Button onClick={sigma.back}>Volver</Button>
        <Button onClick={sigma.edit}>Editar</Button>
        <Button onClick={thunk.deletePerson}>Eliminar</Button>
      </Action>
    </>
  );
}
