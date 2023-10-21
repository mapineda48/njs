import { useEffect, useMemo, useRef, useState } from "react";

const task = Symbol("task");

export default function initForm(opt) {
  const { reducer, thunk, onInit, log } = parse(opt);

  return function useForm(init) {
    const [state, setState] = useState(() => {
      const state = typeof init === "function" ? init() : init;

      return onInit ? onInit(state) : state;
    });

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
        Object.entries(reducer).map(([key, cb]) => [
          key,
          (...args) => setState((state) => cb(state, ...args)),
        ])
      );

      Object.entries(thunk).forEach(([key, cb]) => {
        form[key] = (...args) =>
          setState((state) => {
            if (state[task]) {
              return state;
            }

            return { ...state, [task]: cb(state, ...args) };
          });
      });

      form.set = (partial) => {
        setState((state) => ({ ...state, ...partial }));
      };

      form.get = () => ref.current;

      if (form.submit) {
        const { submit } = form;

        form.submit = (e) => {
          e?.preventDefault();
          submit();
        };
      }

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

    const promise = state[task];

    useEffect(() => {
      if (!promise) {
        return;
      }

      let cb = (result = {}) =>
        setState((current) => {
          const state = { ...current, ...result };

          delete state[task];

          if (!result.error && current.error) {
            delete state.error;
          }

          return state;
        });

      promise
        .then((payload) => cb && cb(payload))
        .catch((error) => cb && cb({ error }));

      return () => {
        cb = null;
      };
    }, [promise]);

    return form;
  };
}

export function doFoo(state, promise) {
  return { ...state, [task]: promise };
}

function parse(opt) {
  const reducer = { ...opt.reducer };
  const thunk = { ...opt.thunk };

  remove("set", reducer, thunk);
  remove("get", reducer, thunk);

  return {
    reducer,
    thunk,
    log: opt.log,
    onInit: init(reducer, thunk),
  };
}

function remove(key, ...objs) {
  objs.forEach((obj) => {
    if (key in obj) {
      delete obj[key];
    }
  });
}

function get(key, ...objs) {
  const res = objs.filter((obj) => key in obj);

  if (!res.length) {
    return;
  }

  const ref = res[0][key];

  res.forEach((obj) => {
    delete obj[key];
  });

  return ref;
}

function init(reducer, thunk) {
  const onSync = get("onInit", reducer);

  if (!onSync) {
    return;
  }

  const onAsync = get("onInit", thunk);

  if (!onAsync) {
    return onSync;
  }

  return (current) => {
    const state = onSync(current);

    const promise = onAsync(state);

    if (!promise) {
      return state;
    }

    if (promise instanceof Promise) {
      state[task] = promise;
    }

    return { ...state, ...promise };
  };
}
