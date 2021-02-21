import React from "react";
import clsx from "clsx";

export default function (props: Props) {
  const { value = "", onChange, ...prop } = props;

  return React.createElement("input", {
    ...prop,
    className: clsx(["input", prop.className]),
    value: value?.toString() || "",
    onChange: ({ currentTarget: { value } }) => onChange(value),
  });
}

/**
 * Typings
 */

type NativeProps = JSX.IntrinsicElements["input"];

export interface Props extends Omit<NativeProps, "onChange"> {
  onChange: (value: string) => void;
}
