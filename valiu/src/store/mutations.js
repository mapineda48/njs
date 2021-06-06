export function findTag(state, { id }) {
    return state.tags.findIndex(tag => tag.id === id);
}
export const mutations = {
    tags(state, tags) {
        state.tags = [...tags];
    },
    insert(state, tag) {
        state.tags.push({ ...tag });
    },
    update(state, tag) {
        const index = findTag(state, tag);
        state.tags[index].name = tag.name;
    },
    delete(state, tag) {
        const index = findTag(state, tag);
        state.tags.splice(index, 1);
    }
};
export default mutations;
//# sourceMappingURL=mutations.js.map