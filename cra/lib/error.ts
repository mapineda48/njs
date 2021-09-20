const id = Symbol();

export class ErrorInApp extends Error {
  public [id] = true;
}

export function isInApp(error: any): error is ErrorInApp {
  return Boolean(error[id]);
}
