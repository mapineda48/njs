import React, { CSSProperties } from "react";
import { useInMediaQuery } from "util/hook/inMediaQuiery";

import style from "./index.module.scss";

export default (props: Props) => {
  const inMedia = useInMediaQuery("(max-width: 600px)");

  const inLine: CSSProperties = {
    gridColumn: !inMedia ? props.from + " / " + props.to : undefined,
    alignItems: props.initial ? "initial" : undefined,
  };

  return (
    <div className={style._} style={inLine}>
      <label>{props.label + ": "}</label>
      {props.children}
    </div>
  );
};

/**
 * Typings
 */

interface Props {
  children: JSX.Element;
  label: string;
  from: number;
  to: number;
  initial?: boolean;
}
