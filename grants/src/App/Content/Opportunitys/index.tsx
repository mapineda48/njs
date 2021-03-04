import React from "react";
import { useGrants } from "App/Context";
import { OppHits } from "shared";

import style from "./index.module.scss";

type Foo = { [K in keyof OppHits]?: string };

const foo: Foo = {
  number: "Number",
  title: "Title",
  oppStatus: "Status",
  agencyCode: "Agency",
  openDate: "Open Date",
  closeDate: "Close Date",
};

const keys = Object.keys(foo);

const labels = Object.values(foo);

export default function () {
  const [state, , thunk] = useGrants();

  const opportunitys = state.opportunitys[state.page];

  return (
    <div className={style._}>
      <table>
        <thead>
          <tr>
            {labels.map((val, ind) => (
              <th key={ind}>{val}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {opportunitys.map((opp: any, ind) => {
            return (
              <tr key={ind} onClick={() => thunk.fetchDetail(opp.id)}>
                {keys.map((key, ind) => {
                  const val = opp[key];

                  return (
                    <td key={ind} title={val}>
                      {val}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
