import { Worker } from "worker_threads";
import { resolve } from "../paths";

import type { Render } from "../ssr";
import type { Request, Response } from "./child";

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
const pathWorker = resolve("lib/worker/child.js");

const taskWaiting: Task = new Map();

let worker: Worker | null = null;

export function render(...args: Parameters<Render>) {
  createWorker();

  const id = Date.now();

  const promise = new Promise<string>((res, rej) => {
    taskWaiting.set(id, { res, rej });
  });

  const message: Request = {
    id,
    args,
  };

  worker?.postMessage(message);

  return promise;
}

function createWorker() {
  if (worker) return;

  worker = new Worker(pathWorker)
    .on("message", handlerMessage)
    .on("error", handlerError)
    .on("exit", handlerExit);
}

function handlerMessage({ id, error, result }: Response) {
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
    const err = new Error(`unhandler error worker end with code ${code}`);
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
interface TaskSended {
  res: (...args: any) => void;
  rej: (err: any) => void;
}

type Task = Map<number, TaskSended>;
