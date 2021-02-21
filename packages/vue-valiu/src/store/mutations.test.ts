import mutation, { findTag } from "./mutations";
import { State } from "./state";

describe("mutations", () => {
  const state: State = {
    tags: []
  };

  const foo = { id: 0, name: "foo", color: "fooColor" };

  it("add tags", () => {
    const tags = [foo, { id: 1, name: "bar", color: "barColor" }];

    mutation.tags(state, tags);

    expect(state.tags).toStrictEqual(tags);
  });

  it("insert tag", () => {
    const tag = { id: 2, name: "baz", color: "colorBaz" };

    mutation.insert(state, tag);

    expect(state.tags).toContainEqual(tag);
  });

  it("update tag", () => {
    const tag = { id: 1, name: "pipe", color: "barColor" };

    const index = findTag(state, tag);

    mutation.update(state, tag);

    expect(state.tags[index]).toStrictEqual(tag);
  });

  it("delete tag", () => {
    mutation.delete(state, foo);

    expect(state.tags).not.toStrictEqual(foo);
  });
});
