import React from "react";

import clsx from "clsx";

export default function Button(props: Props) {
  const { loading, green, red, ...rest } = props;

  const className = clsx([
    rest.className,
    "btn",
    "btn-primary",
    green && "btn-success",
    red && "btn-danger",
    loading && "btn-loader",
  ]);

  return React.createElement("button", { ...rest, className });
}

/**
 * Typings
 */
interface Props extends Omit<NativeProps, "ref"> {
  loading?: boolean;
  green?: boolean;
  red?: boolean;
}

type NativeProps = JSX.IntrinsicElements["button"];
