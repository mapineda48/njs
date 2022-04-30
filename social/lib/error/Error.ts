export class ErrorApp extends Error {}

export class ErrorRoute extends ErrorApp {
  public readonly code: number;

  static parse(error: any): ErrorRoute {
    if (error instanceof ErrorRoute) {
      return error;
    }

    if (error instanceof ErrorApp) {
      return new ErrorRoute(404, error.message);
    }

    switch (error.message) {
      case "jwt malformed":
        return new ErrorRoute(404, "invalid token");
      case "invalid signature":
        return new ErrorRoute(404, "you should signin");
    }

    return new ErrorRoute(500, "unhandler server error");
  }

  static is(error: any): error is ErrorRoute {
    return error instanceof ErrorRoute;
  }

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export class ErrorNotFoundGuest extends ErrorApp {
  constructor() {
    super("Guest not found");
  }
}

export class ErrorNotExistMiguel extends ErrorApp {
  constructor() {
    super("Miguet not exists");
  }
}

export function isErr<T extends new (...args: any[]) => any>(
  Class: T,
  obj: any
): obj is T {
  return obj instanceof Class;
}
