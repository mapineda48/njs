export function parseError(error: any) {
  let code = 500;
  let message = "unhandler server error";

  if (error.isInApp) {
    code = error.code;
    message = error.message;
  } else {
    console.log(error);

    switch (error.message) {
      case "jwt malformed":
        code = 404;
        message = "invalid token";
        break;
      case "invalid signature":
        code = 404;
        message = "you should signin";
        break;
    }
  }

  return { code, data: { message } };
}

export class ErrorInApp extends Error {
  isInApp = true;
  public code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
