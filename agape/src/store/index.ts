import { createStore } from "redux";
import reducer from "./reducer";
import enhancer from "./middleware";
import { saveState, loadState } from "./sessionStorage";

const create = () => {
  const persistedState = loadState();

  const store = createStore(reducer, persistedState, enhancer);

  store.subscribe(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("redux", store.getState());
      return;
    }

    saveState(store.getState());
  });

  return store;
};

export default create;

/**
 * Typings
 */

export type State = ReturnType<typeof reducer>;

export type Store = ReturnType<typeof create>;

export type Dispatch = Store["dispatch"];

export type GetState = Store["getState"];
