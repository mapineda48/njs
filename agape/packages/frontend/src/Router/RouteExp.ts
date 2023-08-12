export default class RouteExp extends RegExp {
  public readonly pattern: string;
  public readonly startWith: RegExp;

  constructor(public readonly route: string) {
    const pattern = parsePattern(route);

    const match = `^${pattern}$`;
    const startWith = `^${pattern}`;

    super(match);

    this.pattern = route;
    this.startWith = new RegExp(startWith);
  }
}

function parsePattern(pattern: string) {
  if (!pattern.includes(":")) {
    return pattern;
  }

  const res = pattern.split("/").map(parseParam).join("/");

  return res;
}

function parseParam(value: string) {
  return value.includes(":") ? "[^/]+" : value;
}
