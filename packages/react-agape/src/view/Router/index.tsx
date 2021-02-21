import React from "react";
import Animation, { Props as PAnimation } from "view/Animation";
import { useDispatch, useSelector } from "store/hook";
import * as type from "store/type";

import { State } from "store";
import { View } from "component/Router";
import { router } from "component/Router/state";

const value: any = {
  selector: () => null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  actionEnd: () => {},
  disabledBody: false,
};

export const Context = React.createContext<TContext>(value);

export const Routers = (props: PropsRouters) => {
  const { setRouters, selector, actionEnd, disabledBody = false } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routers = React.useMemo(() => setRouters(type), []);

  const current = useSelector((state) => selector(state).current);

  const [router] = routers.filter((router) => router.type === current);

  if (!router) {
    // if (process.env.NODE_ENV === "development") {
    //   throw new Error(`missing routers in type: "${current}"`);
    // }

    return null;
  }

  return React.createElement(
    Context.Provider,
    {
      value: { selector, disabledBody, actionEnd },
    },
    React.createElement(router.Component)
  );
};

export const Router = (props: PropsRouter) => {
  const { selector, actionEnd, disabledBody } = React.useContext(Context);

  return React.createElement(Animation, {
    ...props,
    selector: (state) => selector(state).animation,
    actionEnd,
    disabledBody,
  });
};

export default () => {
  return <div>init component </div>;
};

/**
 * Typings
 */

type Type = typeof type;

type Dispatch = ReturnType<typeof useDispatch>;

type TContext = Required<Omit<PropsRouters, "setRouters">>;

export interface PropsRouters<T extends string = string> {
  selector: (state: State) => router.State<T>;
  setRouters: (type: Type) => View<T>[];
  actionEnd: (dispatch: Dispatch) => void;
  disabledBody?: boolean;
}

type PropsRouter = Omit<
  PAnimation,
  "disabledBody" | "hidden" | "selector" | "actionEnd"
>;
