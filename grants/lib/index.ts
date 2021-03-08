import { Worker } from "worker_threads";
import { resolve } from "./paths";
import type { Action } from "./worker/action";

/**
 * Following the documents
 * https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
 *
 * this file is an attempt to prevent blocking of the main loop event;
 * in the future he should look for the best way to do it.
 */

/**
 * Variables
 */
const pathWorker = resolve("lib", "worker", "index.js");

const taskWaiting: Task = new Map();

let worker: Worker | null = null;

export function createSsr(baseUrl = "/"): SSR {
  return {
    async render(...args: any[]) {
      if (!worker) {
        worker = createWorker();

        await addTask("loadHtml", [baseUrl]);
      }

      return addTask("render", args);
    },

    get(...args: any[]) {
      return addTask("get", args);
    },
  } as any;
}

function addTask(type: string, args: any[]) {
  const id = Date.now();

  const promise = new Promise((res, rej) => {
    taskWaiting.set(id, { res, rej });
  });

  worker?.postMessage({ id, type, args });

  return promise;
}

function createWorker() {
  return new Worker(pathWorker)
    .on("message", handlerMessage)
    .on("error", handlerError)
    .on("exit", handlerExit);
}

function handlerMessage({ id, error, result }: any) {
  const task = taskWaiting.get(id);

  if (task) {
    if (error) {
      task.rej(error);
    } else {
      task.res(result);
    }
    taskWaiting.delete(id);
  }
}

function handlerExit(code: number) {
  if (code) {
    const err = new Error(`unhandler error worker.`);
    handlerError(err);
  }

  //console.log(`worker exit with code "${code}"`);

  worker = null;
}

function handlerError(error: any) {
  const tasks = Array.from(taskWaiting);

  taskWaiting.clear();

  tasks.forEach(([, { rej }]) => rej(error));
}

/**
 * Types
 */
export type SSR = {
  [K in keyof Action]: Action[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : never;
};

interface TaskSended {
  res: (...args: any) => void;
  rej: (err: any) => void;
}

type Task = Map<number, TaskSended>;
