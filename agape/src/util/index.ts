export const listenerEvent: ListenerEvent = (cb, current) => {
  return (event) => {
    cb(event);

    if (current) {
      current(event);
    }
  };
};

export const setRef = (refs: any[], current: any) => {
  refs.forEach((ref) => {
    if (typeof ref === "function") {
      ref(current);
    }
    if (typeof ref === "object") {
      ref.current = current;
    }
  });
};

export const listenerRef: ListenerRef = (value, current) => {
  return (ref) => setRef([value, current], ref);
};

/**
 * Typings
 */

export type ListenerEvent<
  T extends (...args: any) => void = (event: any) => void
> = (cb: T, current: T | undefined) => T;

export type ListenerRef = (ref: any, current: any) => (ref: any) => void;
