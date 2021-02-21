import { HttpClient } from '@angular/common/http';
import { api, Response } from '../shared';

const rejects = [api.content];

function reject(url: string) {
  for (let index = 0; index < rejects.length; index++) {
    const api = rejects[index];
    if (url.startsWith(api)) {
      return new Error('Im a error');
    }
  }
}

async function wait(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      const err = reject(url);
      if (err) return rej(err);
      res();
    }, time);
  });
}

const get = {
  [api.home]: () => {
    return { data: 'Hello World!!!' };
  },
  [api.content]: () => {
    return {
      data:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex suscipit eum in ipsam, odio nulla itaque ad. Et, autem unde soluta facere iusto, dignissimos, maiores ad possimus assumenda voluptatibus aspernatur?',
    };
  },
} as any;

export const httpMock: HttpClient = {
  get(...args: any[]) {
    return {
      async subscribe(cb: any, onErr: any, onFin: any) {
        try {
          const [url] = args as string[];

          let createResponse: (...args: any) => any = null;

          for (const key in get) {
            if (url.startsWith(key)) {
              createResponse = get[key];
            }
          }

          if (!createResponse) {
            throw new Error('not found api');
          }

          await wait(url);
          const res = createResponse.call(undefined, ...args);
          cb(res);
        } catch (error) {
          onErr(error);
        } finally {
          onFin();
        }
      },
    };
  },
} as any;

/**
 * Types
 */
interface Get {
  [K: string]: HttpClient['get'];
}
