import React from "react";
import clsx from "clsx";
import { useGrants } from "App/Context";

import style from "./index.module.scss";

/**
 * https://www.w3schools.com/css/tryit.asp?filename=trycss_ex_pagination_active_round
 */

export default function () {
  const [state, , thunk] = useGrants();

  const { pagination, page } = state;

  return (
    <div className={style._}>
      <ul className={style.pagination}>
        {page > 1 && <li onClick={() => thunk.fetchPage(1)}>«</li>}
        {Boolean(pagination.back) && (
          <li onClick={() => thunk.fetchPage(pagination.back)}>
            {`${pagination.back} ..`}
          </li>
        )}
        {pagination.ranges.map((val, ind) => {
          const isCurrent = val === page;
          return (
            <li
              key={ind}
              className={clsx([isCurrent && style.active])}
              onClick={!isCurrent ? () => thunk.fetchPage(val) : undefined}
            >
              {val}
            </li>
          );
        })}

        {Boolean(pagination.next) && (
          <li onClick={() => thunk.fetchPage(pagination.next)}>
            {`.. ${pagination.next}`}
          </li>
        )}
        {page < 40 && <li onClick={() => thunk.fetchPage(40)}>»</li>}
      </ul>
    </div>
  );
}
