import * as type from "../type";
import { state as init, State } from "../state";
import { router, animation } from "../../../component/Router/state";
import * as detail from "./detail";

import { Reducer } from "redux";
import { Action } from "../action";

const reducer: Reducer<State, Action> = (state = init, action) => {
  switch (action.type) {
    case type.action.INIT:
      return { ...state, type: action.type };

    case type.action.GO:
      return {
        ...state,
        type: action.type,
        view: router.go(state.view, { type: action.view }),
      };

    case type.action.NOTIFY:
      return {
        ...state,
        type: action.type,
        view: router.notify(state.view, {
          type: action.view,
          message: action.message,
        }),
      };

    case type.action.END_VIEW:
      return {
        ...state,
        type: action.type,
        view: router.end(state.view),
      };

    case type.action.BACK:
      return {
        ...state,
        type: action.type,
        view: router.back(state.view),
      };

    case type.action.RESET:
      return { ...init, type: action.type };

    case type.action.ADD_COD:
      return { ...state, type: action.type, cod: action.cod };

    case type.action.ADD_CLIENT:
      return { ...state, type: action.type, client: action.client };

    case type.action.ADD_SUPPLIER:
      return { ...state, type: action.type, supplier: action.supplier };

    case type.action.ADD_DETAIL:
      return {
        ...state,
        type: action.type,
        ...detail.reducer(action.detail, state.details),
      };

    case type.action.REMOVE_DETAIL:
      return {
        ...state,
        type: action.type,
        ...detail.reducer(action.id, state.details),
      };

    case type.action.SET_IS_READY_DETAIL:
      return {
        ...state,
        type: action.type,
        isReadyDetail: !state.isReadyDetail,
      };

    case type.action.SET_IS_PAID:
      return { ...state, type: action.type, isPaid: !state.isPaid };

    case type.action.SET_IS_COMPLETE:
      return { ...state, type: action.type, isComplete: !state.isComplete };

    case type.action.CANCEL:
      return {
        ...init,
        type: action.type,
        view: router.back(state.view),
      };

    case type.action.TOGGLE_INFO:
      return {
        ...state,
        type: action.type,
        animation: animation.setToggle(state.animation),
      };

    case type.action.END_INFO:
      return {
        ...state,
        type: action.type,
        animation: animation.setEnd(state.animation),
      };

    default:
      return state;
  }
};

export default reducer;

/**
 * Typings
 */
