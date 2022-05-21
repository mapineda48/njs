import { parentPort } from "worker_threads";
import render from "../ssr";
import { clean as cleanCache } from "../ssr/cache";

/**
 * After some time of inactivity, the worker should exit the process.
 */

const TIME_TO_EXIT = 10000;

function finish() {
  cleanCache().finally(() => {
    process.exit();
  });
}

const idTimeout = setTimeout(finish, TIME_TO_EXIT);

function resetTimeToExit() {
  clearTimeout(idTimeout);

  setTimeout(finish, TIME_TO_EXIT);
}

process.on("unhandledRejection", (err) => {
  throw err;
});

/**
 * Handerl Request's
 */
parentPort?.on("message", async ({ id, args }: Request) => {
  resetTimeToExit();

  const res = createResponse(id);

  try {
    const html = await render(...args);

    res.succes(html);
  } catch (error: any) {
    res.error(error);
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
      const res: Response = {
        id,
        result,
      };

      parentPort?.postMessage(res);
    },
  };
}

/**
 * Types
 */
export interface Request {
  id: number;
  args: Parameters<typeof render>;
}

export interface Response {
  id: number;
  error?: string;
  result?: string;
}
