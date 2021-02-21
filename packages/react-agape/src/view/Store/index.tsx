import React from "react";
import { Provider } from "react-redux";
import createStore from "store";
import * as action from "store/action";
import { Dispatch, wrapDisaptch } from "store/hook/dispatch/wrap";

export default (props: Props) => {
  const store = createStore();

  return (
    <Provider store={store}>
      <Dispatch.Provider value={wrapDisaptch(store.dispatch, action)}>
        {props.children}
      </Dispatch.Provider>
    </Provider>
  );
};

/**
 * Typings
 */

interface Props {
  children: React.ReactNode;
}
