import axios from "axios";
import App, { model } from "./App";
import { hydrate } from "common";

import type { Model } from "./model";
axios
  .get<Model>(model)
  .then((res) => {
    const { data } = res;
    hydrate(<App model={data} />);
  })
  .catch((err) => console.log(err));
