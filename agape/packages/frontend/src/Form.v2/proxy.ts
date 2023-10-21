import { useMemo, useRef, useState } from "react";

function createProxy(ref: Ref<any>, set: SetState<any>) {
  const proxy: any = {};

  Object.keys(ref.current).forEach((key) => {
    if (!Array.isArray(ref.current[key])) {
      Object.defineProperty(proxy, key, {
        get() {
          return ref.current[key];
        },

        set(value) {
          set((state: any) => ({ ...state, [key]: value }));
        },
      });

      return;
    }

    const push = (item: any) => {
      set((state: any) => {
        return { ...state, [key]: [...state[key], item] };
      });
    };

    const splice = (index: number, deleteCount?: number) => {
      set((state: any) => {
        const next = [...state[key]];

        next.splice(index, deleteCount);

        return { ...state, [key]: next };
      });
    };

    Object.defineProperty(proxy, key, {
      get() {
        const state = ref.current[key];

        const list: any = state.map((itemState: any, index: number) => {
          const itemProxy: any = {};

          Object.keys(itemState).forEach((itemKey) => {
            Object.defineProperty(itemProxy, itemKey, {
              get() {
                return itemState[itemKey];
              },

              set(value) {
                set((state: any) => {
                  const next = [...state[key]];

                  next[index] = { ...next[index], [itemKey]: value };

                  return { ...state, [key]: next };
                });
              },
            });
          });

          itemProxy.remove = () => {
            set((state: any) => {
              const next = [...state[key]];

              next.splice(index, 1);

              return { ...state, [key]: next };
            });
          };

          return itemProxy;
        });

        list.push = push;
        list.splice = splice;

        return list;
      },

      set(value) {
        set((state: any) => ({ ...state, [key]: value }));
      },
    });
  });

  proxy.update = (partial: any) => {
    set((state: any) => ({ ...state, ...partial }));
  };

  return proxy;
}

export function useProxy<T extends State>(init: T | (() => T)) {
  const [state, setState] = useState(init);
  const ref = useRef(state);
  ref.current = state;

  const proxy = useMemo(() => createProxy(ref, setState), []);

  return [state];
}

export default createProxy as Create;

/**
 * Types
 */
type Create = <T extends State>(ref: Ref<T>, set: SetState<T>) => Proxy<T>;
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
