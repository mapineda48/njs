export function prepare<T>(api: T): T;
export function prepare(api: any): any {
  return Object.fromEntries(
    Object.entries(api).map(([key, val]) => [key, "/" + val])
  );
}
