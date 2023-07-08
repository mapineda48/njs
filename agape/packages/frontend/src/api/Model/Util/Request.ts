import type { IRequest } from "backend";

export default class Request<T = any> implements IRequest<T> {
  public http: Promise<T>;
  private abortController: AbortController;

  constructor(executor: (signal: AbortSignal) => Promise<T>) {
    this.abortController = new AbortController();

    this.http = executor(this.abortController.signal);
  }

  abort() {
    this.abortController.abort();
  }
}

function skipAbortError(error: any) {
  if (error instanceof Error && error.name === "AbortError") {
    console.log("Abort Request");
    return;
  }

  throw error;
}
