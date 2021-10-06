import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { initAction } from "mp48-react/useAction";
import Loading from "../Loading";
import Message from "../Notification";
import { stateType, go, title } from "../backend";
import api from "../api";
import { getPagination } from "./pagination";
import Cache from "../cache";
import clsx from "clsx";

import type { InitState, OppHits } from "../backend";
import type { Pagination } from "./pagination";
import type { StateHistory } from "../common";

const cache = new Cache<State>();

const label: Label = {
  number: "Number",
  title: "Title",
  oppStatus: "Status",
  agencyCode: "Agency",
  openDate: "Open Date",
  closeDate: "Close Date",
};

const keys: (keyof Label)[] = Object.keys(label) as any;

const labels = Object.values(label);

const useState = initAction({
  loading(state: State, loading = true): State {
    return { ...state, loading };
  },
  error(state: State, error: any): State {
    const message: string = error.message || "unknwon";

    return { ...state, message };
  },
  page(state: State, page: number, data: OppHits[]): State {
    return {
      ...state,
      pagination: getPagination(page),
      data: { ...state.data, [page]: data },
    };
  },
  pagination(state: State, page: number): State {
    return { ...state, pagination: getPagination(page) };
  },
});

export default function Opportunity(props: Props) {
  const page = parseInt(useParams<Params>().page);

  const [state, , opportunity] = useState(() => {
    const init: Partial<State> =
      props.init?.type === stateType.opportunity
        ? (props.init.state as any)
        : {};

    return {
      loading: false,
      message: "",
      data: { [page]: [] },
      pagination: getPagination(page),
      ...init,
      ...cache.get(),
    };
  });

  cache.set(state);

  const history = useHistory<StateHistory>();

  const goPage = React.useCallback(
    (page: number) => {
      history.push(go.opportunity(page));
    },
    [history]
  );

  React.useEffect(() => {
    document.title = title.opportunity(page);

    if (state.data[page]?.length) {
      opportunity.pagination(page);
      return;
    }

    let mount = true;

    opportunity.loading();

    api
      .fetchOpportunity(page)
      .then((res) => {
        if (!mount) return;
        opportunity.page(page, res);
      })
      .catch((err) => {
        if (!mount) return;
        opportunity.error(err);
      })
      .finally(() => {
        if (!mount) return;
        opportunity.loading(false);
      });

    return () => {
      mount = false;
    };
  }, [page]);

  if (state.loading) {
    return <Loading />;
  }

  if (state.message) {
    return <Message message={state.message} />;
  }

  return (
    <div className="opportunity">
      <div className="results">
        <div className="data">
          {state.data[page]?.length && (
            <table>
              <thead>
                <tr>
                  {labels.map((val, index) => (
                    <th key={index}>{val}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(state.data[page]).map((opp, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      history.push(go.detail(opp.id), {
                        from: history.location.pathname,
                      })
                    }
                  >
                    {keys.map((key, index) => (
                      <td title={opp[key] + "" || "unknwon"} key={index}>
                        {opp[key] || "unknwon"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="pagination">
        <ul className="ul">
          {page > 1 && (
            <li
              onClick={() => {
                goPage(1);
              }}
            >
              «
            </li>
          )}
          {Boolean(state.pagination.back) && (
            <li onClick={() => goPage(state.pagination.back)}>
              {`${state.pagination.back} ..`}
            </li>
          )}
          {state.pagination.ranges.map((val, index) => {
            const isCurrent = val === page;
            return (
              <li
                key={index}
                className={clsx([isCurrent && "active"])}
                onClick={!isCurrent ? () => goPage(val) : undefined}
              >
                {val}
              </li>
            );
          })}

          {Boolean(state.pagination.next) && (
            <li onClick={() => goPage(state.pagination.next)}>
              {`.. ${state.pagination.next}`}
            </li>
          )}
          {page < 40 && <li onClick={() => goPage(40)}>»</li>}
        </ul>
      </div>
    </div>
  );
}

/**
 * Types
 */
type Label = {
  [K in keyof OppHits]?: string;
};

export interface Params {
  page: string;
}

export interface Props {
  init?: InitState;
}

export interface State {
  loading: boolean;
  message: string;
  data: {
    [page: number]: OppHits[];
  };
  pagination: Pagination;
}
