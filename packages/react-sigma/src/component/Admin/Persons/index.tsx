import React from "react";
import Action from "../Action";
import Button from "../../Button";
import { Panel } from "../../Person";
import { useSigma } from "../state";
import { Record } from "shared";

import style from "./index.module.scss";

const labels = ["ID", "Nombre", "Email", "Departamento", "Ciudad"];

export function Table(props: Props) {
  const Persons = props.persons.map((person, index) => {
    return (
      <tr
        key={index}
        onClick={() => {
          props.onClick(person);
        }}
      >
        <td>{person.id}</td>
        <td>{person.full_name}</td>
        <td>{person.email}</td>
        <td>{person.department}</td>
        <td>{person.city}</td>
      </tr>
    );
  });

  return (
    <Panel className={style._}>
      <div>
        <table>
          <thead>
            <tr>
              {labels.map((label, index) => {
                return <th key={index}>{label}</th>;
              })}
            </tr>
          </thead>
          <tbody>{Persons}</tbody>
        </table>
      </div>
    </Panel>
  );
}

export default function () {
  const [state, sigma, thunk] = useSigma();

  return (
    <>
      <Table persons={state.persons} onClick={sigma.person} />
      <Action>
        <Button onClick={sigma.welcome}>Volver</Button>
      </Action>
    </>
  );
}

/**
 * Types
 */

interface Props {
  persons: Record[];
  onClick: (person: Record) => void;
}
