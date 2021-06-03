import http from "../../http";

import type { Grants } from ".";

export async function fetchOpportunity(grants: Grants, page: number) {
  grants.loading();
  try {
    const opportunitys = await http.fetchOpportunity(page);

    const key = page.toString();

    grants.addopportunity({
      [key]: opportunitys,
    });
  } catch (error) {
    grants.showMessage(error.message);
  } finally {
    grants.loading(false);
  }
}

export async function fetchDetail(grants: Grants, id: number) {
  grants.loading();

  try {
    const detail = await http.fetchDetail(id);

    const key = id.toString();

    grants.addDetail({
      [key]: detail,
    });
  } catch (error) {
    grants.showMessage(error.message);
  } finally {
    grants.loading(false);
  }
}
