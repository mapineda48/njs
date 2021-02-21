import grants from "../../../http";
import { Action } from "..";

const amountPage = 25;

export async function fetchPage(action: Action, page = 1) {
  const { opportunitys } = await action.getState();

  if (opportunitys[page]) {
    action.goPage(page);
    return Promise.resolve();
  }

  const startRecordNum = page * amountPage;

  try {
    action.loading(`fetching page ${page}`);

    const opportunitys = await grants.fetchOpportunity(startRecordNum);

    action.addPage(page, opportunitys);
  } catch (error) {
    action.notify(error.message || "unknown error");
  }
}

export async function fetchDetail(action: Action, id: number) {
  try {
    action.loading(`fetching detail ${id}`);

    const detail = await grants.fetchDetail(id);

    action.showDetail(detail);
  } catch (error) {
    action.notify(error.message || "unknown error");
  }
}
