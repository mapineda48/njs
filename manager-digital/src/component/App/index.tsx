import React from "react";
import Context from "./state/Context";
import Dashboard from "./Dashboard";
import Modals from "./Modals";

export default function App() {
  return (
    <Context>
      <div className="app flex-full panel">
        <div className="header">
          <h2>Manager Digital</h2>
          <h3>Prueba Tecnica</h3>
        </div>
        <div className="body flex-full">
          <Dashboard />
        </div>
      </div>
      <Modals />
    </Context>
  );
}
