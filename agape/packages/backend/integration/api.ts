import * as agape from "./agape";
import * as publc from "./public";

const apis: Api[] = [agape, publc];

export default apis;

/**
 * Types
 */
interface Api {
  baseUrl: string;
  route: {
    [K: string]: string | { [K: string]: string };
  };
  field: {
    [K: string]: string[] | { [K: string]: string[] };
  };
}
