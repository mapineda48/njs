export interface IRequest<T> {
  http: Promise<T>;
  abort(): void;
}
