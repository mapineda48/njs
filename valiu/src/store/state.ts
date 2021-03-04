export const state: State = {
  tags: null as any
};

/**
 * Types
 */

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface State {
  tags: Tag[];
}
