import React from "react";
import Collapsible from "../Collapsible";

import { useSelector, useDispatch } from "store/hook";

import { table, column } from "http/idiom";

import style from "./index.module.scss";

const { spanish } = column;

const { parseSpanish } = table;

export default () => {
  const table = useSelector((state) =>
    parseSpanish(state.management.table.current)
  );

  const results: any[] = useSelector((state) => state.management.results);

  const { management } = useDispatch();

  const [keys, values] = React.useMemo(() => {
    const idiom = spanish[table];

    const keys = Object.keys(idiom);

    const values = Object.values(idiom);

    const skip: any = "details";

    if (!keys.includes(skip)) {
      return [keys, values];
    }

    const index = keys.indexOf(skip);

    return [
      keys.filter((val, ind) => ind !== index),
      values.filter((val, ind) => ind !== index),
    ];
  }, [table]);

  return (
    <Collapsible className={style._}>
      <table>
        <thead>
          <tr>
            {values.map((val, index) => (
              <th key={index}>{val}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  management.edit(result);
                }}
              >
                {keys.map((key, index) => {
                  return <td key={index}>{result[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Collapsible>
  );
};
