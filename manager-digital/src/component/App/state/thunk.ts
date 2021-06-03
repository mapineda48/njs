import http from "service/http";
import { amountResults, Person, Select, Record, Update } from "service";
import type { Admin } from ".";

export async function insertPerson(admin: Admin, person: Person) {
  admin.create.loading();

  try {
    await http.insertPerson(person);
    admin.create.confirm({
      message: `Se ha insertado a "${person.full_name}" correctamente.`,
      onConfirm: () => admin.create.confirm(null),
    });
  } catch (error) {
    admin.create.confirm({
      error: true,
      message: error.message,
      onConfirm: () => admin.create.confirm(null),
    });
  } finally {
    admin.create.loading(false);
  }
}

export async function fetchPersons(admin: Admin, query: Select) {
  admin.search.loading();

  try {
    const results = await http.selectPerson(query);
    if (!results.length) {
      admin.search.confirm({
        message: "No se encontraron registros",
        onConfirm: admin.search.goFilter,
      });
      return;
    }

    admin.search.goResults(query, results);
  } catch (error) {
    admin.search.confirm({
      error: true,
      message: error.message,
      onConfirm: () => admin.search.confirm(null),
    });
  } finally {
    admin.search.loading(false);
  }
}

export async function fetchPersonWithScroll(admin: Admin) {
  admin.search.scroll.isLoading();
  try {
    const state = await admin.getState();

    const query = state.search.query;

    const nextQuery: Select = {
      ...query,
      startRow: query.startRow ? query.startRow + amountResults : amountResults,
    };

    const results = await http.selectPerson(nextQuery);

    if (!results.length) {
      admin.search.scroll.setNotFetch();
      return;
    }

    admin.search.setResults(nextQuery, results);
  } catch (error) {
    console.log(error);
  } finally {
    admin.search.scroll.isLoading(false);
  }
}

export async function removePerson(admin: Admin, id: number, index: number) {
  try {
    await http.deletePerson(id);
    admin.search.removeResult(index);
  } catch (error) {
    console.log(error);
  } finally {
  }
}

export async function editPerson(admin: Admin, person: Record, index: number) {
  try {
    await http.updatePerson(person);
    admin.search.editResult(index, person as any);
  } catch (error) {
    console.log(error);
  } finally {
  }
}
