import { State } from ".";

/**
 * https://stackoverflow.com/questions/48178941/react-redux-where-to-set-sessionstorage
 * https://stackoverflow.com/questions/3220660/local-storage-vs-cookies
 * https://stackoverflow.com/questions/48792924/how-to-implement-secure-remember-me
 */

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("redux-state");

    if (!serializedState) {
      return;
    }

    return JSON.parse(serializedState) as State;
  } catch (error) {
    return;
  }
};

export const saveState = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("redux-state", serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};
