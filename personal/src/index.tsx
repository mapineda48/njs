import axios from "axios";
import { mountChat } from "@mapineda48/social/browser";
import App, { model } from "./App";
import { hydrate, render } from "common";

import type { Model } from "./model";

mountChat();

axios
  .get<Model>(model)
  .then((res) => {
    const { data } = res;
    hydrate(<App model={data} />);
  })
  .catch((err) => {
    console.log(err);
    render(<div>Ups...</div>);
  });
