import { HttpClient } from '@angular/common/http';
import { api, ResHello } from '..';

const rejs = [];

const mockRes: any = {
  [api.hello]: { message: 'Hello World' } as ResHello,
};

async function wait(url: string, time = 1000) {
  return new Promise<any>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) return res(mockRes[url]);

      const err = new Error('im a bad error');

      rej(err);
    }, time);
  });
}

export const httpMock: HttpClient = {
  /**
   * Mock Get Request
   */
  get(...args: any[]) {
    const [url, ...rest] = args;

    return {
      async subscribe(cb: any, onErr: any, onFin: any) {
        try {
          const res = await wait(url);
          
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
