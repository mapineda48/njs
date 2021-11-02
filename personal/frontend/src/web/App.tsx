import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Web from "./Web";

import type { Data } from "./model";

export default function App({ data }: { data: Data }) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Web changeTo="/es" model={data.en} />
          </Route>
          <Route exact path="/es">
            <Web changeTo="/" model={data.es} />
          </Route>
        </Switch>
      </BrowserRouter>
    </HelmetProvider>
  );
}
