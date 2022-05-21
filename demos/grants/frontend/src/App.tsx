import { Route, Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import { go, route } from "./backend";
import Opportunity from "./Opportunity";
import Detail from "./Detail";
import Message from "./Notification";
import { disclamer } from "./disclaimer";

import type { StateHistory } from "./common";
import type { InitState } from "./backend";

export default function Grants(props: Props) {
  const history = useHistory<StateHistory>();

  return (
    <div className="grants">
      <div className="head">
        <h1>Grants</h1>
        <Route exact path={[route.opportunity, route.detail]}>
          <div className="help">
            <Link
              to={{
                pathname: route.about,
                state: { from: history.location.pathname } as StateHistory,
              }}
            >
              <FiHelpCircle />
            </Link>
          </div>
        </Route>
        <Route exact path={route.about}>
          <div
            className="help"
            onClick={() => {
              const prevPath = history.location?.state?.from;

              if (prevPath) {
                history.goBack();
              } else {
                history.push(go.opportunity(1));
              }
            }}
          >
            <BiArrowBack />
          </div>
        </Route>
      </div>
      <Route exact path="/">
        <Redirect to={go.opportunity(1)} />
      </Route>
      <Route exact path={route.about}>
        <Message message={disclamer} />
      </Route>
      <Route exact path={route.opportunity}>
        <Opportunity init={props.state} />
      </Route>
      <Route exact path={route.detail}>
        <Detail init={props.state} />
      </Route>
    </div>
  );
}

/**
 * Types
 */
export interface Props {
  state?: InitState;
}
