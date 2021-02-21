import React, { ReactNode } from "react";

import clsx from "clsx";

import style from "./index.module.scss";

/**
 * https://medium.com/@dhilipkmr/ripple-in-react-3162875cc9af
 */
export default ({ children }: Props) => {
  const [state, setState] = React.useState<State>([]);

  if (!React.isValidElement(children)) {
    return null;
  }

  /**
   * prevent unhandler error
   * only support react core elements
   */
  if (process.env.NODE_ENV === "development") {
    if (typeof children.type === "function") {
      console.error("Popper only core react elements", children);
      return null;
    }
  }

  const props: NativeProps = children.props;

  const listenerClick: OnClick = (event) => {
    const element = event.currentTarget;

    const size = element.offsetWidth;

    const pos = element.getBoundingClientRect();

    const x = event.pageX - pos.x - size / 2;

    const y = event.pageY - pos.y - size / 2;

    setState((styles) => [
      ...styles,
      {
        top: y + "px",
        left: x + "px",
        height: size + "px",
        width: size + "px",
      },
    ]);

    if (props.onClick) {
      props.onClick(event);
    }
  };

  const remove = (index: number) => {
    if (index < state.length - 1) {
      return;
    }

    setState([]);
  };

  /**
   * Spans Elements
   */
  const spans = state.map((inline, index) => {
    return React.createElement("span", {
      key: index,
      className: style.span,
      style: inline,
      onAnimationEnd: () => remove(index),
    });
  });

  return React.cloneElement(children, {
    onClick: listenerClick,
    children: [props.children, spans],
    className: clsx([props.className, state.length > 0 && style._]),
  });
};

/**
 * Typings
 */

type State = React.CSSProperties[];

export interface Props {
  children?: ReactNode;
}

type OnClick = NativeProps["onClick"];

type NativeProps = JSX.IntrinsicElements["div"];
