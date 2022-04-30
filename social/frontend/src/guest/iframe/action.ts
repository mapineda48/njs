import * as type from "./type";

export function connect(app: string) {
  return { type: type.CONNECT, app } as const;
}

export function setStyle(style: Partial<CSSStyleDeclaration>) {
  return { type: type.SET_STYLE, style } as const;
}

/**
 * Types
 */
export type Action = Connect | SetStyle;

type SetStyle = ReturnType<typeof setStyle>;
type Connect = ReturnType<typeof connect>;
