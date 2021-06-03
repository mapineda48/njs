import React from "react";
import clsx from "clsx";
import { useParams, useHistory } from "react-router-dom";
import { useContext } from "../Context";
import { go, title } from "../../shared";
import getPagination, { Pagination as StatePag } from "./pagination";

import type { OppHits } from "../../shared";

const label: Label = {
  number: "Number",
  title: "Title",
  oppStatus: "Status",
  agencyCode: "Agency",
  openDate: "Open Date",
  closeDate: "Close Date",
};

const keys = Object.keys(label);

const labels = Object.values(label);

export function Opportunity(props: Props) {
  const { opportunitys, onClick } = props;

  return (
    <div className="opportunity flex-full">
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
              <tr key={ind} onClick={() => onClick(opp.id)}>
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

export function Pagination(props: PropsPag) {
  const { pagination, page, onClick } = props;

  return (
    <div className="pagination">
      <ul className="ul">
        {page > 1 && <li onClick={() => onClick(1)}>«</li>}
        {Boolean(pagination.back) && (
          <li onClick={() => onClick(pagination.back)}>
            {`${pagination.back} ..`}
          </li>
        )}
        {pagination.ranges.map((val, ind) => {
          const isCurrent = val === page;
          return (
            <li
              key={ind}
              className={clsx([isCurrent && "active"])}
              onClick={!isCurrent ? () => onClick(val) : undefined}
            >
              {val}
            </li>
          );
        })}

        {Boolean(pagination.next) && (
          <li onClick={() => onClick(pagination.next)}>
            {`.. ${pagination.next}`}
          </li>
        )}
        {page < 40 && <li onClick={() => onClick(40)}>»</li>}
      </ul>
    </div>
  );
}

export default function OpportunityInContext() {
  const [state, grants, http] = useContext();

  const { page } = useParams<Params>();

  const opps = state.opportunity[page];

  const history = useHistory<undefined>();

  React.useEffect(() => {
    window.document.title = title.opportunity(page);

    if (opps) return;

    const normalize = parseInt(page);

    if (isNaN(normalize)) {
      grants.showMessage(`Invalid page "${page}"`);
      return;
    }

    http.fetchOpportunity(normalize);
  });

  if (!opps) return <div className="opportunity flex-full"></div>;

  return (
    <Opportunity
      opportunitys={opps}
      onClick={(id) => {
        const detail = id.toString();

        history.push(go.detail(detail));
      }}
    />
  );
}

OpportunityInContext.Pagination = function PaginationInContenxt() {
  const { page } = useParams<Params>();
  const history = useHistory<undefined>();

  const normalize = parseInt(page);

  if (isNaN(normalize)) {
    return null;
  }

  const pagination = getPagination(normalize);

  return (
    <Pagination
      page={normalize}
      pagination={pagination}
      onClick={(page) => {
        const opportunitys = page.toString();
        history.push(go.opportunity(opportunitys));
      }}
    />
  );
};

/**
 * Types
 */
interface PropsPag {
  pagination: StatePag;
  page: number;
  onClick: (page: number) => void;
}

interface Props {
  opportunitys: OppHits[];
  onClick: (id: number) => void;
}

export interface Params {
  page: string;
}

type Label = {
  [K in keyof OppHits]?: string;
};
