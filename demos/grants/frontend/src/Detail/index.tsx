import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { initAction } from "mp48-react/useAction";
import { BiArrowBack } from "react-icons/bi";
import Loading from "../Loading";
import Message from "../Notification";
import { go, RestDetail, stateType, title } from "../backend";
import Cache from "../cache";
import api from "../api";
import parseDetail from "./parse";

import type { StateHistory } from "../common";
import type { InitState } from "../backend";

const cache = new Cache<State>();

const useState = initAction({
  loading(state: State, loading = true): State {
    return { ...state, loading };
  },
  message(state: State, message: string): State {
    return { ...state, message };
  },
  addDetail(state: State, detail: RestDetail): State {
    const data = { ...state.data, [detail.id]: detail };

    cache.set({ data });

    return { ...state, data };
  },
});

function Opportunity(props: { detail: RestDetail }) {
  let fields: string[][] = [];

  try {
    fields = parseDetail(props.detail);
  } catch (error: any) {
    return <Message message={error.message} />;
  }

  return (
    <fieldset>
      <legend>General Information</legend>
      {fields.map(([label, value], index) => {
        return (
          <div key={index} className="field">
            <label>
              <strong>{label}</strong>
            </label>
            <p>{value}</p>
          </div>
        );
      })}
    </fieldset>
  );
}

export default function Detail(props: Props) {
  const id = parseInt(useParams<{ id: string }>().id);

  const history = useHistory<StateHistory>();

  const [state, , detail] = useState(() => {
    const init: Partial<State> =
      props.init?.type === stateType.detail ? (props.init.state as any) : {};

    return { loading: false, message: "", data: {}, ...init, ...cache.get() };
  });

  React.useEffect(() => {
    document.title = title.detail(id);

    if (state.data[id]) return;

    let mount = true;

    detail.loading(true);
    api
      .fetchDetail(id)
      .then((res) => mount && detail.addDetail(res))
      .catch((err) => mount && detail.message(err.message))
      .finally(() => mount && detail.loading(false));

    return () => {
      mount = false;
    };
  }, [id]);

  if (state.loading) {
    return <Loading />;
  }

  if (state.message) {
    return <Message message={state.message} />;
  }

  return (
    <div className="detail">
      <div className="opportunity">
        {state.data[id] && (
          <div className="data">
            <Opportunity detail={state.data[id]} />
          </div>
        )}
      </div>
      <div className="footer">
        <button
          onClick={() => {
            const prevPath = history.location?.state?.from;
            if (prevPath) {
              history.push(prevPath);
            } else {
              history.push(go.opportunity(1));
            }
          }}
        >
          <BiArrowBack />
        </button>
      </div>
    </div>
  );
}

/**
 * Types
 */
interface Props {
  init?: InitState;
}

export interface State {
  loading: boolean;
  message: string;
  data: {
    [id: number]: RestDetail;
  };
}
