import React from "react";
import Collapsible from "../../Collapsible";
import Tool from "./Tool";

import { useSelector } from "store/hook";

import clsx from "clsx";

import style from "./index.module.scss";

export default (props: Props) => {
  const isReadOnly = useSelector((state) => state.management.readonly);

  const onKeyDown = React.useMemo((): OnKeyDown => {
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
  }, []);

  return (
    <Collapsible
      className={clsx([style._, isReadOnly && style.readOnly])}
      onKeyDown={isReadOnly ? onKeyDown : undefined}
      onInEnd={({ management }) => management.toggleDelete()}
      onOutEnd={({ management }) => management.removeTool()}
    >
      {props.children}
      <Tool />
    </Collapsible>
  );
};

/**
 * Typings
 */

interface Props {
  children: React.ReactNode;
}

type OnKeyDown = JSX.IntrinsicElements["div"]["onKeyDown"];
