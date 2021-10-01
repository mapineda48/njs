import { BrowserRouter, Switch, Route } from "react-router-dom";
import Personal from "./Personal";

import type { Data } from "./model";

export default function App({ data }: { data: Data }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Personal changeTo="/es" model={data.en} />
        </Route>
        <Route exact path="/es">
          <Personal changeTo="/" model={data.es} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
