import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from './http';
import { httpClientMock } from '../development/httpClient';

const needMockHttpClient = process.env.NODE_ENV === 'development';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends Http {
  constructor(httpClient: HttpClient) {
    if (needMockHttpClient) {
      super(httpClientMock);
      return;
    }

    super(httpClient);
  }
}
