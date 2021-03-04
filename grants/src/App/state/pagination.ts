export function init(): Pagination {
  return { back: 0, ranges: [], next: 0 };
}

export default function (page: number): Pagination {
  const pipe = page > 36 ? 36 : page - 1 > 0 ? page - 1 : page;

  let range = 6;

  const back = pipe - 5 > 0 ? pipe - 5 : 0;

  if (back) {
    range -= 1;
  }

  const next = pipe + 8 < 40 ? pipe + 8 : 0;

  if (next) {
    range -= 1;
  }

  const ranges: number[] = [];

  for (let index = pipe; index < pipe + range; index++) {
    ranges.push(index);
  }

  return { ranges, back, next };
}

/**
 * Typings
 */
export interface Pagination {
  back: number;
  ranges: number[];
  next: number;
}
