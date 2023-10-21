import { useEffect, useMemo, useRef, useState } from "react";

const task = Symbol("task");

export default function initForm({ onSubmit, method = {}, thunk = {}, log }) {
  return function useForm(init) {
    const [state, setState] = useState(init);
    const ref = useRef(state);
    ref.current = state;

    if (log) {
      console.log(state);
    }

    /**
     * Init Form Proxy
     */
    const form = useMemo(() => {
      const form = Object.fromEntries(
        Object.entries(method).map(([key, cb]) => [
          key,
          (...args) => setState((state) => cb(state, ...args)),
        ])
      );

      Object.entries(thunk).forEach(([key, cb]) => {
        form[key] = (...args) =>
          setState((state) => ({ ...state, [task]: cb(state, ...args) }));
      });

      form.submit = (e) => {
        e?.preventDefault();

        setState((state) => {
          return { ...state, [task]: onSubmit(state) };
        });
      };

      form.set = (partial) => {
        setState((state) => ({ ...state, ...partial }));
      };

      return new Proxy(form, {
        get(target, propName) {
          if (propName === "isLoading" && ref.current[task]) {
            return true;
          }

          if (propName in target) {
            return target[propName];
          }

          return ref.current[propName];
        },

        set(target, propName, value) {
          if (ref.current[propName] === value) {
            return false;
          }

          setState((state) => ({ ...state, [propName]: value }));

          return true;
        },
      });
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(form.onMount, [form.onMount]);

    const promise = state[task];

    useEffect(() => {
      if (!promise) {
        return;
      }

      let cb = (error, result = {}) =>
        setState((state) => ({ ...state, ...result, [task]: null, error }));

      promise
        .then((payload) => cb && cb(null, payload))
        .catch((err) => cb && cb(err));

      return () => {
        cb = null;
      };
    }, [promise]);

    return form;
  };
}
