import App from "./App";
import ReactDOM from "react-dom";

import { root as idRoot } from "./root";

export const root = document.getElementById(idRoot);

ReactDOM.render(<App />, root);
