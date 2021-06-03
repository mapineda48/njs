import * as type from "./type";
import * as init from "./state";
import * as action from "./action";
import { router } from "component/Router/state";

import { Reducer as ReduxReducer } from "redux";

const reducer: Reducer = (state = init.state, action) => {
  switch (action.type) {
    case type.action.INIT:
      return { ...state, type: action.type };

    case type.action.RESET:
      return { ...init.state, type: action.type, root: state.root };

    case type.app.LOGIN: {
      return {
        ...state,
        type: action.type,
        root: router.go(state.root, { type: type.app.LOGIN }),
      };
    }
    case type.app.DASHBOARD: {
      return {
        ...state,
        type: action.type,
        token: action.token,
        employee: action.employee,
        root: router.go(state.root, { type: type.app.DASHBOARD }),
        main: router.go(state.main, { type: type.main.WELCOME }),
      };
    }

    case type.app.END: {
      return {
        ...state,
        type: action.type,
        root: router.end(state.root),
      };
    }

    case type.main.WELCOME:
      return {
        ...state,
        type: action.type,
        main: router.go(state.main, { type: type.main.WELCOME }),
      };
    case type.main.INVOICE:
      return {
        ...state,
        type: action.type,
        main: router.go(state.main, { type: type.main.INVOICE }),
      };
    case type.main.MANAGEMENT:
      return {
        ...state,
        type: action.type,
        main: router.go(state.main, { type: type.main.MANAGEMENT }),
      };

    case type.main.END: {
      return {
        ...state,
        type: action.type,
        main: router.end(state.main),
      };
    }

    default:
      return state;
  }
};

export default reducer;

/**
 * Typings
 */

type Reducer = ReduxReducer<init.State, action.Action>;
