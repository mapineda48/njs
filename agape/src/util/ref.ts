/**
 * Experimental tool to add and remove events to ref HTMLElement with hook React useEffect
 * @param target HTMLElement
 * @param event to add and remove
 */
export const addEventRef: AddEvent = (target, event) => {
  const keys: (keyof typeof event)[] = Object.keys(event) as any;

  keys.forEach((key) => {
    target.addEventListener(key, event[key] as any);
  });

  return () => {
    keys.forEach((key) => {
      target.removeEventListener(key, event[key] as any);
    });
  };
};

/**
 * Experimental tool to add and remove events to window with hook React useEffect
 * @param event to add and remove
 */
export const addEventWindow: AddEventW = (event) => {
  const keys: (keyof typeof event)[] = Object.keys(event) as any;

  keys.forEach((key) => {
    window.addEventListener(key, event[key] as any);
  });

  return () => {
    keys.forEach((key) => {
      window.removeEventListener(key, event[key] as any);
    });
  };
};

/**
 * Typings
 */

export type PipeEvent<E extends HTMLElement> = {
  [K in keyof HTMLElementEventMap]?: (
    this: E,
    ev: HTMLElementEventMap[K]
  ) => void;
};

export type AddEvent = <E extends HTMLElement>(
  target: E,
  event: PipeEvent<E>
) => () => void;

export type PipeEventW<E = WindowEventMap> = {
  [K in keyof E]?: (this: Window, ev: E[K]) => void;
};

export type AddEventW = (event: PipeEventW) => () => void;
