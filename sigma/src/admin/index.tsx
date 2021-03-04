import React from "react";
import { render } from "../common";
import Context from "./state/Context";
import Dashboard from "./Dashboard";
import Modals from "./Modals";
import "./style/index.scss";

render(<Admin />);

function Admin() {
  return (
    <Context>
      <main className="admin flex-full panel">
        <div className="head">
          <h3>Admin Panel</h3>
        </div>
        <div className="body flex-full">
          <Dashboard />
        </div>
      </main>
      <Modals />
    </Context>
  );
}
