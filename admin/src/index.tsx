import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import route from "./route";
import { render, getBaseUrl } from "./common";

render(
  <BrowserRouter basename={getBaseUrl()}>
    <App>
      <Switch>
        <Route exact path={route.login}>
          <SignIn />
        </Route>
        <Route exact path={route.dashboard}>
          <Dashboard />
        </Route>
      </Switch>
    </App>
  </BrowserRouter>
);
