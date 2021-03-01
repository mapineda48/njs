export const api = "api";

export const event = {
  change: "react-personal/admin/change-state",
} as const;

/**
 * Types
 */
export interface State {
  maps: boolean;
}
