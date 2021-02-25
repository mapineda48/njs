import http from "../http";
import { Landing } from ".";
import type { Person } from "shared";
import type { Form } from "components/Person/state";

export async function fetchColombia(landing: Landing) {
  landing.loading();
  try {
    const colombia = await http.fetchColombia();
    landing.setColombia(colombia);
  } catch (error) {
    landing.confirm({
      error: true,
      message: error.message,
      onClick: landing.confirm,
    });
  } finally {
    landing.loading(false);
  }
}

export async function insertPerson(
  landing: Landing,
  person: Person,
  form: Form
) {
  landing.loading();

  try {
    await http.insertPerson(person);
    form.clear();
    landing.confirm({
      message: "Insertado Correctamente",
      onClick: landing.confirm,
    });
  } catch (error) {
    landing.confirm({
      error: true,
      message: error.message,
      onClick: landing.confirm,
    });
  } finally {
    landing.loading(false);
  }
}
