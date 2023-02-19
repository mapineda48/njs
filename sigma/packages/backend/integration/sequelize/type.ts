export interface ResultFindAndCountAll<T> {
  rows: T[];
  count: number;
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
