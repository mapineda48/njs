import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Personal from "./Personal";
import { lang, Model } from "./model";

export const model = "/model.json";

export default function App(props: Props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={lang.en}>
          <Personal
            lang={props.model.route[lang.en]}
            skill={props.model.skill}
          />
        </Route>
        <Route exact path={lang.es}>
          <Personal
            lang={props.model.route[lang.es]}
            skill={props.model.skill}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

/**
 * Types
 */
interface Props {
  model: Model;
}
