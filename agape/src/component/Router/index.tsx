import React from "react";
import Animation, { Props as PAnimation, OnEndAnimation } from "../Animation";

import Context, { useContextRouter } from "./Context";

import { useRouter, Create } from "./hook";

import style from "./index.module.scss";

export const Routers = (props: PropsRouters) => {
  const { selectorViews, disabledBody = false, create } = props;

  const [state, router] = useRouter(create);

  const views = React.useMemo(selectorViews, []);

  const [view] = views.filter((view) => view.type === state.current);

  if (!view) {
    return <div>{"missing router " + state.current}</div>;
  }

  return React.createElement(
    Context.Provider,
    {
      value: {
        state,
        router,
        disabledBody,
      },
    },
    React.createElement(view.Component)
  );
};

export const Router = (props: PropsRouter) => {
  const { router, state, disabledBody } = useContextRouter();

  const { animation } = state;

  const onAnimationEnd: OnEndAnimation = (event) => {
    if (props.onAnimationEnd) {
      props.onAnimationEnd(event);
    }

    const { currentTarget, target } = event;

    if (currentTarget !== target) {
      return;
    }

    router.end();
  };

  return React.createElement(Animation, {
    ...props,
    onAnimationEnd,
    enabled: animation.in,
    active: animation.active,
    disabledBody,
  });
};

/**
 * Typings
 */

export interface View<T extends string = string> {
  type: T;
  Component: (...args: any[]) => JSX.Element | null;
}

export interface PropsRouters<T extends string = string> {
  create: Create;
  selectorViews: () => View<T>[];
  disabledBody?: boolean;
}

interface PropsRouter
  extends Omit<PAnimation, "enabled" | "active" | "disabledBody" | "hidden"> {}
