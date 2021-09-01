import { HttpClient } from '@angular/common/http';

const time = 1000;

const rejs: string[] = [];

export const httpClientMock: HttpClient = {
  get(...args: any[]) {
    return {
      subscribe(onSuccess: any, onError: any) {
        mockGet(args).then(onSuccess).catch(onError);
      },
    };
  },
} as any;

async function mockGet([url, ...args]: any[]): Promise<any> {
  await wait(url);

  switch (url) {
    case 'api':
      return { message: 'Hello world' };
    default:
      break;
  }
}

async function wait(url: string) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) {
        return res();
      }
      rej(new Error('Ups somthing wrong'));
    }, time);
  });
}
