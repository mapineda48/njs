import * as reactRedux from "react-redux";
import { Dispatch, State } from "..";

export const useDispatch = reactRedux.useDispatch as UseDispatch;

export const useSelector = reactRedux.useSelector as UseSelector;

/**
 * Typings
 */
type UseDispatch = () => Dispatch;

export type Selector<T> = (state: State) => T;

export type UseSelector = <TSelected = unknown>(
  selector: (state: State) => TSelected
) => TSelected;