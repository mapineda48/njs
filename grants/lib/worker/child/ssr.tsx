import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { state, Init as State } from "./state";
import { setInHtml } from "./html";
import App from "../../../src/App";

export function renderWithState(title: string, path: string, init: State) {
  const key = state.set(init);

  const data = ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <App initState={init} />
    </StaticRouter>
  );

  return setInHtml(title, data, key);
}

export function renderOnly(title: string, path: string) {
  const data = ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );

  return setInHtml(title, data);
}

export function render(title: string, path: string, init?: State) {
  if (!init) return renderOnly(title, path);

  return renderWithState(title, path, init);
}
