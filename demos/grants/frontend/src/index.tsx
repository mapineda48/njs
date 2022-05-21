import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { mountChat } from "@mapineda48/social/frontend/lib";
import App from "./App";
import { render, getBaseUrl, getStateId } from "./common";
import { InitState } from "./backend";

mountChat();

const state = getStateId();

const baseUrl = getBaseUrl();

if (!state) {
  render(
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  );
} else {
  axios
    .get<InitState>(`state/${state}.json`)
    .then((res) => {
      render(
        <BrowserRouter basename={baseUrl}>
          <App state={res.data} />
        </BrowserRouter>
      );
    })
    .catch((err) => {
      alert("Error al sincronizar, recargue el sitio");
      console.error(err);
    });
}
