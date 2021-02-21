import http from "../../../http";
import * as query from "shared";
import { Action } from ".";

export async function fetchPersons(sigma: Action, opt: query.Select) {
  sigma.loading();
  try {
    const persons = await http.fetchPerson(opt);

    if (!persons.length) {
      sigma.notify("Sin Resultados");
      return;
    }

    if (persons.length === 1) {
      const [person] = persons;
      sigma.person(person);
      return;
    }

    sigma.persons(persons);
  } catch (error) {
    console.log(error);
    sigma.notify(error.message || "Error en Personas");
  }
}

export async function insertPerson(sigma: Action, person: query.Insert) {
  sigma.loading();
  try {
    await http.insertPerson(person);
    sigma.notify("Persona Agregada");
  } catch (error) {
    console.log(error);
    sigma.notify(error.message || "Error al insertar");
  }
}

export async function updatePerson(sigma: Action, person: query.Update) {
  sigma.loading();
  try {
    await http.updatePerson(person);
    sigma.notify("Persona Actualizada");
  } catch (error) {
    console.log(error);
    sigma.notify(error.message || "Error al actualizar");
  }
}

export async function deletePerson(sigma: Action) {
  sigma.loading();

  const state = await sigma.getState();

  const { id } = state.person;

  try {
    await http.deletePerson(id);
    sigma.notify("Persona Eliminada");
  } catch (error) {
    console.log(error);
    sigma.notify(error.message || "Error al Eliminar");
  }
}
