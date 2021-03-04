import React from "react";
import ReactDOM from "react-dom";
import { createPopper as createPopperCore, Options } from "@popperjs/core";
import { root } from 'common';
import { listenerEvent } from "../../util";

import style from "./index.module.scss";

/**
 * https://popper.js.org/docs/v2/tutorial
 */

export const Popper: Component = (props: any) => {
  const {
    target = "div",
    portal,
    enabledPopper = false,
    propsPopper = {},
    options,
    Content,
    ...rest
  } = props;

  const refTarget = React.useRef<HTMLElement>(null);

  const refPopper = React.useRef<HTMLElement>(null);

  const cbEffect = React.useRef<CB>(null);

  const effect = React.useCallback((cb: CB) => {
    (cbEffect as any).current = cb;
  }, []);

  const [show, setShow] = React.useState(false);

  const isEnabled = typeof enabledPopper === "boolean" ? enabledPopper : show;

  React.useEffect(() => {
    if (!refTarget.current || !refPopper.current || !isEnabled) {
      return;
    }

    const instance = createPopperCore(
      refTarget.current,
      refPopper.current,
      options
    );

    refPopper.current.style.display = "";

    if (cbEffect.current) cbEffect.current(refPopper.current);

    return () => instance.destroy();
  });

  let propsTarget: any = {
    ...rest,
    key: 0,
    ref: refTarget,
  };

  if (enabledPopper === "auto") {
    propsTarget = {
      ...propsTarget,
      onMouseEnter: listenerEvent(() => setShow(true), rest.onMouseOver as any),
      onMouseLeave: listenerEvent(() => setShow(false), rest.onMouseOut as any),
    };
  }

  if (!isEnabled) {
    return React.createElement(target, propsTarget);
  }

  const pipePropsPopper = {
    ...(propsPopper as any),
    key: 1,
    onRef: refPopper,
    inlineStyle: { display: "none" },
    effect,
  };

  if (!portal) {
    return React.createElement(React.Fragment, undefined, [
      React.createElement(target, propsTarget),
      React.createElement(Content, pipePropsPopper),
    ]);
  }

  return React.createElement(React.Fragment, undefined, [
    React.createElement(target, propsTarget),
    ReactDOM.createPortal(React.createElement(Content, pipePropsPopper), root),
  ]);
};

export default Popper;

export const createPopper: Creator = (input: any) => {
  const { target, options, Content, portal } = input;

  return (props: any) => {
    return React.createElement(Popper, {
      ...props,
      target,
      options,
      Content,
      portal,
    });
  };
};

/**
 * Typings
 */

type CB = (ref: HTMLElement) => void;

export interface PropsContent {
  onRef: React.RefObject<any>;
  inlineStyle: React.CSSProperties;
  effect: (cb: CB) => void;
}

type EnabledPopper = boolean | "auto";

interface Props {
  portal?: boolean;
  enabledPopper?: EnabledPopper;
  options: Partial<Options>;
  Content: (props: PropsContent) => JSX.Element | null;
}

type Component = (
  props: Props & Omit<JSX.IntrinsicElements["div"], "ref">
) => JSX.Element | null;

/**
 * Util
 */

type TElement = keyof JSX.IntrinsicElements;

type Input<T extends TElement, C extends PropsContent> = {
  target: T;
  options: Partial<Options>;
  Content: (props: C) => JSX.Element | null;
  portal?: boolean;
};

type PipeContent<T> = keyof Omit<T, keyof PropsContent> extends never
  ? Pick<Props, "enabledPopper">
  : Pick<Props, "enabledPopper"> & {
      propsPopper: Omit<T, keyof PropsContent>;
    };

type Creator = <
  T extends TElement,
  C extends PropsContent,
  N = Omit<JSX.IntrinsicElements[T], "ref">
>(
  input: Input<T, C>
) => (props: N & PipeContent<C>) => JSX.Element | null;
