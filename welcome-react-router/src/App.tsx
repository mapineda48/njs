import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { route } from "./shared";

import type { Data } from "./shared";

export default function App(props: Props) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={route.root}>Home</Link>
          </li>
          <li>
            <Link to={route.about}>About</Link>
          </li>
          <li>
            <Link to={route.users}>Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path={route.about}>
          <About />
        </Route>
        <Route path={route.users}>
          <Users />
        </Route>
        <Route path={route.root}>
          <Home {...props} />
        </Route>
      </Switch>
    </div>
  );
}

function Home(props: Props) {
  return <h2>{props.message || `Welcome!!!`}</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

/**
 * Types
 */

export interface Props extends Partial<Data> {}
