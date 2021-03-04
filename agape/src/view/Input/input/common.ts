import React from "react";
import Input from "component/Input";

export const createInput: WrapInput = (data) => {
  const type = data.type;

  const init: any = data.props || {};

  return (props: any) => {
    return React.createElement((Input as any)[type], {
      required: true,
      ...props,
      ...init,
    });
  };
};

/**
 * Typings
 */
type TInput = typeof Input;

type KInput = keyof TInput;

type Props<T> = T extends KInput ? Parameters<TInput[T]>[number] : undefined;

type WrapInput = <T extends KInput>(data: {
  type: T;
  props?: Partial<Props<T>>;
}) => (props: Props<T>) => JSX.Element;

export type Input = TInput[KInput];
