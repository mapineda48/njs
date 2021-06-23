export function prepareApi<T>(api: T): T {
  return Object.fromEntries(
    Object.entries(api).map(([key, val]) => [key, "/" + val])
  ) as any;
}
