import { BrowserRouter, Route } from "react-router-dom";
import { mountChat } from "@mapineda48/social/frontend/lib";
import { render } from "common";
import { route } from "@api";
import baseUrl from "@backend/baseUrl";
import Portals from "components/Portals";
import Home from "./Home";
import Landing from "./Landing";
import CRUD from "./Crud";

mountChat();

render(
  <Portals>
    <BrowserRouter basename={baseUrl}>
      <Route exact path={route.home}>
        <Home />
      </Route>
      <Route exact path={route.landing}>
        <Landing />
      </Route>
      <Route exact path={route.crud}>
        <CRUD />
      </Route>
    </BrowserRouter>
  </Portals>
);
