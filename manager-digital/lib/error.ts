export function handlerError(error: any): Err {
  console.log(error);

  switch (error.code) {
    case "ECONNREFUSED":
      return [500, "Fail connection DB"];
    case "23505": {
      switch (error.constraint) {
        case "person_full_name_key":
          return [404, "Ya se encuentra un persona registrada con este nombre"];
        case "person_dni_key":
          return [
            404,
            "Ya se encuentra un persona registrada con este documento",
          ];
        case "person_email_key":
          return [
            404,
            "Ya se encuentra un persona registrada con este correo electronico",
          ];
      }
    }
  }

  return [500, "unhandler error"];
}

/**
 * Types
 */
type Err = [number, string];
