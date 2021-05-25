export const tab = {
  CHAT: "CHAT",
} as const;

/**
 * Types
 */
export type TabMap = typeof tab;

export type Tab = TabMap[keyof TabMap];
