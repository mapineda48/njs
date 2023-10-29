import type { OperatorKey } from "./Op";

export interface IMethod<D, R> {
  destroy(opt: IDestroySearch<R>): Promise<number>;

  update(data: Partial<D>, opt: IUpdateSearch<R>): Promise<R[]>;

  create(data: D): Promise<R>;

  findAndCountAll: {
    <K extends keyof R>(query: IFindAttrib<R, K>): Promise<{
      rows: Pick<R, K>[];
      count: number;
    }>;
    (query: IFindSearch<R>): Promise<{ rows: R[]; count: number }>;
  };

  findAll: {
    <K extends keyof R>(query: IFindAttrib<R, K>): Promise<Pick<R, K>[]>;
    (query: IFindSearch<R>): Promise<R[]>;
    (): Promise<R[]>;
  };

  count(query: IFindSearch<R>): Promise<number>;
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
