import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "App/Agape/Session";

const task = Symbol("task");

export default function initForm(submit, reducer = {}, log = false) {
  return function useForm(init) {
    const [state, setState] = useState(init);
    const ref = useRef(state);
    ref.current = state;

    //console.log(state);

    const form = useMemo(() => {
      const target = Object.fromEntries(
        Object.entries(reducer).map(([key, cb]) => [
          key,
          (...args) => setState((state) => cb(state, ...args)),
        ])
      );

      target.submit = (e) => {
        e.preventDefault();
        setState((state) => ({ ...state, [task]: submit({}, state) }));
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
          setState((state) => ({ ...state, [propName]: value }));

          return true;
        },
      });
    }, []);

    const promise = state[task];

    useEffect(() => {
      if (!promise) {
        return;
      }

      let cb = (error, result) =>
        setState((state) => ({ ...state, [task]: null, result, error }));

      console.log("foo");
      promise
        .then((payload) => cb && cb(null, payload))
        .catch((err) => cb && cb(err));

      return () => {
        console.log("bar");
        cb = null;
      };
    }, [promise]);

    return form;
  };
}
