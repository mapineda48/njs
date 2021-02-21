import { useSelector, Selector } from "./base";
import { useDispatch } from "./dispatch/wrap";

export { useSelector, useDispatch };

/**
 * Typings
 */

export type SelectorState<T> = Selector<T>;
