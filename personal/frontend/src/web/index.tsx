import axios from "axios";
import { mountChat } from "@mapineda48/social/frontend/lib";
import App from "./App";
import { hydrate } from "./common";

import type { Data } from "./model";

mountChat();

axios
  .get<Data>("/model.json")
  .then((res) => hydrate(<App data={res.data} />))
  .catch(console.error);
