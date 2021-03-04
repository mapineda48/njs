import React from "react";

import { useDisabledBody } from "./disabledBody";

import { useIsMount } from "./isMount";

import clsx from "clsx";

import style from "./index.module.scss";

export default (props: Props) => {
  const {
    enabled,
    active,
    onInEnd,
    onOutEnd,
    animation,
    hidden = false,
    disabledBody = false,
    type = "div",
    ...rest
  } = props;

  const isMount = useIsMount();

  useDisabledBody(active && disabledBody);

  if (!active) {
    if (!enabled) {
      if (!hidden) {
        return null;
      }

      return React.createElement(type, {
        ...rest,
        className: clsx([rest.className, style.hidden]),
      });
    }

    return React.createElement(type, rest);
  }

  const className = clsx([
    rest.className,
    active && style.active,
    enabled && animation.in,
    !enabled && animation.out,
  ]);

  const onKeyDown: OnKeyDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onAnimationEnd: OnEndAnimation = (event) => {
    if (rest.onAnimationEnd) {
      rest.onAnimationEnd(event);
    }

    if (!isMount.current) return;

    if (enabled && onInEnd) {
      onInEnd();
    } else if (!enabled && onOutEnd) {
      onOutEnd();
    }
  };

  return React.createElement(type, {
    ...rest,
    className,
    onAnimationEnd,
    onKeyDownCapture: onKeyDown,
  });
};

/**
 * Typings
 */

type NativeProps = JSX.IntrinsicElements["div"];

export type OnEndAnimation = NativeProps["onAnimationEnd"];

type OnKeyDown = NativeProps["onKeyDown"];

export interface Props extends NativeProps {
  enabled: boolean;
  active: boolean;
  animation: {
    in: string;
    out: string;
  };
  onInEnd?: () => void;
  onOutEnd?: () => void;
  disabledBody?: boolean;
  hidden?: boolean;
  type?: string;
}
