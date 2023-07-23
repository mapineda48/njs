import { initReducer } from "hook/useState";

export function setArgs(state: State, ...args: Args): State {
  const { initial, notReset, result } = state;

  return { initial, notReset, result: notReset ? result : initial, args };
}

export function setResult(state: State, value?: unknown): State {
  const { initial, notReset } = state;

  return { initial, notReset, result: value ?? initial };
}

export function setError(state: State, error: unknown): State {
  const { initial, notReset } = state;

  return { initial, notReset, error, result: initial };
}

export default initReducer({ setArgs, setResult, setError });

/**
 * Types
 */
export interface State {
  args?: unknown[];
  error?: unknown;
  result?: unknown;
  notReset?: boolean;
  initial?: unknown;
}

type Args = unknown[];
