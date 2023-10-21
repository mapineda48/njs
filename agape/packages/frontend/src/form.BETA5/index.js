import { useMemo, useEffect, useRef, useState } from "react";

const task = Symbol("task");
const error = Symbol("error");

export default function initForm(Proto, log) {
  const obj = new Proto();

  // Obtener propiedades de la instancia
  const instanceEntries = Object.entries(obj);

  // Obtener métodos del prototipo, omitiendo el constructor
  const { onInit, ...methods } = Object.getOwnPropertyNames(
    Object.getPrototypeOf(obj)
  )
    .filter((name) => typeof obj[name] === "function" && name !== "constructor")
    .map((name) => [name, obj[name]]);

  const initState = Object.fromEntries(
    instanceEntries.filter(([, val]) => typeof val !== "function")
  );

  return function useForm(init) {
    const [state, setState] = useState(() => {
      let state = typeof init === "function" ? init() : init;

      state = { ...initState, ...state };

      const res = onInit && onInit.call(state);

      if (!res) {
        return state;
      }

      if (res instanceof Promise) {
        state[task] = res;
      }

      return { ...state, ...res };
    });

    if (log) {
      console.log(state);
    }

    const ref = useRef(state);
    ref.current = state;

    const form = useMemo(() => {
      const form = {};

      const proxy = new Proxy(form, {
        get(target, propName) {
          if (propName === "isLoading" && ref.current[task]) {
            return true;
          }

          if (propName === "error" && ref.current[error]) {
            return ref.current[error];
          }

          if (propName in target) {
            return target[propName];
          }

          return ref.current[propName];
        },

        set(target, propName, value) {
          if (ref.current[propName] === value) {
            return true;
          }

          setState((state) => ({ ...state, [propName]: value }));

          return true;
        },
      });

      methods.forEach(([key, fn]) => {
        form[key] = (...args) => {
          const result = fn.call(proxy, ...args);

          if (!result) {
            return;
          }

          if (typeof result === "function") {
            return setState(result);
          }

          if (!(result instanceof Promise)) {
            return;
          }

          if (ref.current[task]) {
            return;
          }

          setState((state) => {
            const next = { ...state, [task]: result };

            if (next[error]) {
              delete next[error];
            }

            return next;
          });
        };
      });

      if (form.submit) {
        const { submit } = form;

        form.submit = (e) => {
          e?.preventDefault();
          submit();
        };
      }

      return proxy;
    }, []);

    const promise = state[task];

    useEffect(() => {
      if (!promise) {
        return;
      }

      let cb = (result = {}) =>
        setState((current) => {
          const state = { ...current, ...result };

          delete state[task];

          return state;
        });

      promise
        .then((payload) => cb && cb(payload))
        .catch((payload) => cb && cb({ [error]: payload }));

      return () => {
        cb = null;
      };
    }, [promise]);

    return form;
  };
}

export class Proto {}
