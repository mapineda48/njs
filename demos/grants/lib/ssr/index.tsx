import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { save as saveInCache } from "./cache";
import { setInHtml } from "./html";
import App from "../../frontend/src/App";

import type { InitState as State } from "../type";

export async function render(path: string, init?: State, title?: string) {
  const key = init ? await saveInCache(init) : "";

  const data = ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <App state={init} />
    </StaticRouter>
  );

  return setInHtml(data, key, title);
}

export default render;

/**
 * Types
 */
export type Render = typeof render;
