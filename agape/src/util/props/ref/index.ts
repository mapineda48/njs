export const scrollToChild = (index: number): CbRef => {
  return (ref) => {
    const child = ref.childNodes.item(index);

    if (!child || !(child instanceof HTMLElement)) {
      return;
    }

    /**
     * https://stackoverflow.com/questions/26423335/elements-coordinates-relative-to-its-parent
     */
    const parentRect = ref.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const spaceTop = parentRect.top - childRect.top;

    if (spaceTop > 0) {
      ref.scrollTop = ref.scrollTop - spaceTop;
    }

    const spaceBottom = childRect.bottom - parentRect.bottom;

    if (spaceBottom > 0) {
      ref.scrollTop = ref.scrollTop + spaceBottom;
    }
  };
};

export const listenerRef: ListenerRef = (cb) => {
  return (ref) => {
    if (!ref) {
      return;
    }

    if (!Array.isArray(cb)) {
      return cb(ref);
    }

    cb.forEach((cb) => cb(ref));
  };
};

export const rsx: Set = (inputs: any) => {
  if (!Array.isArray(inputs)) {
    if (!inputs) {
      return;
    }

    return listenerRef(inputs);
  }

  const cbs: CbRef[] = inputs.filter((i) => typeof i === "function") as any;

  if (cbs.length < 1) {
    return;
  }

  return listenerRef(cbs);
};

/**
 * Typings
 */

export type Set = <T extends HTMLElement>(
  cbs: CbRef<T> | (CbRef<T> | false) | (CbRef<T> | (false | CbRef<T>))[]
) => OnRef<T> | undefined;

export type ListenerRef = <T extends HTMLElement = HTMLDivElement>(
  ref: CbRef<T> | CbRef<T>[]
) => OnRef<T>;

export type CbRef<I extends HTMLElement = HTMLDivElement> = <
  T extends HTMLElement = I
>(
  ref: T
) => void;

export type OnRef<I extends HTMLElement = HTMLDivElement> = <
  T extends HTMLElement = I
>(
  ref: T | null
) => void;
