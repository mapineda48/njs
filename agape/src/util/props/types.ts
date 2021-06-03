/**
 * Think it
 */

export type ReducerProps<E extends {}, T extends JsxElement> = (
  props: ExtProps<T, E>
) => Omit<ExtProps<T, E>, keyof E>;

export type ExtProps<
  T extends JsxElement,
  E extends {} = {}
> = JSX.IntrinsicElements[T] & E;

export type JsxElement = keyof JSX.IntrinsicElements;
