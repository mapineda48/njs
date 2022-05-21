class Friendly {
  constructor(public code: number, public message: string) {}
}

export function parse(err: any): [number, string] {
  if (err instanceof Friendly) {
    return [err.code, err.message];
  }

  if (err.code === "ECONNREFUSED") {
    return [500, "fail model connection"];
  }

  switch (err.message) {
    case 'duplicate key value violates unique constraint "person_full_name_key"':
      return [
        400,
        "El nombre ya se encuentra ingresado, para editar contacte al administrador del sitio.",
      ];
    case 'duplicate key value violates unique constraint "person_email_key"':
      return [
        400,
        "El email ya se encuentra ingresado, para editar contacte al administrador del sitio",
      ];
  }

  console.log(err);

  return [500, "unhandler error"];
}

export default Friendly;
