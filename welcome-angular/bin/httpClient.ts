import 'reflect-metadata';
import { createHttpClient } from 'node-angular-http-client';
import { Http } from '../src/app/http';

/**
 * This file exists for testing purposes only
 */

/**
 * https://github.com/souldreamer/node-angular-http-client/blob/master/package.json
 * https://github.com/mgechev/injection-js
 */
const mockHttp = createHttpClient() as any;

const baseUrl = 'http://localhost:3000/';

const httpClient = new Http(mockHttp, baseUrl);

httpClient.fetchGreet().subscribe({
  next(data) {
    console.log(data);
  },
  error(err) {
    console.error(err);
  },
});
