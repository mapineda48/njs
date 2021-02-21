import * as type from "../type";
import { OppHits, RestDetail } from "shared";
import { State } from "..";
import pagination from "../pagination";

export function addPage(
  state: State,
  page: number,
  opportunitys: OppHits[]
): State {
  const nexts = [...state.opportunitys];

  nexts[page] = opportunitys;

  return {
    ...state,
    page,
    opportunitys: nexts,
    current: type.OPPORTUNITYS,
    pagination: pagination(page),
  };
}

export function goPage(state: State, page: number): State {
  return {
    ...state,
    page,
    pagination: pagination(page),
  };
}

export function showDetail(state: State, detail: RestDetail): State {
  return { ...state, help: true, detail, current: type.DETAIL };
}

export function showOpportunitys(state: State): State {
  return { ...state, help: true, current: type.OPPORTUNITYS };
}

export function loading(state: State, message: string): State {
  return { ...state, help: false, message, current: type.LOADING };
}

export function notify(state: State, message: any): State {
  return { ...state, help: false, current: type.NOTIFICATION, message };
}

export function firstRender(state: State): State {
  return { ...state, firstRender: false };
}
