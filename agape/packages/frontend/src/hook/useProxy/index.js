

import { useMemo, useRef, useState } from "react";

export function createProxy(ref, set) {
    const proxy = {};

    Object.keys(ref.current).forEach((key) => {
        if (!Array.isArray(ref.current[key])) {
            Object.defineProperty(proxy, key, {
                get() {
                    return ref.current[key];
                },

                set(value) {
                    set((state) => ({ ...state, [key]: value }));
                },
            });

            return;
        }

        const push = (item) => {
            set((state) => {
                return { ...state, [key]: [...state[key], item] };
            });
        };

        const splice = (index, deleteCount) => {
            set((state) => {
                const next = [...state[key]];

                next.splice(index, deleteCount);

                return { ...state, [key]: next };
            });
        };

        Object.defineProperty(proxy, key, {
            get() {
                const state = ref.current[key];

                const list = state.map((itemState, index) => {
                    const itemProxy = {};

                    Object.keys(itemState).forEach((itemKey) => {
                        Object.defineProperty(itemProxy, itemKey, {
                            get() {
                                return itemState[itemKey];
                            },

                            set(value) {
                                set((state) => {
                                    const next = [...state[key]];

                                    next[index] = { ...next[index], [itemKey]: value };

                                    return { ...state, [key]: next };
                                });
                            },
                        });
                    });

                    itemProxy.remove = () => {
                        set((state) => {
                            const next = [...state[key]];

                            next.splice(index, 1);

                            return { ...state, [key]: next };
                        });
                    };

                    return itemProxy;
                });

                list.push = push;
                list.splice = splice;

                return list;
            },

            set(value) {
                set((state) => ({ ...state, [key]: value }));
            },
        });
    });

    proxy.update = (partial) => {
        set((state) => ({ ...state, ...partial }));
    };

    return proxy;
}