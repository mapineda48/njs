export const esx: Listener = (input: any) => {
  if (!Array.isArray(input)) {
    if (!input) {
      return;
    }
    return input;
  }

  const cbs = input.filter((input) => typeof input === "function");

  if (cbs.length < 1) {
    return;
  }

  return (event: any) => {
    cbs.forEach((cb) => cb(event));
  };
};

/**
 * Typings
 */

export type OnKeyDown = <T extends HTMLElement>(
  event: React.KeyboardEvent<T>
) => void;

export type OnClick = <T extends HTMLElement>(
  event: React.MouseEvent<T, MouseEvent>
) => void;

type Listener = <
  K extends keyof JSX.IntrinsicElements[T] = "onClick",
  T extends keyof JSX.IntrinsicElements = "div",
  C = Required<JSX.IntrinsicElements[T]>[K],
  I = false | C
>(
  input: C | I | (I | C)[]
) => C | undefined;

export type NativeProp<
  K extends keyof JSX.IntrinsicElements[T],
  T extends keyof JSX.IntrinsicElements = "div"
> = Required<JSX.IntrinsicElements[T]>[K];

export type NativeProps<
  T extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[T];
