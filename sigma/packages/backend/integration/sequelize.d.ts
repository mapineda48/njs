export const baseURL: string;

export function createURL(tableName: string): string;

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
    <K extends keyof R>(query: IFindAttrib<R, K>): IRequest<Pick<R, K>[]>;
    (query: IFindSearch<R>): IRequest<R[]>;
  };

  count(query: IFindSearch<R>): IRequest<number>;

  //Maybe delete
  getFindAndCountAll(query: string): IRequest<{ rows: R[]; count: number }>;
  getFindAll(query: string): IRequest<R[]>;
}

export interface IRequest<T> extends Promise<T> {
  abort(): void;
}

export interface IFindAll {
  <R>(query: IFindSearch<R>): string; 
  <R, K extends keyof R>(query: IFindAttrib<R, K>): string;
}

export type IRecord<T> = { createdAt: Date; updatedAt: Date } & T;

export type IModel<T, N extends string> = { [K in `${N}Id`]: number } & T;

export interface ISearchAndCount<T> {
  rows: T[];
  count: number;
}

export interface IFindAttrib<T, K extends keyof T> extends IFindSearch<T> {
  attributes: K[];
}

export interface IFindSearch<T> extends Pagination, Ordering<T> {
  where?: Where<T> | WhereOne<T> | WhereTwo<T>;
}

export interface IDestroySearch<T> {
  where: Where<T> | WhereOne<T> | WhereTwo<T>;
}

export interface IUpdateSearch<T> {
  where: Where<T> | WhereOne<T> | WhereTwo<T>;
}

type WhereTwo<T> = {
  [K: symbol]: Partial<T>[];
};

type WhereOne<T> = {
  [K in keyof T]?: {
    [S: symbol]: T[K] | T[K][];
  };
};

type Where<T> = {
  [K in keyof T]?: T[K] | T[K][];
};

interface Pagination {
  limit?: number;
  offset?: number;
}

interface Ordering<T> {
  order?: [keyof T, string][];
}
