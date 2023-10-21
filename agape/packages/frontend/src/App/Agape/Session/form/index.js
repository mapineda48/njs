import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "..";

const task = Symbol("task");

export default function initForm({ onSubmit, onValidate, reducer = {}, log }) {
  return function useForm(init) {
    const [state, setState] = useState(init);
    const ref = useRef(state);
    ref.current = state;

    const session = useSession();

    if (log) {
      console.log(state);
    }

    const form = useMemo(() => {
      const target = Object.fromEntries(
        Object.entries(reducer).map(([key, cb]) => [
          key,
          (...args) => setState((state) => cb(state, ...args)),
        ])
      );

      target.submit = (e) => {
        e.preventDefault();

        setState((state) => {
          let abortState;

          if (onValidate) {
            abortState = onValidate(state);
          }

          return abortState ?? { ...state, [task]: onSubmit(state, session) };
        });
      };

      target.set = (partial) => {
        setState((state) => ({ ...state, ...partial }));
      };

      return new Proxy(target, {
        get(target, propName) {
          if (propName === "isLoading") {
            return Boolean(ref.current[task]);
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
    }, [session]);

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
