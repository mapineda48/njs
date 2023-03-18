import { IRequest } from "backend/integration";

/**
 * https://stackoverflow.com/questions/48158730/extend-javascript-promise-and-resolve-or-reject-it-inside-constructor
 * https://javascript.info/promise-chaining
 */

/**
 * Request Promise
 */
export default class RequestPromise<T> extends Promise<T> implements IRequest<T> {
  constructor(executor: Executor<T>,protected abortController = new AbortController()) {
    super((res, rej) => {
      const { signal } = abortController;
      return executor(res, rej, signal);
    });
  }

  abort() {
    this.abortController.abort();
  }
}

/**
 * Types
 */
type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason?: any) => void,
  signal: AbortSignal
) => void;
