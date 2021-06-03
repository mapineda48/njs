import React from "react";

/**
 * Warning: Experimental Hook
 *
 * Wrap React hook Effect to add on mount and remove on unmount
 * a event to window
 *
 * @param cb return event to use
 * @param deps dependecy react hook effect
 */
export const useEventWindow = (cb: CreateEvent, deps?: Deps) => {
  React.useEffect(() => {
    const event = cb();

    if (!event) {
      return;
    }

    const keys: Key[] = Object.keys(event) as any;

    /**
     * Add Events
     */
    keys.forEach((key) => {
      window.addEventListener(key, event[key] as any);
    });

    /**
     * Remove Events
     */
    return () => {
      keys.forEach((key) => {
        window.removeEventListener(key, event[key] as any);
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

/**
 * Typings
 */
type Deps = any[];

type CreateEvent = () => Event | void;

export type Event<E = WindowEventMap> = {
  [K in keyof E]?: (this: Window, ev: E[K]) => void;
};

export type Key = keyof Event;
