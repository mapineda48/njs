import React from "react";
import Input, { NativeProps } from "../Text";
import * as format from "./format";

import style from "./index.module.scss";

const existsComma = (value: string) => /,/g.test(value);

export default ({ onChangeValue, value, options = {}, ...props }: Props) => {
  const [comma, setComma] = React.useState(false);

  const current = format.add(
    typeof value === "number" ? value : parseFloat(value),
    options
  );

  const changeValue = (next: string) => {
    const number = format.remove(next);

    if (options.allowFloat && existsComma(next) && !existsComma(current)) {
      setComma(true);
    }

    onChangeValue(number);

    if (comma) {
      setComma(false);
    }
  };

  return React.createElement(Input, {
    ...props,
    value: current + (comma ? "," : ""),
    onChangeValue: changeValue,
  });
};

/**
 * Typings
 */

export interface Props extends Omit<NativeProps, "value"> {
  value: number | string;
  onChangeValue: (value: number) => void;
  options?: format.Option;
}
