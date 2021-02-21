import React from "react";
import clsx from "clsx";
import Fade from "../Tasks/Fade";

import { createRouters } from "view/Router/util";
import { createPopper, PropsContent } from "component/Popper";
import { table } from "http/idiom";
import { setHeight } from "view/Dashboard/Main/Invoice/Info/Search/index.vanilla";
import { useDispatch } from "store/hook";

import style from "./index.module.scss";

const tables = Object.values(table.spanish);

const List = ({ onRef, inlineStyle, close, effect }: PList) => {
  const { management } = useDispatch();

  effect((ref) => setHeight(ref));

  return (
    <ul ref={onRef} style={inlineStyle} className={clsx(["panel", style.list])}>
      {tables.map((table, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              management.updateTable(table);
              close();
            }}
          >
            {table}
          </li>
        );
      })}
    </ul>
  );
};

const Table = createPopper({
  target: "span",
  options: { placement: "bottom" },
  Content: List,
});

const Views = tables.map((table) => {
  const Component = () => {
    const [state, setState] = React.useState(false);

    const toggle = React.useCallback(() => setState((state) => !state), [
      setState,
    ]);

    return (
      <Fade className={style.table} onMouseEnter={toggle} onMouseLeave={toggle}>
        <Table enabledPopper={state} propsPopper={{ close: toggle }}>
          {table}
        </Table>
      </Fade>
    );
  };

  return {
    type: table,
    Component,
  };
});

export default createRouters({
  selector: ({ management }) => management.table,
  actionEnd: ({ management }) => management.endTable(),
  setRouters: () => Views,
});

/**
 * Typings
 */

interface PList extends PropsContent {
  close: () => void;
}
