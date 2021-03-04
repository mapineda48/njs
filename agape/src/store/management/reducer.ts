import * as type from "./type";
import { state as init, State } from "./state";
import { router, animation } from "../../component/Router/state";
import { table } from "../../http/idiom";
import { create } from "../../http/table";

import { Action } from "./action";
import { Reducer } from "redux";

const { parseSpanish, spanish } = table;

const isInvoice = (state: State) =>
  state.table.current === spanish.buy || state.table.current === spanish.sell;

const reducer: Reducer<State, Action> = (state = init, action) => {
  switch (action.type) {
    case type.action.RESET:
      return { ...init, type: action.type };

    case type.action.INIT:
      return {
        ...state,
        type: action.type,
        task: router.init(state.task),
        collapsible: router.init(state.collapsible),
        create: !isInvoice(state),
      };

    case type.view.SEARCH:
      return {
        ...state,
        type: action.type,
        task: router.go(state.task, action),
        collapsible: router.go(state.collapsible, action),
      };

    case type.view.RESULTS:
      return {
        ...state,
        type: action.type,
        task: router.go(state.task, action),
        collapsible: router.go(state.collapsible, action),
        results: [...(action.results as any)],
      };

    case type.action.SET_RESULTS:
      return {
        ...state,
        type: action.type,
        results: [...(action.results as any)],
      };

    case type.action.SET_PRODUCTS:
      return {
        ...state,
        type: action.type,
        products: [...action.products],
      };

    case type.view.CREATE:
      return {
        ...state,
        type: action.type,
        task: router.go(state.task, action),
        collapsible: router.go(state.collapsible, action),
        record: {
          current: create(parseSpanish(state.table.current)),
          preview: create(parseSpanish(state.table.current)),
        },
        readonly: false,
        create: true,
      };

    case type.view.EDIT:
      return {
        ...state,
        type: action.type,
        task: router.go(state.task, action),
        collapsible: router.go(state.collapsible, action),
        record: {
          current: {
            ...action.record,
          },
          preview: {
            ...action.record,
          },
        },
        create: false,
        readonly: true,
      };

    case type.notification.LOADING:
    case type.notification.NOTIFICATE:
    case type.notification.CONFIRM:
    case type.notification.FINISH: {
      return {
        ...state,
        type: action.type,
        task: router.notify(state.task, action),
        collapsible: router.notify(state.collapsible, action),
      };
    }

    case type.action.END_TASK: {
      return {
        ...state,
        type: action.type,
        task: router.end(state.task),
      };
    }

    case type.action.BACK: {
      return {
        ...state,
        type: action.type,
        task: router.back(state.task),
        collapsible: router.back(state.collapsible),
      };
    }

    case type.action.UPDATE_TABLE: {
      return {
        ...state,
        type: action.type,
        table: router.go(state.table, { type: action.table }),
        task: router.init(state.task),
        collapsible: router.init(state.collapsible),
        create: !(
          action.table === spanish.buy || action.table === spanish.sell
        ),
      };
    }

    case type.action.END_TABLE: {
      return {
        ...state,
        table: router.end(state.table),
      };
    }

    case type.action.END_COLLAPSIBLE: {
      return {
        ...state,
        type: action.type,
        collapsible: router.end(state.collapsible),
      };
    }

    case type.action.UPDATE: {
      return {
        ...state,
        type: action.type,
        record: {
          ...(state.record as any),
          preview: {
            ...(state.record as any).preview,
            ...action.updated,
          },
        },
      };
    }

    case type.action.TOGGLE_EDIT: {
      if (isInvoice(state)) {
        return state;
      }

      return {
        ...state,
        type: action.type,
        edit: animation.setToggle(state.edit),
      };
    }

    case type.action.END_EDIT:
      return {
        ...state,
        type: action.type,
        edit: animation.setEnd(state.edit),
      };

    case type.action.TOGGLE_DELETE:
      if (!state.readonly) {
        return state;
      }

      return {
        ...state,
        type: action.type,
        delete: animation.setToggle(state.delete),
      };

    case type.action.END_DELETE:
      return {
        ...state,
        type: action.type,
        delete: animation.setEnd(state.delete),
      };

    case type.action.REMOVE_TOOL:
      return {
        ...state,
        type: action.type,
        delete: animation.setDisabled(),
        edit: animation.setDisabled(),
      };

    case type.action.TOGGLE_READONLY:
      return { ...state, type: action.type, readonly: !state.readonly };

    default:
      return state;
  }
};

export default reducer;

/**
 * Typings
 */
