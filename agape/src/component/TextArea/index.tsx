import React from "react";

import style from "./index.module.scss";
import clsx from "clsx";

export default (props: Props) => {
  const { placeholder, ...rest } = props;

  return (
    <textarea {...rest} className={clsx(["input", style._, props.className])} />
  );
};

/**
 * Typings
 */

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

/**
 * Typings
 */

type AutoSize = () => (ref: HTMLTextAreaElement | null) => void;
