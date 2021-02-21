import React from "react";
import { listenerEvent } from "../../../util";
import clsx from "clsx";

import style from "./index.module.scss";

export default function Text({ onChangeValue, isFormat, onRef, ...props }: Props) {
  if (!onChangeValue) {
    return React.createElement("input", props);
  }

  const onChange: OnChange = ({ currentTarget: { value } }) => {
    if (!isFormat) {
      return onChangeValue(value);
    }

    if (!isFormat(value, props.value || "")) {
      return;
    }

    onChangeValue(value);
  };

  return React.createElement("input", {
    ...props,
    type: props.type || "text",
    onChange: listenerEvent(onChange, props.onChange),
    className: clsx([props.className, "input"]),
    ref: onRef,
  });
};

/**
 * Typings
 */

export type NativeProps = JSX.IntrinsicElements["input"];

type OnChange = NativeProps["onChange"];

type OnRef = JSX.IntrinsicElements["input"]["ref"];

export type IsFormat = (next: string, current: string) => boolean;

export interface Props extends Omit<NativeProps, "value" | "ref"> {
  onChangeValue: (value: string) => void;
  value: string;
  isFormat?: IsFormat;
  onRef?: OnRef;
}
