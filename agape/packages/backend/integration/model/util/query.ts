import type { OperatorKey } from "./Op";
import type { IRequest } from "../../frontend";

export interface IMethod<D, R> {
  destroy(opt: IDestroySearch<R>): IRequest<number>;

  update(data: Partial<D>, opt: IUpdateSearch<R>): IRequest<R[]>;

  create(data: D): IRequest<R>;

  findAndCountAll: {
    <K extends keyof R>(query: IFindAttrib<R, K>): IRequest<{
      rows: Pick<R, K>[];
      count: number;
    }>;
    (query: IFindSearch<R>): IRequest<{ rows: R[]; count: number }>;
  };

  findAll: {
    <K extends keyof R>(query: IFindAttrib<R, K>): IRequest<
      Pick<R, K>[]
    >;
    (query: IFindSearch<R>): IRequest<R[]>;
  };

  count(query: IFindSearch<R>): IRequest<number>;
}

export interface IFindAttrib<T, K extends keyof T> extends IFindSearch<T> {
  attributes: K[];
}

export interface IFindSearch<T> extends Pagination, Ordering<T> {
  where?: Where<T>;
}

export interface IDestroySearch<T> {
  where: Where<T>;
}

export interface IUpdateSearch<T> {
  where: Where<T>;
}

type Where<T> = WhereBasic<T> | WhereOp<T>;

type WhereOp<T> = {
  [K in keyof T]?: {
    [S in OperatorKey]?: T[K] | T[K][];
  };
};

type WhereBasic<T> = {
  [K in keyof T]?: T[K] extends object[]
    ? Where<T[K][number]>
    : T[K] extends object
    ? Where<T[K]>
    : T[K] | T[K][];
};

interface Pagination {
  limit?: number;
  offset?: number;
}

interface Ordering<T> {
  order?: [keyof T, string][];
}
