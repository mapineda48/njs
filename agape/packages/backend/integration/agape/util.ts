import { IRequest } from "../frontend";

export type IFrontEndMethod<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => IRequest<R>
    : T[K] extends (...args: infer A) => infer R
    ? (...args: A) => IRequest<R>
    : T[K] extends object
    ? IFrontEndMethod<T[K]>
    : unknown;
};
