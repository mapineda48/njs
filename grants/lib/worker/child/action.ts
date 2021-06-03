import { loadHtml } from "./html";
import { render } from "./ssr";
import { state } from "./state";

export const action = {
  loadHtml,
  render,
  get: state.get,
};

export default action as any;

/**
 * Types
 */

export type Action = Omit<typeof action, "loadHtml">;
