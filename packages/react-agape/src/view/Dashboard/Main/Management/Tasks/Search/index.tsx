import React from "react";
import clsx from "clsx";
import { FaSearch } from "react-icons/fa";
import input, { Input } from "view/Input/input";
import { useSelector } from "store/hook";
import { filter } from "http/filter";
import { table, column } from "http/idiom";
import { createPopper, PropsContent } from "component/Popper";
import Fade from "../Fade";
import { useWhere } from "./hook";

import style from "./index.module.scss";

const columnInSpanish: any = column.spanish;

const { parseSpanish } = table;

const List = ({ onRef, inlineStyle, list }: PList) => {
  return (
    <ul ref={onRef} style={inlineStyle} className={clsx([style.list, "panel"])}>
      {list.map(({ filter, onClick }, index) => {
        return (
          <li key={index} onClick={onClick}>
            {filter}
          </li>
        );
      })}
    </ul>
  );
};

const Filter = createPopper({
  target: "span",
  Content: List,
  options: {
    placement: "top",
  },
});

export default () => {
  const tableInSpanish = useSelector((state) => state.management.table.current);

  const { table, filters } = React.useMemo(() => {
    const table = parseSpanish(tableInSpanish);

    const filters: string[] = filter[table];

    return {
      table,
      filters,
    };
  }, [tableInSpanish]);

  const [enabled, setEnabled] = React.useState(false);

  const [column, setColumn] = React.useState(filters[0]);

  React.useMemo(() => {
    setColumn(filters[0]);
  }, [filters]);

  const [setWhere, getWhere, state] = useWhere();

  const list = React.useMemo(() => {
    const spanish: any = columnInSpanish[table];

    return filters.map((filter) => {
      return {
        filter: spanish[filter] as string,
        onClick: () => {
          setEnabled(false);
          setColumn(filter);
          setWhere({ [filter]: "" });
        },
      };
    });
  }, [filters, setWhere, table]);

  const Current: Input = (input as any)[table][column];

  if (!Current) {
    if (process.env.NODE_ENV === "development") {
      return <div>{JSON.stringify({ table, column })}</div>;
    }

    return null;
  }

  return (
    <Fade
      className={style._}
      onKeyDown={({ keyCode }) => {
        if (!(keyCode === 13)) return;
        getWhere();
      }}
    >
      <div
        className={style.filter}
        onMouseEnter={() => setEnabled(true)}
        onMouseLeave={() => setEnabled(false)}
      >
        <Filter enabledPopper={enabled} propsPopper={{ list }}>
          {columnInSpanish[table][column]}
        </Filter>
      </div>
      <div>
        <Current
          value={state.where.value}
          onChangeValue={(value: any) => setWhere({ [column]: value })}
        />
      </div>
      <div title="Buscar" className={style.search} onClick={getWhere}>
        <FaSearch />
      </div>
    </Fade>
  );
};

/**
 * Typings
 */

interface PList extends PropsContent {
  list: {
    filter: string;
    onClick: () => void;
  }[];
}
