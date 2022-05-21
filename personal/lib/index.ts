import { createRouter } from "./route";
import { pages } from "./pages";

function mod() {
  return createRouter();
}

mod.pages = pages;

export = mod;

/**
 * Types
 */

type Router = typeof createRouter;
type Pages = typeof pages;
