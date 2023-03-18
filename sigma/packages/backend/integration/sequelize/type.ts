export interface PostMethod<D, R> {
  destroy(opt: DestroyOptions<R>): Promise<number>;
  update(data: Partial<D>, opt: UpdateOptions<R>): Promise<R[]>;
  create(data: D): Promise<R>;

  findAll<K extends keyof R>(query: FindExtra<R, K>): Promise<Pick<R, K>[]>;
  findAll(query: FindOptions<R>): Promise<R[]>;

  count(query: FindOptions<R>): Promise<number>;
}

export type Record<T> = { createAt: Date; updateAt: Date } & T;

export type Model<T, N extends string> = { [K in `${N}Id`]: number } & T;

export interface ResultFindAndCountAll<T> {
  rows: T[];
  count: number;
}

export interface FindExtra<T, K extends keyof T> extends FindOptions<T> {
  attributes: K[];
}

export interface FindOptions<T> extends Pagination, Ordering<T> {
  where?: Where<T> | WhereOne<T> | WhereTwo<T>;
}

export interface DestroyOptions<T> {
  where: Where<T> | WhereOne<T> | WhereTwo<T>;
}

export interface UpdateOptions<T> {
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
