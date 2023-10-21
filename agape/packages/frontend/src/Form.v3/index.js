import { useMemo, useRef, useState } from "react";

export default function initForm(reducer) {
    const { submit, ...target } = reducer;

    return function useForm(init) {
        const [state, setState] = useState(init);
        const ref = useRef(state);
        ref.current = state;

        const form = useMemo(() => {
            return new Proxy(target, {
                get(target, propName) {
                    if (propName === "submit") {
                        return (e) => {
                            e.preventDefault();
                            setState({ submit });
                        }
                    }

                    if (propName in target) {
                        return (...args) => {
                            setState((state) => target[propName](state, ...args));
                        };
                    }

                    return ref.current[propName];
                },

                set(target, propName, value) {
                    setState((state) => ({ ...state, [propName]: value }));

                    return true;
                },
            });
        }, []);

        return form;
    };
}