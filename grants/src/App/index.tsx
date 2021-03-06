import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { GoCheck } from "react-icons/go";
import { FiHelpCircle } from "react-icons/fi";
import useState, { State } from "./state";
import Context, { useContext } from "./Context";
import Workspace, { Tool } from "./Workspace";
import Opportunity from "./Opportunity";
import Detail from "./Detail";
import disclamer from "./disclaimer";
import { route, title, go } from "../shared";

function About() {
  React.useEffect(() => {
    window.document.title = title.about();
  });

  return (
    <div className="about flex-full">
      <p>{disclamer}</p>
    </div>
  );
}

function Succes() {
  const [state, grants] = useContext();

  const history = useHistory<undefined>();

  const onSucces = () => {
    const isAbout = history.location.pathname === route.about;

    if (!state.message && !isAbout) {
      history.goBack();
      return;
    }

    if (state.message) {
      grants.clearMessge();
    }

    history.push(go.opportunity("1"));
  };

  return (
    <button type="button" className="btn btn-success" onClick={onSucces}>
      <GoCheck />
    </button>
  );
}

export default function App(props: Props) {
  const [state, grants, http] = useState(props.initState);

  const showHelp = !state.isLoading && !state.message;

  return (
    <Context state={state} grants={grants} http={http}>
      <div className="app">
        <div className="header">
          <h1>Grants</h1>
          {showHelp && (
            <Switch>
              <Route exact path={[route.opportunity, route.detail]}>
                <div className="help">
                  <Link to={route.about}>
                    <FiHelpCircle />
                  </Link>
                </div>
              </Route>
            </Switch>
          )}
        </div>
        <Workspace>
          <Switch>
            <Route exact path={route.opportunity}>
              <Opportunity />
            </Route>
            <Route exact path={route.detail}>
              <Detail />
            </Route>
            <Route exact path={route.about}>
              <About />
            </Route>
          </Switch>
        </Workspace>
        <div className="footer">
          <Tool>
            <Switch>
              <Route exact path={route.opportunity}>
                <Opportunity.Pagination />
              </Route>
              <Route exact path={[route.about, route.detail]}>
                <Succes />
              </Route>
            </Switch>
          </Tool>
          {state.message && <Succes />}
        </div>
      </div>
    </Context>
  );
}

interface Props {
  initState?: Partial<State>;
}
