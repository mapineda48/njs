import { useMemo, useEffect, useRef, useState } from "react";

const mount = Symbol("mount");
const task = Symbol("task");
const error = Symbol("error");
const skipPayload = error;

export default function initForm(prototype, log) {
  const { onInit, onError, ...proxy } = prototype;

  const entries = Object.entries(proxy);

  const methods = entries.filter(([, val]) => typeof val === "function");

  const initState = Object.fromEntries(
    entries.filter(([, val]) => typeof val !== "function")
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
      const current = {};

      let get = (target, propName) => {
        if (propName === "isLoading" && ref.current[task]) {
          return true;
        }

        if (propName === "error" && ref.current[error] && !onError) {
          return ref.current[error];
        }

        if (propName in target) {
          return target[propName];
        }

        return ref.current[propName];
      };

      let set = (propName, value) => {
        if (propName === mount && !value) {
          set = unMountSet;
          get = unMountGet;
          deleteRef(current);
          return true;
        }

        if (ref.current[propName] !== value) {
          setState((state) => ({ ...state, [propName]: value }));
        }

        return true;
      };

      const proxy = new Proxy(current, {
        get: (target, propName) => get(target, propName),
        set: (target, propName, value) => set(propName, value),
      });

      methods.forEach(([key, fn]) => {
        current[key] = (...args) => {
          let result = fn.call(proxy, ...args);

          if (!result) {
            return;
          }

          if (typeof result === "function") {
            return setState(result);
          }

          if (!(result instanceof Promise)) {
            return;
          }

          if (onError) {
            result = result.catch((error) => {
              onError.call(proxy, error, current[key]);

              return skipPayload;
            });
          }

          if (ref.current[task]) {
            console.warn("warning form multi promise");
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

      if (current.submit) {
        const { submit } = current;

        current.submit = (e) => {
          e?.preventDefault();
          submit();
        };
      }

      return proxy;
    }, []);

    useEffect(() => {
      return () => {
        form[mount] = false;
      };
    }, [form]);

    const promise = state[task];

    useEffect(() => {
      if (!promise) {
        return;
      }

      let cb = (payload) => {
        setState((current) => {
          const state = { ...current };

          delete state[task];

          if (!payload || payload === skipPayload) {
            return state;
          }

          return payload(state);
        });
      };

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

function unMountGet(target, propName) {
  console.warn("form was unmounted... missing proxy");
  return true;
}

function unMountSet() {
  console.warn("form was unmounted... missing proxy");
  return true;
}

function deleteRef(obj) {
  Object.keys(obj).forEach((key) => {
    delete obj[key];
  });

  if (error in obj) {
    delete obj[error];
  }

  if (task in obj) {
    delete obj[task];
  }
}
