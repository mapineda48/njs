import { parentPort } from "worker_threads";
import action from "./action";

import type { Action } from "./action";

/**
 * After some time of inactivity, the worker should exit the process.
 */

const TIME_TO_EXIT = 10000;

function finish() {
  process.exit();
}

const idTimeout = setTimeout(finish, TIME_TO_EXIT);

function resetTimeToExit() {
  clearTimeout(idTimeout);

  setTimeout(finish, TIME_TO_EXIT);
}

/**
 * Handerl Request's
 */
parentPort?.on("message", (task) => {
  resetTimeToExit();

  const { id, type, args } = task;

  const res = createResponse(id);

  const current = action[type];

  if (current) {
    try {
      const result = current.call(null, ...args);

      res.succes(result);
    } catch (error) {
      res.error(error);
    }
  } else {
    const err = new Error(`not found action "${type}"`);

    res.error(err);
  }
});

function createResponse(id: number) {
  return {
    error(error: any) {
      parentPort?.postMessage({
        id,
        error,
      });
    },
    succes(result: any) {
      parentPort?.postMessage({
        id,
        result,
      });
    },
  };
}

/**
 * Types
 */
export type { Action };
