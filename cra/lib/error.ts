class Friendly {
  constructor(public message: string) {}
}

export function parse(error: any) {
  if (!(error instanceof Friendly)) {
    console.error(error);
    process.exit(1);
  }

  console.log(error.message);
}

export default Friendly;
