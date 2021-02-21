export const wrapSetState: WrapState = (setState: any, reducer: any) => {
  const keys = Object.keys(reducer);

  const obj: any = {};

  keys.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const current: Function = reducer[key];

    if (typeof current === "function") {
      obj[key] = (...args: any[]) => setState(current.call(undefined, ...args));
    }
  });

  return { ...obj };
};

/**
 * Typings
 */

type Reducer = { [K: string]: (...args: any[]) => any };

type SetState<T extends Reducer> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => void;
};

type WrapState = <T, R extends Reducer>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  reducer: R
) => SetState<R>;
