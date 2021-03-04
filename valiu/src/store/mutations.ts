import { CommitOptions } from "vuex/types";
import { State, Tag } from "./state";

export function findTag(state: State, { id }: Tag) {
  return state.tags.findIndex(tag => tag.id === id);
}

export const mutations = {
  tags(state: State, tags: Tag[]) {
    state.tags = [...tags];
  },

  insert(state: State, tag: Tag) {
    state.tags.push({ ...tag });
  },

  update(state: State, tag: Tag) {
    const index = findTag(state, tag);

    state.tags[index].name = tag.name;
  },

  delete(state: State, tag: Tag) {
    const index = findTag(state, tag);

    state.tags.splice(index, 1);
  }
};

export default mutations;

/**
 * Types
 */

type Mutation = typeof mutations;

type Type = keyof Mutation;

type GetPayLoad<T> = T extends (state: State, payload: infer P) => void
  ? P
  : never;

type SetPayLoad<T extends Type> = GetPayLoad<Mutation[T]>;

export interface Commit<T extends Type = Type> {
  <T extends Type>(
    type: T,
    payload: SetPayLoad<T>,
    options?: CommitOptions
  ): void;
  <T extends Type>(
    payloadWithType: { type: T; payload: SetPayLoad<T> },
    options?: CommitOptions
  ): void;
}
