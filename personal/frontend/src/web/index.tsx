import axios from "axios";
import App from "./App";
import { hydrate } from "./common";
import './index.scss';

import type { Data } from "./model";

axios
  .get<Data>("/model.json")
  .then((res) => hydrate(<App data={res.data} />))
  .catch(console.error);
