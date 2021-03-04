import { setIn, setOut, setEnd, setDisabled } from "./animation";
import { State as Animation } from "./animation";

export const create: Create = ({ current, ...rest }) => {
  const { disabled, notification } = rest;

  return {
    current,
    next: "",
    disabled: {
      types: disabled ? [...disabled.types] : [],
    },
    history: {
      skipNextAdd: false,
      values: [],
    },
    notification: {
      types: notification ? [...notification.types] : [],
      current: "",
      next: "",
    },
    animation:
      disabled && disabled.types.includes(current) ? setDisabled() : setIn(),
  };
};

export const go: Go = (state, action) => {
  const { type } = action;

  const { current, notification, disabled, animation, history } = state;

  const isCurrent = type === current;

  const isNotify = notification.types.includes(current);

  const isDisabled = disabled.types.includes(current);

  const isNextDisabled = disabled.types.includes(type);

  if (isCurrent && !isNotify) {
    return state;
  }

  if (isDisabled) {
    if (isNextDisabled) {
      if (isNotify) {
        return {
          ...state,
          current: type,
          next: "",
        };
      }
      return {
        ...state,
        current: type,
        next: "",
        history: {
          ...history,
          values: [current, ...history.values],
        },
      };
    }
    if (isNotify) {
      return {
        ...state,
        current: type,
        next: "",
        animation: setIn(),
      };
    }
    return {
      ...state,
      current: type,
      next: "",
      history: {
        ...history,
        values: [current, ...history.values],
      },
      animation: setIn(),
    };
  }

  if (!animation.active) {
    return {
      ...state,
      next: type,
      animation: setOut(),
    };
  }

  if (isNotify) {
    return { ...state, next: type };
  }

  return {
    ...state,
    next: type,
    history: {
      ...history,
      values: [current, ...history.values],
    },
  };
};

export const end: Reducer = (state) => {
  const { current, next, notification, disabled, history } = state;

  if (!next) {
    return {
      ...state,
      animation: setEnd(state.animation),
    };
  }

  const isNotify = notification.types.includes(current);

  const isNextDisabled = disabled.types.includes(next);

  const isNextNotify = notification.types.includes(next);

  if (isNextDisabled) {
    if (isNotify) {
      return {
        ...state,
        current: next,
        next: "",
        animation: setEnd(state.animation),
      };
    }

    if (history.skipNextAdd) {
      return {
        ...state,
        current: next,
        next: "",
        animation: setEnd(state.animation),
        history: { ...history, skipNextAdd: false },
      };
    }

    return {
      ...state,
      current: next,
      next: "",
      animation: setEnd(state.animation),
      history: {
        ...history,
        values: [current, ...history.values],
      },
    };
  }

  if (isNotify) {
    if (isNextNotify) {
      return {
        ...state,
        current: next,
        next: "",
        animation: setIn(),
        notification: {
          ...notification,
          current: notification.next,
          next: "",
        },
      };
    }

    return {
      ...state,
      current: next,
      next: "",
      animation: setIn(),
    };
  }

  if (state.history.skipNextAdd) {
    return {
      ...state,
      current: next,
      next: "",
      animation: setIn(),
      history: {
        ...state.history,
        skipNextAdd: false,
      },
    };
  }

  return {
    ...state,
    current: next,
    next: "",
    history: {
      ...history,
      values: [current, ...history.values],
    },
    animation: setIn(),
  };
};

export const notify: Notify = (state, action) => {
  const { type, message } = action;

  const { current, notification, disabled } = state;

  const isNotify = notification.types.includes(current);

  const isDisabled = disabled.types.includes(current);

  if (isDisabled || !isNotify) {
    return {
      ...go(state, { type }),
      notification: {
        ...state.notification,
        current: message,
      },
    };
  }

  return {
    ...go(state, { type }),
    notification: {
      ...state.notification,
      next: message,
    },
  };
};

export const back: Reducer = (state) => {
  const type = state.history.values[0];

  if (!type || state.animation.active) {
    return state;
  }

  const { history, notification, current, disabled } = state;

  const isNotify = notification.types.includes(current);

  const isDisabled = disabled.types.includes(current);

  return {
    ...go(state, { type }),
    history: {
      ...history,
      skipNextAdd: !isDisabled && !isNotify,
      values: history.values.filter((val, index) => index > 0),
    },
  };
};

export const init: Reducer = (state) => {
  const length = state.history.values.length;

  if (!length) {
    return state;
  }

  const { history, notification, current, disabled } = state;

  const type = state.history.values[length - 1];

  const isNotify = notification.types.includes(current);

  const isDisabled = disabled.types.includes(current);

  return {
    ...go(state, { type }),
    history: {
      ...history,
      skipNextAdd: !isDisabled && !isNotify,
      values: [],
    },
  };
};

/**
 * Typings
 */

export type Reducer = <T extends string>(state: State<T>) => State<T>;

export type Notify = <T extends string>(
  state: State<T>,
  action: { type: T; message: string }
) => State<T>;

export type Go = <T extends string>(
  state: State<T>,
  action: { type: T }
) => State<T>;

export type Create = <T extends string>(input: Input<T>) => State<T>;

export type Input<T extends string> = {
  current: T;
  disabled?: Disabled<T>;
  notification?: Pick<Notification<T>, "types">;
};

export interface Notification<T extends string> {
  types: T[];
  current: string;
  next: string;
}

export interface History<T extends string> {
  values: T[];
  skipNextAdd: boolean;
}

export interface Disabled<T extends string> {
  types: T[];
}

export interface State<T extends string> {
  current: T;
  next: T | "";
  animation: Animation;
  history: History<T>;
  disabled: Disabled<T>;
  notification: Notification<T>;
}
