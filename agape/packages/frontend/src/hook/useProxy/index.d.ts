export function createProxy<T extends State>(
  ref: Ref<T>,
  set: SetState<T>
): Proxy<T>;

type SetState<T> = React.Dispatch<T>;
type Ref<T> = React.MutableRefObject<T>;

type Proxy<T> = {
  [K in keyof T]: T[K] extends (infer A)[]
    ? ArrayProxy<A>
    : T[K] extends Value
    ? T[K]
    : never;
} & { update: (partial: Partial<T>) => void };

type State = {
  [K: string]: Value | { [K: string]: Value }[];
};

type Value = number | string | boolean | Date | File;

interface ArrayProxy<T> extends Omit<Array<ItemProxy<T>>, "push"> {
  push(item: T): void;
}

type ItemProxy<T> = T & { remove: () => void };
